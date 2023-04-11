const express = require('express');
const router = express.Router();

const AdminAuthController = require('../controllers/admin/AuthenticationController');
const ProductController = require('../controllers/admin/ProductController');
const upload = require('../services/ImageService');
const isAdminAuthenticated = require('../middlewares/IsAdminAuthenticated');

// Authentication
router.post('/login', AdminAuthController.login);

router.use(isAdminAuthenticated);
// Logout
router.post('/logout', AdminAuthController.logout);
// Product
router.get('/product/', ProductController.index);
router.post('/product/create', upload('/uploads/tmp/').array('images'), ProductController.create);
router.get('/product/edit/:id', ProductController.show);
router.post('/product/edit/:id', upload('/uploads/tmp/').array('images'), ProductController.update);
router.delete('/product/delete/:id', ProductController.delete);


module.exports = router;