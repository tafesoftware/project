require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

async function testAuth() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected');
        
        // Find a user
        const user = await User.findOne();
        
        if (!user) {
            console.log('No users found in the database');
            return;
        }
        
        console.log('Found user:', user.name, user.email);
        
        // Generate a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
        
        console.log('Generated token:', token);
        
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        
        // Close connection
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error:', error);
    }
}

testAuth(); 