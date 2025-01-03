// controllers/categoryController.js

const Category = require('../models/productModel');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating category', error: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

// Get a specific category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};

// Add a subcategory to a category
exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategoryData = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.subCategories.push(subCategoryData);
    await category.save();

    res.status(201).json({ message: 'Subcategory added successfully', category });
  } catch (err) {
    res.status(400).json({ message: 'Error adding subcategory', error: err.message });
  }
};

// Add a product to a subcategory
exports.addProductToSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const productData = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    subCategory.products.push(productData);
    await category.save();

    res.status(201).json({ message: 'Product added successfully', category });
  } catch (err) {
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

// Get all products in a subcategory
exports.getProductsInSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    res.status(200).json(subCategory.products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const product = subCategory.products.id(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// Update a specific product
exports.updateProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;
    const productData = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const product = subCategory.products.id(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.set(productData);
    await category.save();

    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err.message });
  }
};

// Delete a specific product
exports.deleteProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = category.subCategories.id(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const product = subCategory.products.id(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.remove();
    await category.save();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
