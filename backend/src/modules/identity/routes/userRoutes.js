const { Router } = require('express');
const identityController = require('../controller/identityController');

const router = Router();

router.get('/', identityController.listUsers);

module.exports = router;
