const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Placeholder routes until we implement the full controller
router.get('/', (req, res) => {
    res.json({ message: 'Get all destinations' });
});

router.get('/:id', (req, res) => {
    res.json({ message: `Get destination with id ${req.params.id}` });
});

router.post('/', protect, (req, res) => {
    res.json({ message: 'Create new destination', data: req.body });
});

module.exports = router; 