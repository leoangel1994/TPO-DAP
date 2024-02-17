const parseFile = require('../services/fileService');
const User = require('../models/User');
const getProfileId = require('../utils/jwtHelper').getProfileId;

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
