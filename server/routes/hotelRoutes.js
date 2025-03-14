const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
    getHotels,
    getHotelById,
    createHotel,
    updateHotel,
    deleteHotel
} = require('../controllers/hotelController');

router.route('/')
    .get(getHotels)
    .post(protect, createHotel);

router.route('/:id')
    .get(getHotelById)
    .put(protect, updateHotel)
    .delete(protect, deleteHotel);

router.get('/test-auth', protect, (req, res) => {
    res.json({ 
        message: 'Authentication successful', 
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

module.exports = router; 