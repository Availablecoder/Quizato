const Question = require('../models/questionModel');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./factoryController');

exports.getAllQuestions = factory.getAll(Question, 'questions');
exports.createQuestions = factory.createOne(Question, 'question');
exports.getQuestion = factory.getOne(Question, 'question');
exports.updateQuestion = factory.updateOne(Question, 'question');
exports.deleteQuestion = factory.deleteOne(Question, 'question');
