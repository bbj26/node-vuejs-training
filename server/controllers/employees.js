const {
  EMPLOYEE_CREATED, EMPLOYEE_DELETED, EMPLOYEE_NOT_FOUND
} = require('../constants/infoMessages');
const {
  CREATE_EMPLOYEE, DELETE_EMPLOYEE, FETCH_EMPLOYEES
} = require('../constants/apiMethodNames');
const { formatApiErrorEmail, sendEmail } = require('../services/emailService');
const { validationResult } = require('express-validator');
const Employee = require('../models/employee');
const employeesLogger = require('../winston/employeesLogger');
const Task = require('../models/task');

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    employeesLogger.logFetchSuccess();
    res.status(200).json(employees);
  } catch (error) {
    employeesLogger.logServerError(error, FETCH_EMPLOYEES);
    sendEmail({ emailMessage: formatApiErrorEmail(FETCH_EMPLOYEES, error) });
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    employeesLogger.logValidationError(error, CREATE_EMPLOYEE);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  const { name, email, phone, age, pet } = req.body;
  const employeeData = { name, email, phone, age, pet };
  const employee = new Employee(employeeData);
  try {
    const savedEmployee = await employee.save();
    employeesLogger.logCreationSuccess(employee);
    res.status(201).json({ 
      code: 201, 
      message: EMPLOYEE_CREATED, 
      saved: savedEmployee 
    });
  } catch (error) {
    employeesLogger.logServerError(error, CREATE_EMPLOYEE);
    sendEmail({ emailMessage: formatApiErrorEmail(CREATE_EMPLOYEE, error) });
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array()[0];
    employeesLogger.logValidationError(error, DELETE_EMPLOYEE);
    return res.status(403).json({ code: 403, message: error.msg });
  }
  try {
    await Task.deleteMany({ employeeId: req.params.id });
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      employeesLogger.logDeletion404Error(req.params.id);
      res.status(404).json({ code: 404, message: EMPLOYEE_NOT_FOUND });
    } else {
      employeesLogger.logDeletionSuccess(employee.name);
      res.status(200).json({ code: 200, message: EMPLOYEE_DELETED });
    }
  } catch (error) {
    employeesLogger.logServerError(error, DELETE_EMPLOYEE);
    sendEmail({ emailMessage: formatApiErrorEmail(DELETE_EMPLOYEE, error) });
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  deleteEmployee
};