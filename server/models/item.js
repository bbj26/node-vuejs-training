const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('item', itemSchema, 'items');