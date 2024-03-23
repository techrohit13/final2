
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Define cart routes
router.post('/:userId', orderController.addItemToOrder);
router.get('/:userId', orderController.getOrderItems);
router.delete('/:userId/remove/:itemId', orderController.removeItemFromOrder);

module.exports = router;