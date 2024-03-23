// controllers/cart.controller.js

const User = require('../models/userModel');

exports.addItemToCart = async (req, res) => {
    const userId = req.params.userId;

    console.log(userId);
    console.log(req.body);
    
    const { name, image, price, quantity } = req.body;

    try {
        const user = await User.findById(userId);

        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newItem = { name, image, price, quantity };

        user.cart.push(newItem);
        
        await user.save();

        res.status(201).json({ message: 'Item added to cart successfully', item: newItem });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getCartItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const cartItems = user.cart;
        res.json(cartItems);
    } catch (error) {
        console.error('Error retrieving cart items:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const userId = req.params.userId;
    const itemId = req.params.itemId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item._id == itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        user.cart.splice(itemIndex, 1);
        await user.save();

        res.json({ message: 'Item removed from cart successfully' });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
