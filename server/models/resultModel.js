const mongoose = require('mongoose');
// ---
const Quiz = require('../models/quizModel');

const resultSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.ObjectId,
      ref: 'Quizzes',
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    numOfQuestions: {
      type: Number,
      required: [true, 'Number of Questions is missing'],
    },
    rightAnsweredQuestions: {
      type: Number,
      required: [true, 'Right Answered Questions is missing'],
    },
    percentage: Number,
    timeTaken: {
      type: Number,
      required: [true, 'Time taken for quiz is missing'],
    },
    review: {
      type: {
        type: String,
      },
      stars: {
        type: Number,
        min: [1, 'The minimum value of a review is 1'],
        max: [5, 'The maximum value of a review is 5'],
      },
      text: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

resultSchema.index({ quiz: 1, user: 1 }, { unique: true });

// Modifying the [average rating] and [number of reviews] in the Quiz schema
resultSchema.statics.updateQuizReviews = async function (quizId) {
  const statistics = await this.aggregate([
    {
      $match: { quiz: quizId, review: { $ne: undefined } },
    },
    {
      $group: {
        _id: '$quiz',
        numOfRating: { $sum: 1 },
        avgRating: { $avg: '$review.stars' },
      },
    },
  ]);

  if (statistics.length > 0) {
    await Quiz.findByIdAndUpdate(quizId, {
      averageRating: statistics[0].avgRating.toPrecision(2),
      numOfReviews: statistics[0].numOfRating,
    });
  } else {
    await Quiz.findByIdAndUpdate(quizId, {
      averageRating: 0,
      numOfReviews: 0,
    });
  }
};

// Adding the percentage before saving
resultSchema.pre('save', function (next) {
  this.percentage = (this.rightAnsweredQuestions / this.numOfQuestions) * 100;
  next();
});
resultSchema.pre('findOneAndUpdate', function (next) {
  /**
   * Updating the percentage before saving (findOneAndUpdate) is query middleware so this is
   * refering to Query and not to the document itself
   */

  if (this._update.rightAnsweredQuestions && this._update.numOfQuestions) {
    this._update.percentage =
      (this._update.rightAnsweredQuestions / this._update.numOfQuestions) * 100;
  }
  next();
});

// Updating Quiz reviews after saving the result
resultSchema.post('save', async function () {
  await this.constructor.updateQuizReviews(this.quiz);
});

// Saving any document (so that we can handle its Model in case of delete)
resultSchema.pre(/^findOneAnd/, async function (next) {
  // Getting the document before deleting
  this.document = await this.model.findById(this._conditions._id);
  next();
});

// Updating Quiz reviews after Updating or deleteing a result
resultSchema.post(/^findOneAnd/, async function () {
  await this.document.constructor.updateQuizReviews(this.document.quiz);
});

const Result = mongoose.model('Results', resultSchema);

module.exports = Result;
