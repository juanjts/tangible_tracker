const taskService = require('../service/taskService');
const { successResponse } = require('../../../shared/http/response');

async function create(req, res, next) {
  try {
    const activeUserEmail = req.headers['x-user-email'];
    const task = await taskService.create({ ...req.body, activeUserEmail });
    successResponse(res, task, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = { create };
