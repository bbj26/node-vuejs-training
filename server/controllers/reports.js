const Employee = require('../models/employee');
const logger = require('../winston');
const Task = require('../models/task');
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");

const renderEmployeeReport = async (req, res) => {
  try {
    const employees = await Employee.find();
    const emp = employees[Math.floor(Math.random() * 100)];
    const tasks = await Task.find({ employeeId: emp._id });
    //res.render('report-template', { emp, tasks });
    ejs.renderFile(path.join(__dirname, '../views/', 'report-template.ejs'), { emp, tasks }, (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          format: 'A4',
          orientation: 'portrait',
        };
        pdf.create(data, options).toFile(path.join(__dirname, '../reports/', `${emp.name}.pdf`), function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send(`<a>${data.filename}</>`);
          }
        });
      }
    });
  } catch (error) {
    logger.error(`Error rendering employee report. ${error.message}`);
  }
};

module.exports = {
  renderEmployeeReport
};