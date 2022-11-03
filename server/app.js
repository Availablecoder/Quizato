const express = require('express');
const cors = require('cors');
// ---
const quizRoute = require('./routes/quizRoutes');
const questionRoute = require('./routes/questionRoutes');
const userRoute = require('./routes/userRoutes');
const resultRoute = require('./routes/resultRoutes');
const globalErrorMiddleware = require('./middlewares/errorHandling');
const AppError = require('./utils/appError');

const app = express();

/**
 * GLOBAL MIDDLEWARES
 */

// Body Parser, reading data by different formats
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cors());

/**
 * ROUTES CONNECTIONS
 */

app.use('/api/v1/quizzes', quizRoute);
app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/results', resultRoute);

// Catching mistake routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Glogal Error Middleware
app.use(globalErrorMiddleware);

module.exports = app;
