const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  specifications: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  productImage: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const subCategorySchema = new mongoose.Schema({
  subCategoryName: {
    type: String,
    required: true,
  },
  subCategoryImage: {
    type: String,
    required: true,
  },
  products: [productSchema], 
});

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
    required: true,
  },
  subCategories: [subCategorySchema], 
});

module.exports = mongoose.model('Category', categorySchema);
