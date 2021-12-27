const {
  createPdf,
  generateAnnualPdfName,
  generateReportDownloadUrl,
  generateReportPath,
  getTemplatePath,
  generateDailyPdfName,
  renderEjsTemplate,
  setupAnnualTemplateData,
  setupDailyTemplateData,
  templatePaths
} = require('../utils/reporting');
const {
  logPdfCreationError,
  logReadPdfError,
  logSuccess,
  logValidationError
} = require('../winston/reportsLogger');
const {
  CREATE_ANNUAL_REPORT,
  CREATE_DAY_REPORT,
  FETCH_REPORT
} = require('../constants/apiMethodNames');
const Employee = require('../models/employee');
const fs = require('fs');
const { logServerError } = require('../winston/employeesLogger');
const Task = require('../models/task');
const { REPORT_CREATED } = require('../constants/infoMessages');
const { validationResult } = require('express-validator');

const fetchReport = async (req, res) => {
  const { pdfName, id: employeeId } = req.params;
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
        res.status(400).json({ code: 400, message: error.message });
      } else {
        logSuccess(FETCH_REPORT, employeeId);
        res.contentType('application/pdf');
        res.status(201).send(data);
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
    const templatePath = getTemplatePath(templatePaths.annual);
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
    const templatePath = getTemplatePath(templatePaths.daily);
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