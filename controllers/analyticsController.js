// controllers/analyticsController.js
const Transaction = require('../models/Transaction');

exports.getIncomeExpense = async (req, res) => {
    try {
        const transactions = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                    }
                }
            }
        ]);

        const { totalIncome, totalExpense } = transactions[0] || { totalIncome: 0, totalExpense: 0 };

        res.status(200).json({ success: true, data: { income: totalIncome, expense: totalExpense } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getTopCategories = async (req, res) => {
    try {
        const categories = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: "$category",
                    totalAmount: { $sum: "$amount" }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);

        // Find the category with the highest total income
        const highestIncomeCategory = categories.length > 0 ? categories[0] : null;

        res.status(200).json({ success: true, data: { categories, highestIncomeCategory } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.getWeeklyIncomeExpense = async (req, res) => {
    try {
        const transactions = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        week: { $week: "$date" }
                    },
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } }
        ]);

        res.status(200).json({ success: true, data: transactions });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

exports.getAccountBalance = async (req, res) => {
    try {
        const transactions = await Transaction.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
                    },
                    totalExpense: {
                        $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
                    }
                }
            }
        ]);

        const { totalIncome, totalExpense } = transactions[0] || { totalIncome: 0, totalExpense: 0 };
        const accountBalance = totalIncome - totalExpense;

        res.status(200).json({ success: true, data: { balance: accountBalance } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};