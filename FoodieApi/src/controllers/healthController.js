// Import any required services or models here
const healthService = require('../services/healthService');

// Define your controller methods
exports.getHealthCheck = async (req, res) => {
  try {
    const healthCheck = await healthService.getHealthCheck();
    res.json(healthCheck);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};