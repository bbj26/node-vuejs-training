const Employee = require('../models/employee');
const Task = require('../models/task');
const { validationResult } = require('express-validator');
const employeesLogger = require('../winston/employeesLogger');
const apiMethodNames = require('../constants/apiMethodNames');
const infoMessages = require('../constants/infoMessages');

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    employeesLogger.logFetchSuccess();
    res.status(200).json(employees);
  } catch (error) {
    employeesLogger.logServerError(error, apiMethodNames.FETCH_EMPLOYEES);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    employeesLogger.logValidationError(error, apiMethodNames.CREATE_EMPLOYEE);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const employeeData = { name: req.body.name };
  const employee = new Employee(employeeData);
  try {
    const savedEmployee = await employee.save();
    employeesLogger.logCreationSuccess(employee);
    res.status(201).json({
      code: 201, message: infoMessages.EMPLOYEE_CREATED,
      saved: savedEmployee
    });
  } catch (error) {
    employeesLogger.logServerError(error, apiMethodNames.CREATE_EMPLOYEE);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    employeesLogger.logValidationError(error, apiMethodNames.DELETE_EMPLOYEE);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    await Task.deleteMany({ employeeId: req.params.id });
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      employeesLogger.logDeletion404Error(req.params.id);
      res.status(404).json({
        code: 404,
        message: infoMessages.EMPLOYEE_NOT_FOUND
      });
    } else {
      employeesLogger.logDeletionSuccess(employee.name);
      res.status(200).json({
        code: 200,
        message: infoMessages.EMPLOYEE_DELETED
      });
    }
  } catch (error) {
    employeesLogger.logServerError(error, apiMethodNames.DELETE_EMPLOYEE);
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  deleteEmployee
};