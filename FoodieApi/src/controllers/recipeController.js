const recipeService = require('../services/recipeService');
var mongoose = require('mongoose');
const getProfileId = require('../utils/jwtHelper').getProfileId;

exports.getRecipesByFilters = async (req, res) => {
  try {
    //Get user from token
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);
    
    const recipes = await recipeService.getRecipesByFilters(userId, req.query.filters);
    if (recipes == null){
      res.status(404).json({ error: 'Recipes not found' });
      return;
    } 
    res.json(recipes);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getRecipeById = async (req, res) => {
  // Implement logic to get a recipe by ID
  try {
    //Get user from token
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    const recipe = await recipeService.getRecipeById(userId, req.params.id);

    if (recipe == null){
      res.status(404).json({ error: 'Recipe not found' });
      return;
    } 
    res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createRecipe = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);
    
    const recipe = await recipeService.createRecipe(userId, req.body);
    
    res.json(recipe);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error'});
    }
}

exports.updateRecipeById = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);
    
    const recipe = await recipeService.updateRecipeById(userId, req.params.id, req.body);
    
    if (recipe == null){
      res.status(404).json({ error: 'Recipe not found' });
      return;
    } 
    res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.deleteRecipeById = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);
    
    let result = await recipeService.deleteRecipeById(userId, req.params.id);
    if (result == 0){
      res.status(404).json({ error: 'Recipe not found' });
      return;
    } 
    res.json(200);
    } catch (error) {
      console.log(error);
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
    try {
        const recipe = await recipeService.getFavoriteRecipes(req.params.userId);
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

