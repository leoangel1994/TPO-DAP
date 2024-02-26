// Import User model
const User = require('../models/User');
const Recipe = require('../models/Recipe');

// Get user by ID
exports.getUserById = async (profileId) => {
    try {
        let user = await User.findOne({profileId: profileId});
        return user;
    } 
    catch (err) {
        console.log(err);  
    }
}

// Update user by ID
exports.updateUserById = async (userId, req) => {
    try {
        let user = await User.findOneAndUpdate({profileId: userId}, req, {new: true});
        return user;
    }
    catch (err) {
        console.log(err);
    }
}

// Delete user by ID
exports.deleteUserById = async (id) => {
    
    try {
        let res = await User.deleteOne({_id: id});
        return res.deletedCount;
    } 
    catch (err) {
        console.log(err);
    }
    

}

// Save favourite recipe
exports.saveFavoriteRecipe = async (userId, recipeId) => {
    try {
        let user = await User.findOne({profileId: userId});
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.favourites.includes(recipeId)) {
            user.favourites.push(recipeId);
            await user.save();
        }
        let recipes = await Recipe
        .find({_id : {$in:user.favourites}});
        return recipes;
    } catch (err) {
        console.log(err);
    }
}

// Remove favorite recipe

exports.removeFavoriteRecipe = async (userId, recipeId) => {
    try {
        let user = await User.findOne({profileId: userId});
        if (!user) {
            throw new Error('User not found');
        }
        let newFavourites = user.favourites.filter(fav => fav != recipeId);
        user.favourites = newFavourites;
        await user.save();

        let recipes = await Recipe
        .find({_id : {$in:user.favourites}});
        return recipes;
    } catch (err) {
        console.log(err);
    }
}

// Get favorite recipes

exports.getFavoriteRecipes = async (userId) => {
    try {
        let user = await User.findOne({profileId: userId});
        if (!user) {
            throw new Error('User not found');
        }
        let recipes = await Recipe
        .find({_id : {$in:user.favourites}});
        return recipes;
    } catch (err) {
        console.log(err);
    }
}

