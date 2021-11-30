const express = require('express');
const router = express.Router();

const employeeController = require('./controllers/employees');
const taskController = require('./controllers/tasks');

const { body } = require('express-validator');

router.get('/employees', employeeController.fetchEmployees);
router.post('/employees', body('name', 'name must be min 5 and max 10 characters')
.isLength({ min: 5, max: 10 }), employeeController.createEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

router.get('/tasks', taskController.fetchTasks);
router.get('/tasks/:id', taskController.fetchEmployeeTasks);
router.post('/tasks/:id', taskController.createTask);
router.post('/tasks/complete/:id', taskController.setTaskCompletion);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;