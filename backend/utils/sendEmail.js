const nodemailer = require('nodemailer');
require("dotenv").config();
// Create a Nodemailer transporter using Outlook SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.OUTLOOK_EMAIL, // Your Outlook email address
    pass: process.env.OUTLOOK_PW // Your Outlook email password
  }
});

// Function to send email
async function sendEmail(to, subject, content) {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL, // Your Outlook email address
      to: to, // Recipient's email address
      subject: subject, // Subject line
      html: content // HTML content of the email
    });
    console.log('Message sent: %s', info.messageId);
    return true; // Return true if email is sent successfully
  } catch (error) {
    console.error('Error occurred while sending email:', error);
    return false; // Return false if email sending fails
  }
}

module.exports = sendEmail;
