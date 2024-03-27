const parseFile = require('../services/fileService');
const User = require('../models/User');
const getProfileId = require('../utils/jwtHelper').getProfileId;
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

exports.uploadProfileImage = async (req, res) => {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    let uploadResult = await parseFile.parsefile(req, userId);
    if(uploadResult.error){
        res.status(400).json({
            message: "An error occurred.",
            error: uploadResult.error
        });
        console.log(uploadResult.error);
        return;
    }else{     
        await User.findOneAndUpdate({profileId : userId}, {photo: uploadResult.Location});
        res.status(200).json({
            message: "Success",
            data: uploadResult
        });
    }
}

exports.uploadRecipeImage = async (req, res) => {
    const userId = getProfileId(req);
    if (userId == null) return res.sendStatus(401);

    const recipeId = req.params.id;
    if (recipeId == null || !mongoose.isValidObjectId(recipeId)) return res.sendStatus(400);

    let recipe = await Recipe.findOne({profileId : userId, _id: recipeId});
    if (recipe == null){
        res.status(404).json({ error: 'Recipe not found' });
        return;
    }

    let fileName = recipeId+"-"+Date.now();

    let uploadResult = await parseFile.parsefile(req, fileName);
    if(uploadResult.error){
        res.status(400).json({
            message: "An error occurred.",
            error: uploadResult.error
        });
        console.log(uploadResult.error);
        return;
    }else{
        await Recipe.findOneAndUpdate({profileId : userId, _id: recipeId}, { $push: { images: {url:uploadResult.Location, imageId: uploadResult.Location.split('/').pop()} } });
        res.status(200).json({
            message: "Success",
            data: uploadResult
        });
    }
}
