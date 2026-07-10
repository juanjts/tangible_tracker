const { Router } = require('express');
const taskController = require('../controller/taskController');

const router = Router();

router.get('/', taskController.list);
router.post('/', taskController.create);

module.exports = router;
