const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

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

    if (email.trim() === ADMIN_EMAIL && password.trim() === ADMIN_PASSWORD) {
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

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Please provide username and password' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;

