// Import Recipe model
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Save recipe to favorites
exports.saveRecipeToFavorites = async (profileId, recipeId) => {
    try {
        let recipe = await Recipe.findOne({_id: recipeId, profileId: profileId, favorite: false});
        if (recipe == null) return null;
        let favorite = recipe.favorite;
        let newFavorite = !favorite;
        recipe.favorite = newFavorite;
        await recipe.save();
        return recipe;


    }
    catch (err) {
        console.log(err);
    }


}

// Remove recipe from favorites
exports.removeRecipeFromFavorites = async (profileId, recipeId) => {
    try {
        let recipe = await Recipe.findOne({_id: recipeId, profileId: profileId, favorite: true});
        if (recipe == null) return null;
        recipe.favorite = false;
        await recipe.save();
        return recipe;
    }
    catch (err) {
        console.log(err);
    }

}

// Get favorite recipes by user ID
exports.getFavoriteRecipes = async (profileId) => {
    
    try {
        let recipes = await Recipe.find({profileId: profileId, favorite: true});
        return recipes;
    } 
    catch (err) {
        console.log(err);  
    }
}

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
  
    try {
        let recipe = await Recipe.findOne({_id: recipeId});
        if (recipe == null) return null;
        let rating = recipe.rating;
        let newRating = (rating + rate) / 2;
        recipe.rating = newRating;
        await recipe.save();
        return recipe;

    }
    catch (err) {
        console.log(err);
    }
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