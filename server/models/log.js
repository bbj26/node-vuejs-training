const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
  level: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  meta: {
    type: Object,
  }
});

module.exports = mongoose.model('log', logSchema, 'Logs');