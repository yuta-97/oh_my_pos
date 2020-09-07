// todo.js

const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  // To-do title
  title: {
    type: String,
    required: true
  },
  // To-do create date
  createAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', TodoSchema);