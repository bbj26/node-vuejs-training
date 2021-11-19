const Employee = require('../models/employee')
const Task = require('../models/task')

const fetchEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
    res.status(200).json(employees)
  } catch (error) {
    res.status(404).json({ code: 404, msg: error })
  }
}

const createEmployee = async (req, res) => {
  let employeeData = {
    name: req.body.name,
  }
  let employee = new Employee(employeeData);

  try {
    const savedEmployee = await employee.save()
    res.status(201).json({ code: 201, message: 'Employee added successfully', saved: savedEmployee })
  } catch (error) {
    res.status(400).json({ code: 400, msg: error })
  }
}

const deleteEmployee = async (req, res) => {
  try {
    await Task.deleteMany({ "employeeId": req.params.id })
    await Employee.findByIdAndRemove(req.params.id)
    res.status(200).json({ code: 200, message: 'Employee successfully deleted' })
  } catch (error) {
    res.status(400).json({ code: 400, msg: error })
  }
}

module.exports = {
  fetchEmployees,
  createEmployee,
  deleteEmployee
}