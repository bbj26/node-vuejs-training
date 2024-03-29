const express = require('express');
const router = express.Router();

const employeeController = require('./controllers/employees');
const taskController = require('./controllers/tasks');
const logController = require('./controllers/logs');
const reportController = require('./controllers/reports');

const employeesValidator = require('./validators/employeeValidator');
const taskValidator = require('./validators/taskValidator');
const logValidator = require('./validators/logValidator');
const reportValidator = require('./validators/reportValidator');

router.get('/employees', employeeController.fetchEmployees);
router.post('/employees', employeesValidator.validate('createEmployee'),
  employeeController.createEmployee);
router.delete('/employees/:id', employeesValidator.validate('deleteEmployee'),
  employeeController.deleteEmployee);

router.get('/tasks', taskController.fetchTasks);
router.get('/tasks/:id', taskValidator.validate('validateID'),
  taskController.fetchEmployeeTasks);
router.post('/tasks/:id', taskValidator.validate('createTask'),
  taskController.createTask);
router.post('/tasks/complete/:id', taskValidator.validate('validateID'),
  taskController.setTaskCompletion);
router.delete('/tasks/:id', taskValidator.validate('validateID'),
  taskController.deleteTask);

router.post('/logs', logValidator.validate('fetchLogs'),
  logController.fetchLogs);

router.get('/reports/:id/:pdfName', reportValidator.validate('fetchReport'),
  reportController.fetchReport);
router.post('/reports/annual', reportValidator.validate('createAnnualReport'),
  reportController.createAnnualReport);
router.post('/reports/daily', reportValidator.validate('createDayReport'),
  reportController.createDayReport);

module.exports = router;