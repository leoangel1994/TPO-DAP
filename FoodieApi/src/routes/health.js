const express = require('express');
const healthController = require('../controllers/healthController');
const auth = require('../services/authService');

const router = express.Router();

router.get('/', auth.authenticateToken, healthController.getHealthCheck);

module.exports = router;
