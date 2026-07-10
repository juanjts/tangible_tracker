const identityService = require('../service/identityService');
const { successResponse } = require('../../../shared/http/response');

async function identify(req, res, next) {
  try {
    const { email } = req.body;
    const user = await identityService.identify({ email });
    successResponse(res, user);
  } catch (err) {
    next(err);
  }
}

async function listUsers(_req, res, next) {
  try {
    const users = await identityService.listUsers();
    successResponse(res, users);
  } catch (err) {
    next(err);
  }
}

module.exports = { identify, listUsers };
