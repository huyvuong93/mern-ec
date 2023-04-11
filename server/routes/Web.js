const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthenticationController');
const { UserValidator } = require('../validators/User');
const isAuthenticated = require('../middlewares/IsAuthenticated');

// Login
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.get('/me', isAuthenticated, AuthController.fetchCurrentUser);
// Profile
router.get('/user/detail/:id', isAuthenticated, UserValidator, UserController.show);
router.post('/user/edit/:id', isAuthenticated, UserController.update);

module.exports = router;