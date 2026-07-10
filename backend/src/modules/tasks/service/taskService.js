const AppError = require('../../../shared/errors/AppError');
const userRepository = require('../../identity/repository/userRepository');
const taskRepository = require('../repository/taskRepository');
const { validateTaskInput } = require('../validations/taskValidations');

async function list() {
  return await taskRepository.findAll();
}

async function getById(id) {
  const task = await taskRepository.findById(id);
  if (!task) throw new AppError('Task not found', 404);
  return task;
}

async function create({ title, description, priority, status, responsibleEmail, activeUserEmail }) {
  const validationErrors = validateTaskInput({ title, priority, status });
  if (validationErrors.length > 0) {
    throw new AppError(validationErrors.join('. '), 400);
  }

  if (!responsibleEmail) throw new AppError('Responsible email is required', 400);
  if (!activeUserEmail) throw new AppError('Active user is required', 400);

  const owner = await userRepository.findByEmail(activeUserEmail);
  if (!owner) throw new AppError('Active user not found', 400);

  const responsible = await userRepository.findByEmail(responsibleEmail);
  if (!responsible) throw new AppError('Responsible user not found', 404);

  const taskData = {
    title,
    description: description || '',
    priority,
    status,
    owner: { id: owner.id, email: owner.email },
    responsible: { id: responsible.id, email: responsible.email },
  };

  return await taskRepository.create(taskData);
}

module.exports = { list, getById, create };
