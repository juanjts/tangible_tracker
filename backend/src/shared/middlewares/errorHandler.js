const AppError = require('../errors/AppError');
const { errorResponse } = require('../http/response');

function errorHandler(err, _req, res, _next) {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof AppError ? err.message : 'Internal server error';

  if (!(err instanceof AppError)) {
    console.error('Unexpected error:', err);
  }

  errorResponse(res, message, statusCode);
}

module.exports = errorHandler;
