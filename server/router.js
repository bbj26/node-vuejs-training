const express = require('express')
const router = express.Router()

const itemController = require('./controllers/items')
const employeeController = require('./controllers/employees')
const taskController = require('./controllers/tasks')

router.get('/items', itemController.fetchItems)
router.post('/items', itemController.createItem)

router.get('/employees', employeeController.fetchEmployees)
router.post('/employees', employeeController.createEmployee)
router.delete('/employees/:id', employeeController.deleteEmployee)

router.get('/tasks', taskController.fetchTasks)
router.get('/tasks/:id', taskController.fetchEmployeeTasks)
router.post('/tasks/:id', taskController.createTask)
router.delete('/tasks/:id', taskController.deleteTask)
router.delete('/alltasks/:employeeId', taskController.deleteEmployeeTasks)

module.exports = router