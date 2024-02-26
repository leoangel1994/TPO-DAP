// Import Recipe model
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Get recipe by ID
exports.getRecipesByFilters = async (tags, search) => {
    try {
        console.log(tags, search)
        let tagsFilters = tags == null ? [] : tags.split(',');
        let searchFilters = search == null ? [] : [search];
        let recipes = await Recipe
        .find({$or:[
            {tags: {$in:tagsFilters}},
            {'ingredients.name': {$in:searchFilters}},
            {title: { $regex: '.*' + search + '.*' }}
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

exports.getRecipesForCarouselByRating = async () => {
    try {
        let recipes = await Recipe
        .find({}).sort({rating: -1}).limit(10);
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
        if (!recipe) {
            throw new Error("Recipe not found");
        }

        // Calculate the average rating
        let totalRating = recipe.ratings.reduce((total, rating) => total + rating.rate, 0);
        recipe.rating = totalRating / recipe.ratings.length;

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

exports.rateRecipe = async (userId, recipeId, rate) => {
    if (rate < 0 || rate > 5) {
        throw new Error("La calificacion debe ser entre 0 y 5");
    }

    try {
        let recipe = await Recipe.findOne({_id: recipeId});
        if (!recipe) {
            throw new Error("Recipe not found");
        }

        // Add the rating and userId to the ratings array
        recipe.ratings.push({userId, rate});

        // Recalculate the average rating
        let totalRating = recipe.ratings.reduce((total, rating) => total + rating.rate, 0);
        recipe.rating = totalRating / recipe.ratings.length;

        await recipe.save();
        return recipe;
    } catch (err) {
        console.log(err);
    }
}




// Create a recipe
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

// Get user recipes
exports.getUserRecipes = async (userId) => {
    try {
        let recipes = await Recipe.find({profileId: userId});
        return recipes;
    } 
    catch (err) {
        console.log(err);  
    }
}