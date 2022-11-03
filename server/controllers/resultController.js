const Result = require('../models/resultModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./factoryController');

exports.getQuizAndUserIds = function (req, res, next) {
  if (!req.body.quiz) req.body.quiz = req.params.quizId;
  if (!req.body.user) req.body.user = req.user._id;

  next();
};

exports.reviewAuth = catchAsync(async (req, res, next) => {
  // Check if the user want to make actions to a non owned review
  const result = await Result.findById(req.params.id);

  if (!result) {
    return next(new AppError('There is no result with this ID', 404));
  }

  // Change objectId to a string to compare them
  if (`${req.user._id}` !== `${result.user}`) {
    return next(new AppError("You cant't change this review.", 403));
  }
  next();
});

exports.getAllResults = factory.getAll(Result, 'results');
exports.createResult = factory.createOne(Result, 'result');
exports.getResult = factory.getOne(Result, 'result');
exports.updateResult = factory.updateOne(Result, 'result');
exports.deleteResult = factory.deleteOne(Result, 'result');
