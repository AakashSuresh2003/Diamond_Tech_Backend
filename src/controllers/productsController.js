const Category = require('../models/productModel');
const upload = require('../utils/multer');

exports.createCategory = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Category images are required' });
    }

    const { categoryName } = req.body;

    if (!categoryName) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const categoryImages = req.files.map(file => `/uploads/${file.filename}`);

    const categoryData = {
      categoryName,
      categoryImages
    };

    const category = new Category(categoryData);
    await category.save();

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (err) {
    console.error(err);
    if (err.message.includes('format allowed')) {
      return res.status(400).json({ message: 'Only .png, .jpg and .jpeg formats are allowed' });
    }
    res.status(400).json({ message: 'Error creating category', error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching categories', error: err.message });
  }
};

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

exports.addSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { subCategoryName, subCategoriesYoutubeLink } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Subcategory images are required' });
    }

    if (!subCategoryName) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }

    const subCategoryImages = req.files.map(file => `/uploads/${file.filename}`);

    const subCategoryData = {
      subCategoryName,
      subCategoryImages,  // Make sure this matches the schema field name
      subCategoriesYoutubeLink: subCategoriesYoutubeLink || "",
      category: categoryId
    };

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.subCategories.push(subCategoryData);
    await category.save();

    res.status(201).json({ message: 'Subcategory added successfully', category });
  } catch (err) {
    console.error(err);
    if (err.message.includes('format allowed')) {
      return res.status(400).json({ message: 'Only .png, .jpg and .jpeg formats are allowed' });
    }
    res.status(400).json({ message: 'Error adding subcategory', error: err.message });
  }
};

exports.addProductToSubCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const { productName, details, productsYoutubeLink, application, features } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Product images are required' });
    }

    const specifications = [];
    for (let i = 0; ; i++) {
      const key = req.body[`specifications[${i}].key`];
      const value = req.body[`specifications[${i}].value`];
      const unit = req.body[`specifications[${i}].unit`];

      if (!key || !value) break;

      specifications.push({ key, value, unit: unit || "-" });
    }

    const productImages = req.files.map(file => `/uploads/${file.filename}`);

    const productData = { 
      productName, 
      details, 
      productsYoutubeLink, 
      specifications, 
      application, 
      features: features || [],
      productImages
    };

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
    console.error('Error adding product:', err);
    if (err.message.includes('format allowed')) {
      return res.status(400).json({ message: 'Only .png, .jpg and .jpeg formats are allowed' });
    }
    res.status(400).json({ message: 'Error adding product', error: err.message });
  }
};

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

exports.getSubCategoriesInCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category.subCategories);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subcategories', error: err.message });
  }
};

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

exports.updateProduct = async (req, res) => {
  try {
    const { categoryId, subCategoryId, productId } = req.params;
    let { productName, details, specifications, productsYoutubeLink } = req.body;

    const productData = {};

    if (req.file) {
      productData.productImage = `/uploads/${req.file.filename}`;
    }

    if (productName) productData.productName = productName;
    if (details) productData.details = details;
    if (productsYoutubeLink) productData.productsYoutubeLink = productsYoutubeLink;

    if (specifications) {
      let parsedSpecifications = [];

      for (let key in req.body) {
        if (key.includes('specifications[')) {
          const match = key.match(/specifications\[(\d+)\]\.(key|value|unit)/);
          if (match) {
            const index = match[1];
            const field = match[2];

            if (!parsedSpecifications[index]) {
              parsedSpecifications[index] = {};
            }

            parsedSpecifications[index][field] = req.body[key];
          }
        }
      }

      if (parsedSpecifications.length > 0) {
        productData.specifications = parsedSpecifications;
      }
    }

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
    console.error(err);
    res.status(400).json({ message: 'Error updating product', error: err.message });
  }
};

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

    const productIndex = subCategory.products.findIndex(p => p._id.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    subCategory.products.splice(productIndex, 1);

    await category.save();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};