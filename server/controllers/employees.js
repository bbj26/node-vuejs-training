const Employee = require('../models/employee');
const Task = require('../models/task');
const { validationResult } = require('express-validator');
const logger = require('../winston');

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    logger.info('Succesfull operation: fetchEmployees');
    res.status(200).json(employees);
  } catch (error) {
    logger.error(`Operation failed: fetchEmployees. Error: ${error.message}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array()[0];
    logger.error('Operation failed: createEmployee. Invalid value ' + 
      `'${err.value}' for property '${err.param}'. Error: ${err.msg}`);
    return res.status(403).json({ code: 403, message: err.msg });
  }
  const employeeData = {
    name: req.body.name,
  };
  const employee = new Employee(employeeData);
  try {
    const savedEmployee = await employee.save();
    logger.info(`New employee created. Name: ${employee.name} - id: ${employee._id}`);
    res.status(201).json({
      code: 201, message: 'Employee added successfully',
      saved: savedEmployee
    });
  } catch (error) {
    logger.error(`Operation failed: createEmployee. Error: ${error.message}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array()[0];
    logger.error(`Operation failed: deleteEmployee. Invalid value '${err.value}'` +
      `for property '${err.param}'. Error: ${err.msg}`);
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  try {
    await Task.deleteMany({ employeeId: req.params.id });
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      logger.error('Operation failed: deleteEmployee. ' +
        `employeeId: '${req.params.id}' not found`);
      res.status(404).json({ code: 404, message: 'Employee not found' });
    } else {
      logger.info(`Employee deleted: ${employee.name}`);
      res.status(200).json({ code: 200, message: 'Employee successfully deleted' });
    }
  } catch (error) {
    logger.error(`Operation failed: deleteEmployee. Error: ${error.message}`);
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  deleteEmployee
};