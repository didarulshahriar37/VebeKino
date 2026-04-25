const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order after successful payment
router.post('/create', async (req, res) => {
  try {
    const { email, items, totalAmount, paymentIntentId } = req.body;
    const newOrder = new Order({
      email,
      items,
      totalAmount,
      paymentIntentId
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order history for a specific user
router.get('/user/:email', async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
