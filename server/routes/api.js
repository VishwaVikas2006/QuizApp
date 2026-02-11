const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Hardcoded Admin Credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin';

// @route   GET /api/health
// @desc    Check server health
// @access  Public
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// @route   POST /api/admin/login
// @desc    Admin Login
// @access  Public
router.post('/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.json({ success: true, message: 'Login successful' });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// @route   POST /api/submit-result
// @desc    Submit Quiz Result
// @access  Public
router.post('/submit-result', async (req, res) => {
    const { username, topic, score, totalQuestions } = req.body;

    if (!username || !topic || score === undefined || !totalQuestions) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }

    try {
        const newResult = new Result({
            username,
            topic,
            score,
            totalQuestions,
        });

        const savedResult = await newResult.save();
        return res.status(201).json({ success: true, data: savedResult });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   GET /api/results
// @desc    Get All Results
// @access  Public (for Admin Dashboard)
router.get('/results', async (req, res) => {
    try {
        const results = await Result.find().sort({ date: -1 });
        return res.json({ success: true, data: results });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   POST /api/check-user
// @desc    Check if user has already taken the quiz
// @access  Public
router.post('/check-user', async (req, res) => {
    const { username } = req.body;
    try {
        const existingResult = await Result.findOne({ username });
        if (existingResult) {
            return res.json({ taken: true, message: 'User has already taken the quiz.' });
        }
        return res.json({ taken: false });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;

