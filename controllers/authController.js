const jwt = require('jsonwebtoken');
const User = require('../models/User');
const transporter = require('../config/emailConfig'); // Import the nodemailer transporter

exports.register = async (req, res) => {
    const { username, password, email, firstName, lastName, role } = req.body;
    try {
        const user = await User.create({ username, password, email, firstName, lastName, role });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        const verificationUrl = `http://localhost:5000/api/auth/verify/${token}`;

        // Send verification email
        const mailOptions = {
            from: 'your_email@example.com', // Sender address
            to: email, // List of receivers
            subject: 'Account Verification', // Subject line
            html: `
            <div style="background-color: #f9f9f9; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #1a73e8;">Welcome to Medpay tracka</h2>
                    <p style="font-size: 16px;">Dear ${username},</p>
                    <p style="font-size: 16px;">Thank you for registering. Please click the following link to verify your account:</p>
                    <p style="font-size: 16px; text-align: center;">
                        <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 5px;">Verify Account</a>
                    </p>
                    <p style="font-size: 16px;">Regards,</p>
                    <p style="font-size: 16px;">Your Application Team</p>
                </div>
            </div>
        `,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
        if (user.isVerified = false) {
            return res.status(401).json({ success: false, error: 'Email not verified' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: 'Not authorized' });
    }
};

exports.admin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Not authorized as admin' });
    }
    next();
};
