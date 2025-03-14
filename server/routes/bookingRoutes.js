const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
    createBooking,
    getBookings,
    getBookingById,
    updateBooking,
    deleteBooking 
} = require('../controllers/bookingController');

router.route('/')
    .post(protect, createBooking)
    .get(protect, getBookings);

router.route('/:id')
    .get(protect, getBookingById)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

module.exports = router; 