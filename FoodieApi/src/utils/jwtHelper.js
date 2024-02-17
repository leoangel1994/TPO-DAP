const jwt = require('jsonwebtoken');
const envfile = require('dotenv').config();

exports.getProfileId = function(req){
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return null;
  try {
    let decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return decoded.profileId;
  } catch (error) {
    console.log(error);
  }
  return null;
}