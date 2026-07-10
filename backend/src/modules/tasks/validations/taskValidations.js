const VALID_PRIORITIES = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['To Do', 'In Progress', 'Done'];

function validateTaskInput({ title, priority, status }) {
  const errors = [];

  if (!title || !title.trim()) errors.push('Title is required');
  if (!priority || !VALID_PRIORITIES.includes(priority)) errors.push('Invalid priority');
  if (!status || !VALID_STATUSES.includes(status)) errors.push('Invalid status');

  return errors;
}

module.exports = { validateTaskInput, VALID_PRIORITIES, VALID_STATUSES };
