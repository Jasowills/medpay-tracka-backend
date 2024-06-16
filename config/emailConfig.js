const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use your email service provider
    auth: {
        user: 'youremail@gmail.com', // Your email address
        pass: 'gkffzhpfeoqgjewk', // Your email password or API key
    },
});

module.exports = transporter;
