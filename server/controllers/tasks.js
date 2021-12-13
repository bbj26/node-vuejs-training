const {
  CREATE_TASK,
  DELETE_TASK,
  FETCH_EMPLOYEE_TASKS,
  FETCH_TASKS,
  SET_TASK_COMPLETION
} = require('../constants/apiMethodNames');
const {
  TASK_CREATED,
  TASK_DELETED,
  TASK_DELETION_NOT_ALLOWED,
  TASK_NOT_FOUND,
  TASK_UPDATED
} = require('../constants/infoMessages');
const { format, isAfter } = require('date-fns');
const { validationResult } = require('express-validator');
const Task = require('../models/task');
const tasksLogger = require('../winston/tasksLogger');
const sendEmail = require('../nodemailer');

const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    tasksLogger.logFetchSuccess(FETCH_TASKS);
    res.status(200).json(tasks);
  } catch (error) {
    tasksLogger.logServerError(error, FETCH_TASKS);
    sendEmail(`${FETCH_TASKS} error. Details:\n${error.stack}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const fetchEmployeeTasks = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, FETCH_EMPLOYEE_TASKS);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const employeeId = req.params.id;
  try {
    const tasks = await Task.find({ employeeId });
    tasksLogger.logFetchSuccess(FETCH_EMPLOYEE_TASKS);
    res.status(200).json(tasks);
  } catch (error) {
    tasksLogger.logServerError(error, FETCH_EMPLOYEE_TASKS);
    sendEmail(`${FETCH_EMPLOYEE_TASKS} error. Details:\n${error.stack}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, CREATE_TASK);
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
      code: 201, message: TASK_CREATED, saved: savedTask
    });
  } catch (error) {
    tasksLogger.logServerError(error, CREATE_TASK);
    sendEmail(`${CREATE_TASK} error. Details:\n${error.stack}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};
const deleteTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, DELETE_TASK);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      tasksLogger.log404Error(req.params.id, DELETE_TASK);
      return res.status(404).json({ code: 404, message: TASK_NOT_FOUND });
    }
    if (!isExpired(task.deadline)) {
      await Task.findByIdAndDelete(req.params.id);
      tasksLogger.logDeletionSuccess(task.name);
      res.status(200).json({ code: 200, message: TASK_DELETED });
    } else {
      tasksLogger.log405Error(req.params.id);
      res.status(405).json({ code: 405, message: TASK_DELETION_NOT_ALLOWED });
    }
  } catch (error) {
    tasksLogger.logServerError(error, DELETE_TASK);
    sendEmail(`${DELETE_TASK} error. Details:\n${error.stack}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const setTaskCompletion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    tasksLogger.logValidationError(error, SET_TASK_COMPLETION);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      tasksLogger.log404Error(req.params.id, SET_TASK_COMPLETION);
      return res.status(404).json({ code: 404, message: TASK_NOT_FOUND });
    }
    if (!isExpired(task.deadline)) {
      task.completed = !task.completed;
      await Task.findByIdAndUpdate(req.params.id, { $set: task });
      tasksLogger.logUpdationSuccess(task._id, task.completed);
      res.status(200).json({ code: 200, message: TASK_UPDATED });
    }
  } catch (error) {
    tasksLogger.logServerError(error, SET_TASK_COMPLETION);
    sendEmail(`${SET_TASK_COMPLETION} error. Details:\n${error.stack}`);
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