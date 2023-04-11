const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

const SECRET = process.env.USER_AUTH_SECRET;

module.exports = function (req, res, next) {
  // Get token from cookie
  const token = req.cookies.access_token;

  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, SECRET, {},async (error, user) => {
      if (error) {
        res.clearCookie("access_token");
        return res.status(401).json({ message: 'Token is not valid' });
      } else {
        req.user = await UserService.fetchUserById(user.user_id);
        next();
      }
    });
  } catch (err) {
    res.clearCookie("access_token");
    res.status(500).json({ msg: 'Server Error' });
  }
};