const { Router } = require('express');
const identityController = require('../controller/identityController');

const router = Router();

router.post('/', identityController.identify);

module.exports = router;
