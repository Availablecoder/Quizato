const crypto = require('crypto');
// --
const jwt = require('jsonwebtoken');
// --
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email/email');

exports.signup = catchAsync(async (req, res, next) => {
  // Take the needed data from the request and leave the unneeded one if exists
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };

  // Check if the email address is already existed
  if (await User.findOne({ email: data.email })) {
    return next(
      new AppError(
        'Email address is already existed, please enter another email',
        401
      )
    );
  }

  const newUser = await User.create(data);

  await new Email(newUser, req.body.url).sendWelcome();

  // Create and send the token to user after signning up
  createAndSendToken(newUser, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(new AppError('Please provide email and password', 403));
  }

  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.findOne({ email: data.email }).select('+password');

  // Check if the user existed
  if (!user || !(await user.comparePasswords(data.password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Create and send the token to user after logged in
  createAndSendToken(user, res, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user
  const user = await User.findById(req.user._id).select('+password');

  // Check for the currentPassword correction
  if (
    !user ||
    !(await user.comparePasswords(req.body.currentPassword, user.password))
  ) {
    return next(new AppError('Your current password is wrong', 401));
  }

  // Save the user (new password) [before saving the hasing password middleware will work and checking too]
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;

  await user.save();

  // Create and send the token to user after updating his password
  createAndSendToken(user, res, 201);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address', 401));
  }

  // Getting reset token and save user new data to DB
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Sending email to the user with the reset api URL
  const resetURL = `${req.body.url}/${resetToken}`;

  console.log(user);
  console.log(resetURL);

  await new Email(user, resetURL).sendPasswordReset();

  res.status(200).json({
    status: 'success',
    message: 'We sent you a confirmation message, Please check out your email!',
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // hashing password where we preserve the hashed version in our DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // Check for the token validity and if its expires
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has been expired', 400));
  }

  // Update user password and delete the token and its expires date
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Create and send the token to user after changing password
  createAndSendToken(user, res, 201);
});

/* ############### Function Used ############### */
const createAndSendToken = (user, res, resStatus) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.password = undefined;
  res.status(resStatus).json({
    status: 'success',
    token,
    user,
  });
};
