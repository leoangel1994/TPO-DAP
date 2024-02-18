const jwt = require('jsonwebtoken');
const envfile = require('dotenv').config();
const User = require('../models/User');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

let refreshTokens = []

exports.login = async (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  try {
  async function verify() {
    const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.CLIENT_ID,
      });
      return ticket.getPayload();
    }
    let profile = await verify();
    if(profile == null) return res.sendStatus(401);
    let user = await findOrCreateUser(profile.sub, {
      profileId: profile.sub,
      userName: profile.name.replace(/\s/g, ''),  
      name: profile.given_name,
      familyName: profile.family_name,
      email: profile.email,
      photo: profile.picture,
      createdAt: new Date()
    });

    const profileId = {profileId: profile.sub};
    const accessToken = generateAccessToken(profileId);
    const refreshToken = jwt.sign(profileId, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60d' });
    refreshTokens.push(refreshToken);
    await User.updateOne(user, {accessToken: accessToken, refreshToken: refreshToken});

    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
}
  
exports.logout = async (req, res) => {
try {
  let user = req.user;
  let dbuser = await User.findOneAndUpdate({profileId : user.profileId}, {accessToken: '', refreshToken: ''});
  refreshTokens = refreshTokens.filter(token => token !== dbuser.refreshToken);
} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

exports.refreshToken = async (token) => {
  if (!refreshTokens.includes(token)) return null;
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err){
        console.log(err);
        return null;
      }
      let accessToken = generateAccessToken({ profileId: user.profileId });
      await User.updateOne({profileId : user.profileId}, {accessToken: accessToken});
      return accessToken;
    });
  } catch (error) { 
    console.log(error);
    return null;
  }
}

exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    try {
      let dbuser = await User.findOne({profileId: user.profileId});
      if (dbuser.accessToken !== token) {
        User.updateOne({profileId: user.profileId}, {accessToken: '', refreshToken: ''});
        return res.sendStatus(403);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(403);
    } 
    next();
  })
}

function generateAccessToken (user) {
  try {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  } catch (error) {
      console.log(error);
      return null;
  }
}

async function findOrCreateUser(userId, newUser) {
  let user = await User.findOne({ profileId: userId });

  if (!user) {
      user = await User.create(newUser);
  }

  return user;
}