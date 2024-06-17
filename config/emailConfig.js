// Load environment variables from .env file
require('dotenv').config();

const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variable
        pass: process.env.EMAIL_PASS, // Your email password or API key from environment variable
    },
});

module.exports = transporter;
