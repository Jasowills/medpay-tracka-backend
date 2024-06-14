const express = require('express');
const { createTransaction, getTransactions, updateTransaction, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.post('/', protect, async (req, res) => {
    try {
        const transaction = await createTransaction(req, res);
        if (transaction) {
            req.io.emit('transaction', { action: 'create', transaction });
            console.log('transaction emitted')
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/', protect, getTransactions);

router.put('/:id', protect, async (req, res) => {
    try {
        const transaction = await updateTransaction(req, res);
        if (transaction) {
            req.io.emit('transaction', { action: 'update', transaction });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const transaction = await deleteTransaction(req, res);
        if (transaction) {
            req.io.emit('transaction', { action: 'delete', transactionId: req.params.id });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
