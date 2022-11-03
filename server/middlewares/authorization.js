const { promisify } = require('util');
// --
const jwt = require('jsonwebtoken');
// --
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if the user is logged in or not by checking for the token
  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  // Check if the user is existed
  if (!currentUser) {
    return next(new AppError('This user is no longer existed', 403));
  }

  /**
   * You need to check also if the user changed his password or not, where when
   * the user update his password he recevies a new token so you need to check
   * if the user who updated his password is using the old or the valid new token
   */

  req.user = currentUser;
  next();
});

exports.restrictedTo = (...roles) =>
  catchAsync(async (req, res, next) => {
    console.log('#########');
    console.log(req.user);
    console.log('#########');
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have the access for this route", 403)
      );
    }
    next();
  });
