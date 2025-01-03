const Inquiry = require('../models/inQueryFormModel');
const { sendEmails } = require('../utils/emailService');

exports.submitInquiry = async (req, res) => {
  const { name, email, phone, city, message, address, stoneProcessing, woodProcessing, laserMachines } = req.body;
  const requestId = `REQ-${Math.floor(Math.random() * 1000000)}`;

  // Optionally save the inquiry to the database
  const inquiry = new Inquiry({
    name,
    email,
    phone,
    city,
    address,
    message,
    stoneProcessing,
    woodProcessing,
    laserMachines,
    requestId,
  });

  try {
    await inquiry.save(); // Save to database if required
    await sendEmails(name, email, phone, city, address, message, stoneProcessing, woodProcessing, laserMachines, requestId);

    res.status(200).send({ success: true, message: 'Inquiry submitted successfully', requestId });
  } catch (err) {
    console.log('Error:', err);
    res.status(500).send({ success: false, message: 'Failed to submit inquiry', error: err.message });
  }
};
