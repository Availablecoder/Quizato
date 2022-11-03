const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Question should have a title'],
  },
  choices: {
    type: [String],
    required: [true, 'Question should have choices'],
  },
  rightAnswer: {
    type: Number,
    required: [true, 'Question should have a right answer'],
  },
});

const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
