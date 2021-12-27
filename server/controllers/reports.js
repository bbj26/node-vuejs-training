const {
  CREATE_ANNUAL_REPORT,
  CREATE_DAY_REPORT,
  FETCH_REPORT
} = require('../constants/apiMethodNames');
const {
  logPdfCreationError,
  logReadPdfError,
  logSuccess,
  logValidationError
} = require('../winston/reportsLogger');
const { format, differenceInDays, isAfter } = require('date-fns');
const { app: { SERVER }, app: { PORT } } = require('../config');
const Employee = require('../models/employee');
const ejs = require('ejs');
const fs = require('fs');
const { logServerError } = require('../winston/employeesLogger');
const Task = require('../models/task');
const path = require('path');
const pdf = require('html-pdf');
const { REPORT_CREATED } = require('../constants/infoMessages');
const { validationResult } = require('express-validator');

const getTemplatePath = (type) => {
  switch (type) {
    case 'annual':
      return path.join(__dirname, '../views/', 'report-template-annual.ejs');
    case 'daily':
      return path.join(__dirname, '../views/', 'report-template-daily.ejs');
  }
};
const getToday = () => {
  return format(new Date(), 'yyyy-MM-dd');
};
const getYearAgo = () => {
  const today = getToday();
  return format(new Date(today)
    .setFullYear(new Date().getFullYear() - 1), 'yyyy-MM-dd');
};
const isFailed = (task) => {
  let now = new Date();
  let deadline = new Date(task.deadline);
  return isAfter(now, deadline) && !task.completed;
};
const isInLast365Days = (createdAt, updatedAt) => {
  const now = new Date().getTime();
  createdAt = new Date(createdAt).getTime();
  updatedAt = new Date(updatedAt).getTime();
  if (differenceInDays(createdAt, now) < 365 || differenceInDays(updatedAt, now) < 365) {
    return true;
  } else return false;
};
const countActiveTasks = (data) => {
  const { tasks, completedTasks, failedTasks } = data;
  return tasks.length - completedTasks - failedTasks;
};
const generateAnnualPdfName = (data) => {
  const { employee, completedTasks, activeTasks } = data;
  const first = employee.name.split(' ')[0];
  const last = employee.name.split(' ')[1];
  return `${first}-${last}-t${data.tasks.length}c${completedTasks}a${activeTasks}`;
};
const generateDailyPdfName = (data) => {
  const { employee, reportDate } = data;
  const first = employee.name.split(' ')[0];
  const last = employee.name.split(' ')[1];
  return `${first}-${last}-${reportDate}`;
};
const renderEjsTemplate = async (templatePath, templateData) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { templateData }, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};
const createPdf = async (pdfData, pathToSaveAt) => {
  const options = {
    format: 'A4',
    orientation: 'portrait',
  };
  return new Promise((resolve, reject) => {
    pdf.create(pdfData, options).toFile(pathToSaveAt, (error, data) => {
      if (error) {
        return reject(error);
      } else {
        return resolve(data);
      }
    });
  });
};
const setupAnnualTemplateData = (employee, allTasks) => {
  let templateData = {
    totalTasks: 0,
    completedTasks: 0,
    failedTasks: 0,
    activeTasks: 0,
    today: getToday(),
    yearAgo: getYearAgo(),
    employee,
    tasks: null
  };
  templateData.tasks = allTasks.filter(task => {
    return isInLast365Days(task.createdAt, task.updatedAt);
  });
  templateData.tasks.forEach(task => {
    task.createdAtFormatted = format(new Date(task.createdAt), 'yyyy-MM-dd');
    if (task.completed) templateData.completedTasks++;
    if (isFailed(task)) templateData.failedTasks++;
  });
  templateData.activeTasks = countActiveTasks(templateData);
  templateData.totalTasks = allTasks.length;
  return templateData;
};
const setupDailyTemplateData = (employee, allTasks, date) => {
  const reportDate = format(new Date(date), 'yyyy-MM-dd');
  const templateData = {
    employee,
    tasks: null,
    reportDate,
    today: getToday(),
  };
  templateData.tasks = allTasks.filter(task => {
    let updatedAt = format(new Date(task.updatedAt), 'yyyy-MM-dd');
    if (new Date(updatedAt).getTime() === new Date(date).getTime()) {
      return task;
    }
  }).sort((t1, t2) => t2.completed - t1.completed);
  return templateData;
};
const generateReportPath = (employeeId, pdfName) => {
  return path.join(__dirname, '../reports', `${employeeId}/`, `${pdfName}.pdf`);
};
const generateReportDownloadUrl = (employeeId, pdfName) => {
  return `${SERVER}:${PORT}/reports/${employeeId}/${pdfName}`;
};

const fetchReport = async (req, res) => {
  const pdfName = req.params.pdfName;
  const employeeId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    logValidationError(error, FETCH_REPORT);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const pdfPath = generateReportPath(employeeId, pdfName);
  try {
    fs.readFile(pdfPath, (error, data) => {
      if (error) {
        logReadPdfError(error);
        res.status(400).send(error.message);
      } else {
        logSuccess(FETCH_REPORT, employeeId);
        res.contentType('application/pdf');
        res.send(data);
      }
    });
  } catch (error) {
    logServerError(error, FETCH_REPORT);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const createAnnualReport = async (req, res) => {
  const { employeeId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    logValidationError(error, CREATE_ANNUAL_REPORT);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const employee = await Employee.findOne({ _id: employeeId });
    const allTasks = await Task.find({ employeeId });
    const templateData = Object.assign({}, setupAnnualTemplateData(employee, allTasks));
    const templatePath = getTemplatePath('annual');
    const pdfName = generateAnnualPdfName(templateData);
    const reportPath = generateReportPath(employee._id, pdfName);
    const reportUrl = generateReportDownloadUrl(employeeId, pdfName);
    try {
      const renderedTemplate = await renderEjsTemplate(templatePath, templateData);
      await createPdf(renderedTemplate, reportPath);
      logSuccess(CREATE_ANNUAL_REPORT, employeeId);
      res.status(201).send({
        code: 201,
        message: REPORT_CREATED,
        downloadUrl: reportUrl
      });
    } catch (error) {
      logPdfCreationError(error);
      res.status(400).send({ code: 400, message: error.message });
    }
  } catch (error) {
    logServerError(error, CREATE_ANNUAL_REPORT);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const createDayReport = async (req, res) => {
  const { employeeId, date } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    logValidationError(error, CREATE_DAY_REPORT);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const employee = await Employee.findById(employeeId);
    const allTasks = await Task.find({ employeeId });
    const templateData = Object.assign({}, setupDailyTemplateData(employee, allTasks, date));
    const templatePath = getTemplatePath('daily');
    const pdfName = generateDailyPdfName(templateData);
    const reportPath = generateReportPath(employee._id, pdfName);
    const reportUrl = generateReportDownloadUrl(employeeId, pdfName);
    try {
      const renderedTemplate = await renderEjsTemplate(templatePath, templateData);
      await createPdf(renderedTemplate, reportPath);
      logSuccess(CREATE_DAY_REPORT, employeeId);
      res.status(201).send({
        code: 201,
        message: REPORT_CREATED,
        downloadUrl: reportUrl
      });
    } catch (error) {
      logPdfCreationError(error);
      res.status(400).send({ code: 400, message: error.message });
    }
  } catch (error) {
    logServerError(error, CREATE_DAY_REPORT);
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  createAnnualReport,
  createDayReport,
  fetchReport,
};