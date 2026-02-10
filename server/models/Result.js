const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Result', ResultSchema);
