
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define cart routes
router.post('/:userId', cartController.addItemToCart);
router.get('/:userId', cartController.getCartItems);
router.delete('/:userId/remove/:itemId', cartController.removeItemFromCart);

module.exports = router;
