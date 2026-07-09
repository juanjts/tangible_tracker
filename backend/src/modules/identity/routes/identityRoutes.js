const { Router } = require('express');
const { successResponse } = require('../../../shared/http/response');

const router = Router();

router.get('/test', (_req, res) => {
  successResponse(res, { message: 'Identity module ready' });
});

module.exports = router;
