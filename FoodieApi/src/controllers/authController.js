// Import any required services or models here
const authService = require('../services/authService');

// Define your controller methods
exports.login = async (req, res) => {
  try {
    const user = await authService.login();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.logout = async (req, res) => {
    try {
      const user = await authService.logout();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };