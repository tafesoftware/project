const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    priceRange: {
        type: String,
        required: true
    },
    totalRooms: {
        type: Number,
        required: true
    },
    activeBookings: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    description: {
        type: String
    },
    amenities: [String],
    images: [String]
});

module.exports = mongoose.model('Hotel', hotelSchema); 