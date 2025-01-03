
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productsController');

// Routes for Category operations
router.post('/categories', categoryController.createCategory);
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);

// Routes for SubCategory operations
router.post('/categories/:categoryId/subcategories', categoryController.addSubCategory);

// Routes for Product operations
router.post('/categories/:categoryId/subcategories/:subCategoryId/products', categoryController.addProductToSubCategory);
router.get('/categories/:categoryId/subcategories/:subCategoryId/products', categoryController.getProductsInSubCategory);
router.get('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', categoryController.getProductById);
router.put('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', categoryController.updateProduct);
router.delete('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', categoryController.deleteProduct);

module.exports = router;
