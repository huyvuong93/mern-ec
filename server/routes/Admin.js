const express = require('express');
const router = express.Router();

const AdminAuthController = require('../controllers/admin/AuthenticationController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const TagController = require('../controllers/TagController');
const BrandController = require('../controllers/BrandController');
const upload = require('../services/ImageService');
const isAdminAuthenticated = require('../middlewares/IsAdminAuthenticated');

// Authentication
router.post('/login', AdminAuthController.login);

router.use(isAdminAuthenticated);
// Logout
router.post('/logout', AdminAuthController.logout);
// Product
router.get('/products/:categoryId?/:brandId?', ProductController.index);
router.post('/products/create', upload('/uploads/tmp/').array('images'), ProductController.create);
router.get('/products/edit/:id', ProductController.show);
router.post('/products/edit/:id', upload('/uploads/tmp/').array('images'), ProductController.update);
router.delete('/products/delete/:id', ProductController.delete);
// Category
router.get('/categories/', CategoryController.index);
router.post('/categories/create', CategoryController.create);
// Brands
router.get('/brands/', BrandController.index);
router.post('/brands/create', BrandController.create);
// Tags
router.get('/tags/', TagController.index);
router.post('/tags/create', TagController.create);

module.exports = router;