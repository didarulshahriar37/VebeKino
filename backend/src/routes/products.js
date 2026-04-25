const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /products/popular
// Returns top 10 products sorted by rating descending
router.get('/popular', async (req, res) => {
  try {
    const popularProducts = await Product.find()
      .sort({ rating: -1 }) // Sort by rating high to low
      .limit(12);           // Limit to 12 items
    res.json(popularProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /products/all
router.get('/all', async (req, res) => {
  try {
    const allProducts = await Product.find().sort({ createdAt: -1 });
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching product with ID: ${req.params.id}`);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('Product not found in DB');
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
