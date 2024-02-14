const recipeService = require('../services/recipeService');

exports.getRecipesByFilters = async (req, res) => {
  // Implement logic to get recipes by filters
  try {
      const recipes = await recipeService.getRecipesByFilters(req.params.userId, req.body);
      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getRecipeById = async (req, res) => {
  // Implement logic to get a recipe by ID
  try {
      const recipe = await recipeService.getRecipeById(req.params.userId, req.params.recipeId);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createRecipe = async (req, res) => {
  // Implement logic to get recipes by filters
  try {
      const recipe = await recipeService.createRecipe(req.params.userId, req.body);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error'+error });
    }
}

exports.updateRecipeById = async (req, res) => {
  // Implement logic to update a recipe by ID
  try {
      const recipe = await recipeService.updateRecipeById(req.params.userId, req.params.recipeId);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteRecipeById = async (req, res) => {
  // Implement logic to delete a recipe by ID
  try {
      const recipe = await recipeService.deleteRecipeById(req.params.userId, req.params.recipeId);
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.rateRecipeById = async (req, res) => {
  //implement logic to rate a recipe by id
  try {
    const recipe = await recipeService.rateRecipeById(req.params.userId, req.params.recipeId, req.body);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.saveRecipeToFavorites = async (req, res) => {
    // Implement logic to save a recipe to favorites
    try {
        const recipe = await recipeService.saveRecipeToFavorites(req.params.userId, req.body);
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.removeRecipeFromFavorites = async (req, res) => {
    // Implement logic to remove a recipe from favorites
    try {
        const recipe = await recipeService.removeRecipeFromFavorites(req.params.userId, req.params.recipeId);
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

exports.getFavoriteRecipes = async (req, res) => {
    // Implement logic to get favorite recipes
    try {
        const recipe = await recipeService.getFavoriteRecipes(req.params.userId);
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

