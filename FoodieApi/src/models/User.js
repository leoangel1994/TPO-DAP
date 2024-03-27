const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    profileId: String,
    userName: String,
    name: String,
    familyName: String,
    email: String,
    photo: String,
    favourites: [String],
    createdAt: { type: Date, default: Date.now },
    preferences: [String],
    accessToken: String,
    refreshToken: String});

const User = mongoose.model('User', UserSchema);
module.exports = User;