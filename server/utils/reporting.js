const { getToday, getYearAgo, isInLast365Days } = require('./dateUtils');
const { app: { SERVER }, app: { PORT } } = require('../config');
const { format, isAfter } = require('date-fns');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');

const templatePaths = {
  annual: 'annual',
  daily: 'daily'
};
const getTemplatePath = (type) => {
  switch (type) {
    case templatePaths.annual:
      return path.join(__dirname, '../views/', 'report-template-annual.ejs');
    case templatePaths.daily:
      return path.join(__dirname, '../views/', 'report-template-daily.ejs');
  }
};
const isFailed = (task) => {
  let now = new Date();
  let deadline = new Date(task.deadline);
  return isAfter(now, deadline) && !task.completed;
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

module.exports = {
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
};