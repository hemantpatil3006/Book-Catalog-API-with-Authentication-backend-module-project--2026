const { error } = require('../utils/responseHandler');

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    return error(res, message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return error(res, message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    return error(res, message, 400);
  }

  error(res, err.message, err.statusCode);
};

module.exports = errorHandler;
