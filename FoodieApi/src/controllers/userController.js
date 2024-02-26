const userService = require('../services/userService');
const getProfileId = require('../utils/jwtHelper').getProfileId;

exports.getUserById = async (req, res) => {
  try {
    //Get user from token
    const authUserId = getProfileId(req);
    if (authUserId == null) return res.sendStatus(401);
   
    let userId =  (req.params.id == null) ? authUserId : req.params.id;
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
      const userId = getProfileId(req);
      if (userId == null) return res.sendStatus(401);
      
      const user = await userService.updateUserById(userId, req.body);
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

exports.saveFavoriteRecipe = async (req, res) => {
    try {
        const userId = getProfileId(req);
        if (userId == null) return res.sendStatus(401);

        const recipeId = req.params.recipeId;
        if (!recipeId) return res.status(400).json({ error: 'Recipe ID is required' });

        const user = await userService.saveFavoriteRecipe(userId, recipeId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.removeFavoriteRecipe = async (req, res) => {
    try {
        const userId = getProfileId(req);
        if (userId == null) return res.sendStatus(401);

        const recipeId = req.params.recipeId;
        if (!recipeId) return res.status(400).json({ error: 'Recipe ID is required' });

        const user = await userService.removeFavoriteRecipe(userId, recipeId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getFavoriteRecipes = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    const recipes = await userService.getFavoriteRecipes(userId);
    if (!recipes) return res.status(404).json({ error: 'Recipes not found' });

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
