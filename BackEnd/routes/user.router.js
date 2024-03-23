const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

// Route to fetch user profile information along with orders
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
