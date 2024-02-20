// Import Recipe model
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Save recipe to favorites
exports.saveRecipeToFavorites = async (profileId, recipeId) => {
    // Implement the logic to save a recipe to favorites
}

// Remove recipe from favorites
exports.removeRecipeFromFavorites = async (profileId, recipeId) => {
    // Implement the logic to remove a recipe from favorites
}

// Get favorite recipes by user ID
exports.getFavoriteRecipes = async (profileId) => {
    // Implement the logic to get favorite recipes by user ID
}

// Get recipe by ID
exports.getRecipesByFilters = async (tags, ingredients, title) => {
    try {
        console.log(tags, ingredients, title)
        let tagsFilters = tags == null ? [] : tags.split(',');
        let ingredientsFilters = ingredients == null || ingredients == undefined ? [] : ingredients.split(',');
        let recipes = await Recipe
        .find({$or:[
            {tags: {$in:tagsFilters}},
            {'ingredients.name': {$in:ingredientsFilters}},
            {title: { $regex: '.*' + title + '.*' }}
        ]
        });
        return recipes;
    } 
    catch (err) {
        console.log(err);  
    }
}

exports.getRecipesForCarousel = async () => {
    try {
        let recipes = await Recipe
        .find({}).limit(10);
        return recipes;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Get recipe by ID
exports.getRecipeById = async (recipeId) => {
    try {
        let recipe = await Recipe.findOne({_id: recipeId});
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Update recipe by ID
exports.updateRecipeById = async (profileId, recipeId, body) => {
    try {
        let recipe = await Recipe.findOneAndUpdate({_id: recipeId, profileId: profileId}, body, { new: true });
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Delete recipe by ID
exports.deleteRecipeById = async (profileId, recipeId) => {
    try {
        let res = await Recipe.deleteOne({_id: recipeId, profileId: profileId});
        return res.deletedCount;
    } 
    catch (err) {
        console.log(err);
    }
}

// Rate a recipe by Id
exports.rateRecipeById = async (profileId, recipeId, rate) => {
    //implement recipe rating logic
}

exports.createRecipe = async (profileId, body) => {
    body.profileId = profileId;
    const recipe = new Recipe(body);
    try {
        await recipe.save();
        return recipe;
    } 
    catch (err) {
        console.log(err);  
    }
};

exports.getUserRecipes = async (userId) => {
    try {
        let recipes = await Recipe.find({profileId: userId});
        return recipes;
    } 
    catch (err) {
        console.log(err);  
    }
}