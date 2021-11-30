const express = require('express');
const router = express.Router();

const employeeController = require('./controllers/employees');
const taskController = require('./controllers/tasks');

const employeesValidator = require('./validators/employeeValidator');
const taskValidator = require('./validators/taskValidator');

router.get('/employees', employeeController.fetchEmployees);
router.post('/employees', employeesValidator.validate('createEmployee'),
  employeeController.createEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

router.get('/tasks', taskController.fetchTasks);
router.get('/tasks/:id', taskController.fetchEmployeeTasks);
router.post('/tasks/:id', taskValidator.validate('createTask'),
  taskController.createTask);
router.post('/tasks/complete/:id', taskController.setTaskCompletion);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;