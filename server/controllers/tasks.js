const Task = require('../models/task');
const { validationResult } = require('express-validator');
const { format, isAfter } = require('date-fns');
const tasksLogger = require('../winston/tasksLogger');
const apiMethodNames = require('../constants/apiMethodNames');
const infoMessages = require('../constants/infoMessages');

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    tasksLogger.logFetchSuccess(apiMethodNames.FETCH_TASKS);
    res.status(200).json(tasks);
  } catch (error) {
    tasksLogger.logServerError(error, apiMethodNames.FETCH_TASKS);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const fetchEmployeeTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, apiMethodNames.FETCH_EMPLOYEE_TASKS);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const employeeId = req.params.id;
  try {
    const tasks = await Task.find({ employeeId });
    tasksLogger.logFetchSuccess(apiMethodNames.FETCH_EMPLOYEE_TASKS);
    res.status(200).json(tasks);
  } catch (error) {
    tasksLogger.logServerError(error, apiMethodNames.FETCH_EMPLOYEE_TASKS);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, apiMethodNames.CREATE_TASK);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const { name, deadline, completed = false } = req.body;
  const taskData = {
    name, deadline, completed,
    employeeId: req.params.id,
  };
  const task = new Task(taskData);
  try {
    const savedTask = await task.save();
    tasksLogger.logCreationSuccess(savedTask);
    res.status(201).json({
      code: 201, message: infoMessages.TASK_CREATED,
      saved: savedTask
    });
  } catch (error) {
    tasksLogger.logServerError(error, apiMethodNames.CREATE_TASK);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, apiMethodNames.DELETE_TASK);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      tasksLogger.log404Error(req.params.id, apiMethodNames.DELETE_TASK);
      return res.status(404).json({
        code: 404,
        message: infoMessages.TASK_NOT_FOUND
      });
    }
    if (!isExpired(task.deadline)) {
      await Task.findByIdAndDelete(req.params.id);
      tasksLogger.logDeletionSuccess(task.name);
      res.status(200).json({ code: 200, message: infoMessages.TASK_DELETED });
    } else {
      tasksLogger.log405Error(req.params.id);
      res.status(405).json({
        code: 405,
        message: infoMessages.TASK_DELETION_NOT_ALLOWED
      });
    }
  } catch (error) {
    tasksLogger.logServerError(error, apiMethodNames.DELETE_TASK);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const setTaskCompletion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, apiMethodNames.SET_TASK_COMPLETION);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      tasksLogger.log404Error(req.params.id, apiMethodNames.SET_TASK_COMPLETION);
      return res.status(404).json({
        code: 404,
        message: infoMessages.TASK_NOT_FOUND
      });
    }
    if (!isExpired(task.deadline)) {
      task.completed = !task.completed;
      await Task.findByIdAndUpdate(req.params.id, { $set: task });
      tasksLogger.logUpdationSuccess(task._id, task.completed);
      res.status(200).json({ code: 200, message: infoMessages.TASK_UPDATED });
    }
  } catch (error) {
    tasksLogger.logServerError(error, apiMethodNames.SET_TASK_COMPLETION);
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