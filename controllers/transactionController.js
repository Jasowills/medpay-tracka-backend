const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    const { description, category, amount, type } = req.body;
    try {
        const transaction = await Transaction.create({ description, category, amount, type, user: req.user._id });
        res.status(201).json({ success: true, data: transaction });
        // Emit event for real-time updates
        req.io.emit('transaction', { action: 'create', transaction });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id });
        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.updateTransaction = async (req, res) => {
    const { description, category, amount, type } = req.body;
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { description, category, amount, type },
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }
        res.status(200).json({ success: true, data: transaction });
        // Emit event for real-time updates
        req.io.emit('transaction', { action: 'update', transaction });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!transaction) {
            return res.status(404).json({ success: false, error: 'Transaction not found' });
        }
        res.status(200).json({ success: true, data: {} });
        // Emit event for real-time updates
        req.io.emit('transaction', { action: 'delete', transactionId: req.params.id });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
