// Import any required services or models here
const authService = require('../services/authService');

// Define your controller methods
exports.login = async (req, res) => {
  try {
    const user = await authService.login(req, res);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const user = await authService.logout(req, res);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) return res.sendStatus(401);

    const newToken = await authService.refreshToken(refreshToken);
    if (newToken == null) return res.sendStatus(403);
    res.json({ accessToken: newToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};