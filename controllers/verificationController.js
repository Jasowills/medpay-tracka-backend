const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyAccount = async (req, res) => {
    const token = req.params.token;

    if (!token) {
        return res.status(400).json({ success: false, error: 'Verification token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ success: false, error: 'Account already verified' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ success: true, message: 'Account verified successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
