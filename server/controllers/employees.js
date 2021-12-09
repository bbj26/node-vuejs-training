const Employee = require('../models/employee');
const Task = require('../models/task');
const { validationResult } = require('express-validator');

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const createEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  const employeeData = {
    name: req.body.name,
  };
  const employee = new Employee(employeeData);
  try {
    const savedEmployee = await employee.save();
    res.status(201).json({
      code: 201, message: 'Employee added successfully',
      saved: savedEmployee
    });
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(403).json({ code: 403, message: errors.array()[0].msg });
  }
  try {
    await Task.deleteMany({ employeeId: req.params.id });
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) {
      res.status(404).json({ code: 404, message: 'Employee not found' });
    } else {
      res.status(200).json({ code: 200, message: 'Employee successfully deleted' });
    }
  } catch (error) {
    res.status(500).json({ code: 500, message: error.message });
  }
};

module.exports = {
  fetchEmployees,
  createEmployee,
  deleteEmployee
};