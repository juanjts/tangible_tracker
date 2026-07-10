const { Router } = require('express');
const taskController = require('../controller/taskController');

const router = Router();

router.get('/', taskController.list);
router.get('/:id', taskController.getById);
router.patch('/:id', taskController.update);
router.post('/', taskController.create);

module.exports = router;
