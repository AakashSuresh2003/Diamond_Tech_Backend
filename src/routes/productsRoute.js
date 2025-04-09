
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/productsController');
const upload = require('../utils/multer');

// Routes
router.post('/categories', upload.array('categoryImage', 5), categoryController.createCategory);

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:categoryId', categoryController.getCategoryById);

// Routes for SubCategory operations
router.post('/categories/:categoryId/subcategories', upload.array('subCategoryImage', 5), categoryController.addSubCategory);

router.post('/categories/:categoryId/subcategories/:subCategoryId/products', 
  upload.array('productImage', 5), 
  categoryController.addProductToSubCategory);
router.get('/categories/:categoryId/subcategories/:subCategoryId/products', categoryController.getProductsInSubCategory);
router.get('/categories/:categoryId/subcategories/', categoryController.getSubCategoriesInCategory);
router.get('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', categoryController.getProductById);
// Update product route with multiple image upload support
router.put('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', 
  upload.array('productImage', 5),  // Changed from single to array upload
  categoryController.updateProduct
);
router.delete('/categories/:categoryId/subcategories/:subCategoryId/products/:productId', categoryController.deleteProduct);

module.exports = router;
