const jwt = require('jsonwebtoken');
const envfile = require('dotenv').config();

//TODO: move this to a database or redis
let refreshTokens = []

exports.login = async (req, res) => {
//TODO: Authenticate User with google

const username = req.body.username;
const user = { name: username };

const accessToken = generateAccessToken(user);
const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '60d' });
refreshTokens.push(refreshToken);
res.json({ accessToken: accessToken, refreshToken: refreshToken });
}
  
exports.logout = async (req, res) => {
refreshTokens = refreshTokens.filter(token => token !== req.body.token);
}

exports.refreshToken = async (token) => {
  if (!refreshTokens.includes(token)) return null;
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err){
        console.log(err);
        return null;
      }
      return generateAccessToken({ name: user.name });
    });
  } catch (error) { 
    console.log(error);
    return null;
  }
}

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
  })
}

function generateAccessToken (user) {
  try {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
  } catch (error) {
      console.log(error);
      return null;
  }
}