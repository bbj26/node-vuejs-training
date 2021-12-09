const Task = require('../models/task');
const { validationResult } = require('express-validator');
const { format, isAfter } = require('date-fns');

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
const fetchEmployeeTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  const employeeId = req.params.id;
  try {
    const tasks = await Task.find({ employeeId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  const { name, deadline, completed = false } = req.body;
  const taskData = {
    name, deadline, completed,
    employeeId: req.params.id,
  };
  const task = new Task(taskData);
  try {
    const savedTask = await task.save();
    res.status(201).json({
      code: 201, message: 'Task added successfully',
      saved: savedTask
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({code: 404, message: 'Task not found' });
    if (!isExpired(task.deadline)) {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ code: 200, message: 'Task successfully deleted' });
    } else {
      res.status(405).json({ code: 405, message: 'Not allowed to delete task' });
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
const setTaskCompletion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({code: 403, message: errors.array()[0].msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({code: 404, message: 'Task not found' });
    if (!isExpired(task.deadline)) {
      task.completed = !task.completed;
      await Task.findByIdAndUpdate(req.params.id, { $set: task });
      res.status(200).json({ code: 200, message: 'Task successfully updated' });
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};
const isExpired = (deadline) => {
  let now = new Date(format(Date.now(), 'yyyy-MM-dd'));
  deadline = new Date(deadline);
  return isAfter(now, deadline);
};

module.exports = {
  fetchTasks,
  fetchEmployeeTasks,
  createTask,
  deleteTask,
  setTaskCompletion
};