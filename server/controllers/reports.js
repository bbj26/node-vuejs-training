const Employee = require('../models/employee');
const logger = require('../winston');
const Task = require('../models/task');
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const { format, isAfter, differenceInDays } = require('date-fns');

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
  const { employee, totalTasks, completedTasks, activeTasks } = data;
  const first = employee.name.split(' ')[0];
  const last = employee.name.split(' ')[1];
  return `${first}-${last}-t${totalTasks}c${completedTasks}a${activeTasks}`;
};
const templatePath = path.join(__dirname, '../views/', 'report-template.ejs');

const createEmployeeReport = async (req, res) => {
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
    ejs.renderFile(templatePath, { templateData }, (error, data) => {
      if (error) {
        logger.error(`Error rendering EJS file: ${error.message}`);
        res.status(400).send(error.message);
      } else {
        const options = {
          format: 'A4',
          orientation: 'portrait',
        };
        const pdfName = generatePdfName(templateData);
        const reportPath = path.join(__dirname, '../reports/', `${pdfName}.pdf`);
        const reportUrl = `http://localhost:4101/reports/${pdfName}`;
        pdf.create(data, options).toFile(reportPath, (error) => {
          if (error) {
            logger.info(`Error creating PDF file: ${error.message}`);
            res.status(400).send(error.message);
          } else {
            logger.error(`Successfully created report for ${templateData.employee.name}`);
            res.status(201).send(reportUrl);
          }
        });
      }
    });
  } catch (error) {
    logger.error(`Error rendering employee report. ${error.stack}`);
    res.status(500).json({ 
      code: 500, 
      message: `Internal server error: ${error.message}`
    });
  }
};

module.exports = {
  createEmployeeReport
};