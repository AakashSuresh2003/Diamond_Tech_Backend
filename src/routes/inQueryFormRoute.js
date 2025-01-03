
const express = require('express');
const router = express.Router();
const inqueryController = require('../controllers/inQueryFormController');

// Routes for Category operations
router.post('/submit-form', inqueryController.submitInquiry);

module.exports = router;
