function successResponse(res, data, statusCode = 200) {
  return res.status(statusCode).json({ data, statusCode });
}

function errorResponse(res, message, statusCode = 500) {
  return res.status(statusCode).json({
    error: { message, statusCode },
  });
}

module.exports = { successResponse, errorResponse };
