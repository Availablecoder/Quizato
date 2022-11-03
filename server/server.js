const mongoose = require('mongoose');
require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});

// Handle Asynchronomus unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION Shutting down...');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});
