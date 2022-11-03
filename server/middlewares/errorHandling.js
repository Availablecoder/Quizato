const AppError = require('../utils/appError');

// Global Error Handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log(err);
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === 'production') {
    if (!err.isOperational) {
      if (err.name === 'ValidationError') {
        err = handleValidationError(err);
      }
      if (err.name === 'CastError') {
        err = handleCastErrorDB(err);
      }
      if (err.code === 11000) {
        err = handleDuplicateFieldsDB(err);
      }
      if (err.name === 'JsonWebTokenError') {
        err = handleJWTError(err);
      }
      if (err.name === 'TokenExpiredError') {
        err = handleJWTExpiredError(err);
      }
    }
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};

/* ############## Function User ################# */

const handleValidationError = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Invalid input fields: ${messages.join('. ')}`, 400);
};
const handleCastErrorDB = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate fields value: (${Object.keys(err.keyValue).join(
    ', '
  )}). Please use another value!`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token, please login again!', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired, please login again!', 401);
