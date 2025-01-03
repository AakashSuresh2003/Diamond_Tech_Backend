const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
  address: String,
  message: String,
  stoneProcessing: Boolean,
  woodProcessing: Boolean,
  laserMachines: Boolean,
  requestId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Inquiry', inquirySchema);
