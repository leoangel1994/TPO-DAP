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