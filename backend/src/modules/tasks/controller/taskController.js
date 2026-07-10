const taskService = require('../service/taskService');
const { successResponse } = require('../../../shared/http/response');

async function list(_req, res, next) {
  try {
    const tasks = await taskService.list();
    successResponse(res, tasks);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const task = await taskService.getById(req.params.id);
    successResponse(res, task);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const activeUserEmail = req.headers['x-user-email'];
    const task = await taskService.create({ ...req.body, activeUserEmail });
    successResponse(res, task, 201);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, create };
