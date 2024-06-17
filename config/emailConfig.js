const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'medpaytrackateam@gmail.com', // Your email address
        pass: 'lrzpqfnrweezfkjx', // Your email password or API key
    },
});

module.exports = transporter;
