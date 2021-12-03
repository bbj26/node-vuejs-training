const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('employee', employeeSchema, 'employees');