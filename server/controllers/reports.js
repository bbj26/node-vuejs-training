const Employee = require('../models/employee');
const logger = require('../winston');
const Task = require('../models/task');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const { format, isAfter, differenceInDays } = require('date-fns');
const fs = require('fs');

const getToday = () => {
  return format(new Date(), 'yyyy/MM/dd');
};
const getYearAgo = () => {
  const today = getToday();
  return format(new Date(today)
    .setFullYear(new Date().getFullYear() - 1), 'yyyy/MM/dd');
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
const generatePdfName = (data) => {
  const { employee, completedTasks, activeTasks } = data;
  const first = employee.name.split(' ')[0];
  const last = employee.name.split(' ')[1];
  return `${first}-${last}-t${data.tasks.length}c${completedTasks}a${activeTasks}`;
};
const templatePath = path.join(__dirname, '../views/', 'report-template.ejs');

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
const fetchAnnualReport = async (req, res) => {
  const pdfName = req.params.pdfName;
  const employeeId = req.params.id;
  const pdfPath = path.join(__dirname, '../reports/', `${employeeId}/`, `${pdfName}.pdf`);
  try {
    fs.readFile(pdfPath, (error, data) => {
      if (error) {
        logger.error(`Error reading PDF file: ${error.stack}`);
        res.status(400).send(error.message);
      } else {
        res.contentType('application/pdf');
        logger.info(`Successfull operation: fetchAnnualReport. Employee id: ${employeeId}`);
        res.send(data);
      }
    });
  } catch (error) {
    logger.error(`Internal server error: ${error.stack}`);
  }
};
const createAnnualReport = async (req, res) => {
  const { employeeId } = req.body;
  try {
    const employee = await Employee.findOne({ _id: employeeId });
    const templateData = {
      totalTasks: 0,
      completedTasks: 0,
      failedTasks: 0,
      activeTasks: 0,
      today: getToday(),
      yearAgo: getYearAgo(),
      employee,
      tasks: null
    };
    const allTasks = await Task.find({ employeeId });
    templateData.tasks = allTasks.filter(task => {
      return isInLast365Days(task.createdAt, task.updatedAt);
    });
    templateData.tasks.forEach(task => {
      task.createdAtFormatted = format(new Date(task.createdAt), 'yyyy-MM-dd');
      if (task.completed) templateData.completedTasks++;
      if (isFailed(task)) templateData.failedTasks++;
    });
    templateData.activeTasks = countActiveTasks(templateData);
    // ejs.renderFile(templatePath, { templateData }, (error, data) => {
    //   if (error) {
    //     logger.error(`Error rendering EJS file: ${error.message}`);
    //     res.status(400).send(error.message);
    //   } else {
    //     const options = {
    //       format: 'A4',
    //       orientation: 'portrait',
    //     };
    //     const pdfName = generatePdfName(templateData);
    //     const reportPath = path.join(__dirname, '../reports/', `${employee._id}/`, `${pdfName}.pdf`);
    //     const reportUrl = `http://localhost:4101/reports/${employee._id}/${pdfName}`;
    //     pdf.create(data, options).toFile(reportPath, (error) => {
    //       if (error) {
    //         logger.info(`Error creating PDF file: ${error.message}`);
    //         res.status(400).send(error.message);
    //       } else {
    //         logger.info(`Successfully created report for ${templateData.employee.name}`);
    //         res.status(201).send(reportUrl);
    //       }
    //     });
    //   }
    // });
    const pdfName = generatePdfName(templateData);
    const reportPath = path.join(__dirname, '../reports/', `${employee._id}/`, `${pdfName}.pdf`);
    const reportUrl = `http://localhost:4101/reports/${employee._id}/${pdfName}`;

    renderEjsTemplate(templatePath, templateData).then(data => {
      createPdf(data, reportPath).then(data => {
        logger.info(`Successfully created report for ${templateData.employee.name}`);
        res.status(201).send(reportUrl);
      }).catch(error => {
        logger.info(`Error creating PDF file: ${error.message}`);
        res.status(400).send(error.message);
      });
    }).catch(error => {
      logger.error(`Error rendering EJS file: ${error.message}`);
    });
    //console.log(error);
    //console.log(data);
    //console.log(error);
    // if (ejsTemplate.error) {
    //   logger.error(`Error rendering EJS file: ${ejsTemplate.error.message}`);
    //   res.status(400).send(ejsTemplate.error.message);
    // } else {
    //   console.log(ejsTemplate.data);
    //   res.json(ejsTemplate.data);
    // }
  } catch (error) {
    logger.error(`Error rendering employee report. ${error.stack}`);
    res.status(500).json({
      code: 500,
      message: `Internal server error: ${error.message}`
    });
  }
};
const createDayReport = async (req, res) => {
  const { employeeId, date } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    let reportDate = format(new Date(date), 'yyyy-MM-dd');
    const allTasks = await Task.find({ employeeId });
    const tasks = allTasks.filter(task => {
      let updatedAt = format(new Date(task.updatedAt), 'yyyy-MM-dd');
      if (new Date(updatedAt).getTime() === new Date(reportDate).getTime()) {
        return task;
      }
    });
    res.json({ employeeInfo: employee, tasks: tasks });
  } catch (error) {
    logger.error(`Internal server error. ${error.stack}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  createAnnualReport,
  createDayReport,
  fetchAnnualReport,
};