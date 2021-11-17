const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    default: [],
    required: true
  }
});

module.exports = mongoose.model('employee', employeeSchema, 'employees');