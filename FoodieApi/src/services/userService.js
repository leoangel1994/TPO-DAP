// Import User model
const User = require('../models/User');
const auth = require('../services/authService');

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

// Save favorite recipe

exports.saveFavoriteRecipe = async (userId, recipeId) => {
    try {
        let user = await User.findOne({profileId: userId});
        if (!user) {
            throw new Error('User not found');
        }
        user.favoriteRecipes.push(recipeId);
        await user.save();
        return user;
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
        const index = user.favoriteRecipes.indexOf(recipeId);
        if (index > -1) {
            user.favoriteRecipes.splice(index, 1);
        }
        await user.save();
        return user;
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
        return user.favoriteRecipes;
    } catch (err) {
        console.log(err);
    }
}

