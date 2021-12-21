const Employee = require('../models/employee');
const logger = require('../winston');
const Task = require('../models/task');
const { format } = require('date-fns');

const renderEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.find().limit(1);
    const emp = employees[0];
    const tasks = await Task.find({ employeeId: emp._id });
    res.render('report-template', { emp, tasks });
  } catch (error) {
    logger.error(`Error rendering employee report. ${error.message}`);
  }
};

module.exports = {
  renderEmployeeReport
};