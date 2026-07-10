const express = require('express');
const cors = require('cors');

const identityRoutes = require('./src/modules/identity/routes/identityRoutes');
const userRoutes = require('./src/modules/identity/routes/userRoutes');
const taskRoutes = require('./src/modules/tasks/routes/taskRoutes');
const errorHandler = require('./src/shared/middlewares/errorHandler');
const metrics = require('./src/shared/middlewares/metrics');

const app = express();

app.use(cors());
app.use(metrics);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/identity', identityRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

module.exports = app;
