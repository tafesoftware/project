const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    
    console.log('Headers:', req.headers);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('Token received:', token);

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token decoded:', decoded);

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                console.log('User not found for token');
                return res.status(401).json({ message: 'User not found' });
            }
            
            console.log('User authenticated:', req.user._id);
            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        console.log('No authorization header or not Bearer token');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect }; 