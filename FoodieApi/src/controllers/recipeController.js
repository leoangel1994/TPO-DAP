const recipeService = require('../services/recipeService');
var mongoose = require('mongoose');
const getProfileId = require('../utils/jwtHelper').getProfileId;

exports.getRecipesByFilters = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipesByFilters(req.query.tags, req.query.search);
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

exports.getRecipesForCarousel = async (req, res) => {
  try { 
    const recipes = await recipeService.getRecipesForCarousel();
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

exports.getRecipesForCarouselByRating = async (req, res) => {
  try {
    const recipes = await recipeService.getRecipesForCarouselByRating();

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
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);

    if (recipe == null){
      res.status(404).json({ error: 'Recipe not found' });
      return;
    } 
    res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getUserRecipes = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    const recipes = await recipeService.getUserRecipes(userId);

    if (recipes == null){
      res.status(404).json({ error: 'Recipes for user not found' });
      return;
    } 
    res.json(recipes);
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

exports.rateRecipe = async (req, res) => {
  try {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    const { rating } = req.body;
    if (rating < 0 || rating > 5) {
      return res.status(400).json({ error: 'La calificacion debe ser entre 0 y 5' });
    }

    const recipe = await recipeService.rateRecipe(userId, req.params.id, rating);

    if (recipe == null){
      res.status(404).json({ error: 'Recipe not found' });
      return;
    } 
    res.json(recipe);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}









