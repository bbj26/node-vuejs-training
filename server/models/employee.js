const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  age: { type: Number },
  pet: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('employee', employeeSchema, 'employees');