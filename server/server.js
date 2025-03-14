require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors({
    origin: '*',  // In production, specify your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
(async () => {
    try {
        const isConnected = await connectDB();
        
        if (!isConnected) {
            console.error('Failed to connect to MongoDB. Server will start but database operations will fail.');
        } else {
            console.log('MongoDB connection successful');
        }
        
        // Routes
        app.use('/api/auth', require('./routes/authRoutes'));
        app.use('/api/bookings', require('./routes/bookingRoutes'));
        app.use('/api/hotels', require('./routes/hotelRoutes'));
        app.use('/api/restaurants', require('./routes/restaurantRoutes'));
        app.use('/api/destinations', require('./routes/destinationRoutes'));
        
        // Health check endpoint
        app.get('/api/health-check', (req, res) => {
            res.json({ 
                status: 'ok', 
                timestamp: new Date().toISOString(),
                mongodb: isConnected ? 'connected' : 'disconnected'
            });
        });
        
        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error('Server error:', err.stack);
            res.status(500).json({ 
                message: 'Something went wrong on the server',
                error: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        });
        
        const PORT = process.env.PORT || 5000;
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API available at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('Fatal error during server startup:', error);
    }
})(); 