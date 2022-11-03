const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Quiz should have a title'],
    },
    slug: {
      type: String,
      unique: true,
    },
    subDescription: {
      type: String,
      required: [true, 'Quiz should have a sub-description'],
    },
    description: {
      type: String,
      required: [true, 'Quiz should have a description'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/availablecoder/image/upload/v1663586571/quiz-app/quizzes/web-programming_avex29.png',
    },
    tags: {
      type: [String],
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    questions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Questions',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virutal populate quiz results
quizSchema.virtual('results', {
  ref: 'Results',
  foreignField: 'quiz',
  localField: '_id',
});

quizSchema.pre('save', function (next) {
  this.slug = this.title.toLowerCase().replace(/\s/g, '-');
  next();
});

const Quiz = mongoose.model('Quizzes', quizSchema);

module.exports = Quiz;
