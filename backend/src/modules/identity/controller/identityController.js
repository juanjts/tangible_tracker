const identityService = require('../service/identityService');
const { successResponse } = require('../../../shared/http/response');

async function identify(req, res, next) {
  try {
    const { email } = req.body;

    if (!email) {
      const AppError = require('../../../shared/errors/AppError');
      throw new AppError('Email is required', 400);
    }

    const user = await identityService.identify({ email });
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

module.exports = { identify };
