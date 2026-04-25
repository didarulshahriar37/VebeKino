const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// GET /cart/:email — get cart for a user
router.get('/:email', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.email });
    res.json(cart ? cart.items : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /cart — add item to cart
router.post('/', async (req, res) => {
  try {
    const { userEmail, product, quantity } = req.body;
    let cart = await Cart.findOne({ userEmail });

    if (!cart) {
      cart = new Cart({ userEmail, items: [] });
    }

    const existingIndex = cart.items.findIndex(
      (item) => item.productId.toString() === product._id
    );

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category: product.category,
        quantity,
      });
    }

    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /cart — update quantity of an item
router.put('/', async (req, res) => {
  try {
    const { userEmail, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userEmail });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
    }
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /cart/:email/:productId — remove item from cart
router.delete('/:email/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userEmail: req.params.email });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart.items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /cart/:email — clear entire cart
router.delete('/:email', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userEmail: req.params.email });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
