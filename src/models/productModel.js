const { application } = require('express');
const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  specifications: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
      unit: { 
        type: String, 
        required: false,  
        default: "-"      
      },
    },
  ],
  application:{
    type: String,
    required: false
  },
  productImage: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  productsYoutubeLink: {
    type: String,        
    required: false,     
  },

  features: {
    type: [String], 
    required: false, 
  }
});

// SubCategory Schema
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  
    required: true,    
  },
  subCategoriesYoutubeLink: {
    type: String,        
    required: false,     
  },
});

// Category Schema
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

// Export Category model
module.exports = mongoose.model('Category', categorySchema);
