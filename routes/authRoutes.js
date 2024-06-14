// routes/authRoutes.js

const express = require('express');
const { register, login } = require('../controllers/authController');
const { verifyAccount } = require('../controllers/verificationController'); // Import verification controller
const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// Verification route
router.get('/verify/:token', verifyAccount);

module.exports = router;
