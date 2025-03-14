const Hotel = require('../models/Hotel');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
exports.getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get hotel by ID
// @route   GET /api/hotels/:id
// @access  Public
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new hotel
// @route   POST /api/hotels
// @access  Private
exports.createHotel = async (req, res) => {
    try {
        console.log('Creating hotel with data:', req.body);
        console.log('User:', req.user);
        
        // Validate required fields
        const { name, location, rating, priceRange, totalRooms } = req.body;
        if (!name || !location || !rating || !priceRange || !totalRooms) {
            return res.status(400).json({ 
                message: 'Please provide all required fields: name, location, rating, priceRange, totalRooms' 
            });
        }
        
        const hotel = new Hotel(req.body);
        const savedHotel = await hotel.save();
        console.log('Hotel created successfully:', savedHotel);
        res.status(201).json(savedHotel);
    } catch (error) {
        console.error('Error creating hotel:', error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update hotel
// @route   PUT /api/hotels/:id
// @access  Private
exports.updateHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete hotel
// @route   DELETE /api/hotels/:id
// @access  Private
exports.deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json({ message: 'Hotel removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 