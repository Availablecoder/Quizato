class AppError extends Error {
  /**
   *  @param message => [Error message] the message that will be send to the user
   *  @param statusCode => [Error statuscode] the status code of the response
   *  @param status => [Error status] which is fail or error according to the error type 4.. or 5..
   *  @param isOperational => [Error type] since we made this error so we will give a message expressing the details of an error
   */

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor); // to prevent getting the AppError stack in error
  }
}

module.exports = AppError;
