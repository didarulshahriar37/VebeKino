const express = require('express');
const {
  getCartByEmail,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cart.controller');

const router = express.Router();

router.get('/:email', getCartByEmail);
router.post('/', addToCart);
router.put('/', updateCartQuantity);
router.delete('/:email/:productId', removeFromCart);
router.delete('/:email', clearCart);

module.exports = router;
