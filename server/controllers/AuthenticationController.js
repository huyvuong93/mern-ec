const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserService = require('../services/UserService');
const { expressLogger } = require('../services/LogService');

const SECRET = process.env.USER_AUTH_SECRET;

module.exports = class AuthenticateController {
  static async signup(req, res) {
    try {
      const user = await UserService.createNewUser(req.body);
      if (user) {
        res.status(200).json({ message: 'Created user successfully!!' })
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(400).json({ message: err.message });
    }
  }
  
  static async login(req, res) {
    try {
      // check if the user exists
      const user = await UserService.fetchUserByEmail(req.body.email);
      if (user) {
        //check if password matches
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          const payload = {
            user_id: user._id,
          }
          const accessToken = await jwt.sign(payload, SECRET,{ expiresIn: '30 days' });

          if (accessToken) {
            res.cookie("access_token", accessToken, {
              maxAge: 60 * 60 * 1000,
              httpOnly: true,
              secure: true,
            });
            res.status(200).json({ message: 'Logged in!' });
          } else {
            req.user = null;
            res.clearCookie("access_token");
            res.status(400).json({ message: 'Logged out!' });
          }
        } else {
          res.status(400).json({ message: 'Password does not match' });
        }
      } else {
        res.status(400).json({ message: 'User does not exist' });
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async fetchCurrentUser(req, res) {
    try {
      const user = req.user;
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(400).json({ message: 'Unauthenticated.' });
      }
    } catch (err) {
      expressLogger.error(err.message);
      res.status(400).json({ message: err.message });
    }
  }

  static async refresh(req, res) {

  }

  static logout(req, res) {
    req.user = null;
    res.clearCookie("access_token");
    res.status(200).json({ message: 'Logged out!' });
  }
}
