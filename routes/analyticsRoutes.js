// routes/analyticsRoutes.js
const express = require('express');
const { getIncomeExpense, getTopCategories, getWeeklyIncomeExpense, getAccountBalance } = require('../controllers/analyticsController');
const { protect } = require('../controllers/authController');
const router = express.Router();

router.get('/income-expense', protect, getIncomeExpense);
router.get('/top-categories', protect, getTopCategories);
router.get('/week-expense', protect, getWeeklyIncomeExpense);
router.get('/account-balance', protect, getAccountBalance);



module.exports = router;
