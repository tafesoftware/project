const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Test the connection by listing collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name));
        
        return true;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.error('Please make sure MongoDB is running and the connection string is correct');
        return false;
    }
};

module.exports = connectDB; 