const userService = require('../services/userService');
const getProfileId = require('../utils/jwtHelper').getProfileId;

exports.getUserById = async (req, res) => {
  // Implement logic to get a user by ID
  try {
    //Get user from token
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);
    
    const user = await userService.getUserById(userId);
    if (user == null){
      res.status(404).json({ error: 'User not found' });
      return;
    } 
    res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.updateUserById = async (req, res) => {
    // Implement logic to update a user by ID
    try {
        const user = await userService.updateUserById(req);
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.deleteUserById = async (req, res) => {
    // Implement logic to delete a user by ID
    try {
        const user = await userService.deleteUserById(req.params.id);
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}