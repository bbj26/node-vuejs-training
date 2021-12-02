const Task = require('../models/task');
const { validationResult } = require('express-validator');
const compareAsc = require('date-fns/compareAsc');

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ code: 404, msg: error.message });
  }
}
const fetchEmployeeTasks = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const tasks = await Task.find({ employeeId: employeeId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ code: 404, msg: error.message });
  }
}
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  const { name, deadline } = req.body;
  const taskData = {
    name, deadline,
    employeeId: req.params.id
  };
  const task = new Task(taskData);
  try {
    const savedTask = await task.save();
    res.status(201).json({
      code: 201, message: 'Task added successfully',
      saved: savedTask
    });
  } catch (error) {
    res.status(409).json({ code: 409, msg: error.message });
  }
}
const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId);
    if (!isExpired(task.deadline)) {
      await Task.findByIdAndDelete(taskId);
      res.status(200).json({ code: 200, msg: 'Task successfully deleted' });
    } else {
      res.status(405).json({ code: 405, msg: 'Not allowed to delete task' });
    }
  } catch (error) {
    res.status(404).json({ code: 404, msg: error.message });
  }
}
const setTaskCompletion = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!isExpired(task.deadline)) {
      task.completed = !task.completed;
      await Task.findByIdAndUpdate(req.params.id, { $set: task });
      res.status(200).json({ code: 200, msg: 'Task successfully updated' });
    }
  } catch (error) {
    res.status(400).json({ code: 400, msg: error.message });
  }
}
const isExpired = (deadLine) => {
  let deadline = new Date(deadLine);
  let now = new Date();
  return compareAsc(deadline, now) === 1 ? false : true;
}

module.exports = {
  fetchTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask,
  setTaskCompletion
};