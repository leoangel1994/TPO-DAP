const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/**
 * User Schema
 */
const FavoriteSchema = new Schema({
    recipeId: Schema.ObjectId,
    profileId: String,
    title: String,
    image: String,
    createdAt: { type: Date, default: Date.now }
    
});


const UserSchema = new Schema({
    profileId: String,
    userName: String,
    name: String,
    familyName: String,
    email: String,
    photo: String,
    favorites: [FavoriteSchema],
    createdAt: { type: Date, default: Date.now },
    preferences: [String],
    accessToken: String,
    refreshToken: String});

const User = mongoose.model('User', UserSchema);
module.exports = User;