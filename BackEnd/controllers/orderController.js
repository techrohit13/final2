// controllers/order.controller.js

const User = require('../models/userModel');

exports.addItemToOrder = async (req, res) => {
    const userId = req.params.userId;

    console.log(userId);
    console.log(req.body);
    
    const { items, totalPrice } = req.body;

    try {
        let user = await User.findById(userId);

        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user.orders doesn't exist or is undefined, initialize it
        if (!user.orders || typeof user.orders === 'undefined') {
            user.orders = [];
        }

        // Add each item to the user's orders array
        items.forEach(item => {
            user.orders.push({
                items: item,
                totalPrice: totalPrice
            });
        });

        await user.save();

        res.status(201).json({ message: 'Order added successfully', order: user.orders });
    } catch (error) {
        console.error('Error adding order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getOrderItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = user.orders.items;
        const totalPrice = user.orders.totalPrice;

        res.json({ items: cartItems, totalPrice: totalPrice });
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeItemFromOrder = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const itemIndex = user.orders.items.findIndex(item => item._id == itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        user.orders.items.splice(itemIndex, 1); // Remove item from items array
        await user.save();

        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
