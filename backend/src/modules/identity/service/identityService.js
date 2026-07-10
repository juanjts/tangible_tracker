const AppError = require('../../../shared/errors/AppError');
const db = require('../../../config/firebase');
const userRepository = require('../repository/userRepository');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function identify({ email }) {
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  return await db.runTransaction(async (transaction) => {
    const existingUser = await userRepository.findByEmail(email, transaction);
    if (existingUser) return existingUser;
    return await userRepository.create({ email }, transaction);
  });
}

async function listUsers() {
  return await userRepository.findAll();
}

module.exports = { identify, listUsers };
