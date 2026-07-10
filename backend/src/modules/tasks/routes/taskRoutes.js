const { Router } = require('express');
const taskController = require('../controller/taskController');

const router = Router();

router.post('/', taskController.create);

module.exports = router;
