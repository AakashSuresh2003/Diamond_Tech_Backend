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
  productImages: [{
    type: String,
    required: true
  }],
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
    required: true
  },
  subCategoryImages: [{ 
    type: String,
    required: true
  }],
  subCategoriesYoutubeLink: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  products: [productSchema]
});

// Category Schema
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  // In your schema definition, update the categoryImage field to categoryImages array
  categoryImages: [{
    type: String,
    required: true
  }],
  subCategories: [subCategorySchema], 
});

// Export Category model
module.exports = mongoose.model('Category', categorySchema);


const imageValidator = {
  validator: function(v) {
    return v.every(url => /\.(jpg|jpeg|png)$/i.test(url));
  },
  message: 'Images must be in jpg, jpeg, or png format'
};

// Apply to all image arrays
categorySchema.path('categoryImages').validate(imageValidator);
subCategorySchema.path('subCategoryImages').validate(imageValidator);
productSchema.path('productImages').validate(imageValidator);
