// Import Recipe model
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Save recipe to favorites
exports.saveRecipeToFavorites = async (userId, recipeId) => {
    // Implement the logic to save a recipe to favorites
}

// Remove recipe from favorites
exports.removeRecipeFromFavorites = async (userId, recipeId) => {
    // Implement the logic to remove a recipe from favorites
}

// Get favorite recipes by user ID
exports.getFavoriteRecipes = async (userId) => {
    // Implement the logic to get favorite recipes by user ID
}

// Get recipe by ID
exports.getRecipesByFilters = async (userId, filters) => {
    // Implement the logic to get a recipe by ID
}

// Get recipe by ID
exports.getRecipeById = async (userId, recipeId) => {
    try {
        let recipe = await Recipe.findOne({_id: recipeId, userId: userId});
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Update recipe by ID
exports.updateRecipeById = async (userId, recipeId, body) => {
    try {
        let recipe = await Recipe.findOneAndUpdate({_id: recipeId, userId: userId}, body, { new: true });
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Delete recipe by ID
exports.deleteRecipeById = async (userId, recipeId) => {
    // Implement the logic to delete a recipe by ID
}

// Rate a recipe by Id
exports.rateRecipeById = async (userId, recipeId, rate) => {
    //implement recipe rating logic
}

exports.createRecipe = async (userId, body) => {
    body.userId = userId;
    const recipe = new Recipe(body);
    try {
        await recipe.save();
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
};