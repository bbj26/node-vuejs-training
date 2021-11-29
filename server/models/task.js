const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'employee'
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('task', TaskSchema, 'tasks');