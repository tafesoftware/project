const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get current user route
router.get('/me', protect, getMe);

// Test route to check if auth is working
router.get('/test', protect, (req, res) => {
    res.json({ 
        message: 'Auth is working', 
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

module.exports = router; 