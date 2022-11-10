const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
const AuthController = require('../controllers/AuthenticationController');
const { CustomerValidator } = require('../validators/customer');

router.get('/', CustomerController.index);
router.get('/edit/:id', CustomerController.show);
router.post('/edit/:id', CustomerController.update);
router.post('/create', CustomerValidator, CustomerController.create);
router.delete('/delete/:id', CustomerController.delete);
router.post('/login', AuthController.login);

module.exports = router;