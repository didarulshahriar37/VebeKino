const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const QueueItem = require('../models/QueueItem');

// Move entire cart to the anti-impulse Queue
router.post('/move-from-cart', async (req, res) => {
  try {
    const { userEmail } = req.body;
    
    // Find the user's cart
    const cart = await Cart.findOne({ userEmail });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Set lockedUntil to 2 minutes from now (for testing)
    const lockedUntil = new Date(Date.now() + 2 * 60 * 1000); 

    // Create QueueItems for each product in the cart
    const queueItemsToInsert = cart.items.map(item => ({
      userEmail,
      productId: item.productId,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
      category: item.category,
      quantity: item.quantity,
      lockedUntil,
      gate: 1
    }));

    await QueueItem.insertMany(queueItemsToInsert);

    // Empty the cart
    cart.items = [];
    await cart.save();

    res.json({ message: 'Successfully moved to Queue', count: queueItemsToInsert.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's queue items
router.get('/:email', async (req, res) => {
  try {
    const queueItems = await QueueItem.find({ userEmail: req.params.email }).sort({ createdAt: -1 });
    res.json(queueItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete queue item (for testing purposes)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await QueueItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Queue item not found' });
    }
    res.json({ message: 'Queue item removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
