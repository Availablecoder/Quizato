const mongoose = require('mongoose');
const crypto = require('crypto');
// ---
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError');

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      index: {
        unique: true,
      },
      required: [true, 'You should enter your email address'],
      validate: {
        // Check for a valid email address
        validator: (email) =>
          /(?=.*[a-zA-Z])[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,}/.test(email),
        message: 'Email address is invalid',
      },
    },
    name: {
      type: String,
      required: [true, 'User should have a name'],
      minLength: [3, 'Please enter a valid name'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minLength: 8,
      // select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on SAVING and CREATING and not in updating.
        validator: function (passwordConfirm) {
          return passwordConfirm === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    image: String,
    active: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * GLOBAL MIDDLEWARES FOR USER SCHEMA
 */

// Get the user results in exams
userSchema.virtual('results', {
  ref: 'Results',
  foreignField: 'user',
  localField: '_id',
});

// Hashing password pefore saving it
userSchema.pre('save', async function (next) {
  // Check if the password didn't changed
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

// create updated password date
userSchema.pre('save', async function (next) {
  // Check if the password didn't changed or if the document is new (first created)
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 3000;

  next();
});

// Select the active users only
userSchema.pre(/^find/, function (next) {
  // Getting users that are only active and remove some data from getting by our API
  this.find({ active: { $ne: false } }).select('-__v');
  next();
});

/**
 * GLOBAL METHODS FOR USERSCHEMA (FUNCTIONS CAN BE USED BY ANY USER)
 */

// Compare password entered by the user to the hashed one stored in the DB
userSchema.methods.comparePasswords = async (
  unhashedPassword,
  hashedPassword
) => await bcrypt.compare(unhashedPassword, hashedPassword);

// Create Password Reset Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // Reserve encrytped token in data base
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 min then the password expires
  return resetToken; // send unencrypted token to email
};

const User = mongoose.model('User', userSchema);

module.exports = User;
