const Booking = require('../models/Booking');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create({
            user: req.user._id,
            ...req.body
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Make sure user owns booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res) => {
    try {
        let booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Make sure user owns booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        booking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Make sure user owns booking
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await booking.remove();

        res.json({ message: 'Booking removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 