const Task = require('../models/task')

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({ code: 404, msg: error })
  }
}

const fetchEmployeeTasks = async (req, res) => {
  let employeeId = req.params.id
  try {
    const tasks = await Task.find({ employeeId: employeeId})
    res.status(200).json(tasks)
  } catch (error) {
    es.status(404).json({ code: 404, msg: error })
  }
}

const createTask = async (req, res) => {
  let taskData = {
    name: req.body.name,
    deadline: req.body.deadline,
    employeeId: req.params.id
  }
  let task = new Task(taskData);

  try {
    const savedTask = await task.save()
    res.status(201).json({ code: 201, message: 'Task added successfully', saved: savedTask })
  } catch (error) {
    res.status(400).json({ code: 400, msg: error })
  }
}

module.exports = {
  fetchTasks,
  fetchEmployeeTasks,
  createTask
}