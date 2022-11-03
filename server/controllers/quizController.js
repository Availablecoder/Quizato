const Quiz = require('../models/quizModel');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
const factory = require('./factoryController');

// Find the result of a user after submitting the answer of the Quiz
exports.findResult = catchAsync(async (req, res, next) => {
  // Populate questions to get the right Answer If there is a choices
  if (!req.body.choices) return next();

  const quiz = await Quiz.findById(req.body.quiz).populate({
    path: 'questions',
    select: 'rightAnswer -_id',
  });

  // Filling the number of Questions and right Answered Question by the choices we took from the user
  req.body.numOfQuestions = quiz.questions.length;
  req.body.rightAnsweredQuestions = quiz.questions.filter(
    (e, i) => e.rightAnswer === +req.body.choices[i]
  ).length;

  next();
});

exports.getAllQuizzes = factory.getAll(Quiz, 'quizzes');
exports.getQuiz = factory.getOne(
  Quiz,
  'quiz',
  {
    path: 'questions',
    select: 'title choices',
  },
  {
    path: 'results',
    options: {
      sort: 'percentage timeTaken',
    },
    populate: {
      path: 'user',
      select: 'name image',
    },
  }
  /**
   * Making this kind of population is too bad (two populations one of them containes nested one)
   * Since the Application is small it will not take alot of time to respond but when scaling the
   * application this will cause a problem in performance
   */
);
exports.createQuiz = factory.createOne(Quiz, 'quiz');
exports.updateQuiz = factory.updateOne(Quiz, 'quiz');
exports.deleteQuiz = factory.deleteOne(Quiz, 'quiz');
