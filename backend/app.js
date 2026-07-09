const express = require('express');

const identityRoutes = require('./src/modules/identity/routes/identityRoutes');
const taskRoutes = require('./src/modules/tasks/routes/taskRoutes');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/identity', identityRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
