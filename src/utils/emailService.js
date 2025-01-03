const nodemailer = require('nodemailer');
const transporter = require('./transporter');

const sendEmails = async (name, email, phone, city, address, message, stoneProcessing, woodProcessing, laserMachines, requestId) => {
  const mailOptionsToTeam = {
    from: process.env.SMTP_USER,
    to: process.env.YOUR_EMAIL,
    subject: `New Inquiry from ${name}`,
    text: `
      New Inquiry Received:
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      City: ${city}
      Address: ${address}
      Message: ${message}
      Stone Processing: ${stoneProcessing ? 'Yes' : 'No'}
      Wood Processing: ${woodProcessing ? 'Yes' : 'No'}
      Laser Machines: ${laserMachines ? 'Yes' : 'No'}
      Request ID: ${requestId}
    `,
  };

  const mailOptionsToUser = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `We have received your request`,
    text: `
      Dear ${name},

      We have received your inquiry. Your request ID is: ${requestId}. We will get back to you shortly.

      Best regards,
      Your Team
    `,
  };

  try {
    await Promise.all([
      transporter.sendMail(mailOptionsToTeam),
      transporter.sendMail(mailOptionsToUser),
    ]);
  } catch (err) {
    throw new Error('Failed to send emails');
  }
};

module.exports = { sendEmails };
