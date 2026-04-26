const express = require('express');
const {
  createOrder,
  getOrdersByEmail,
} = require('../controllers/orders.controller');

const router = express.Router();

router.post('/create', createOrder);
router.get('/user/:email', getOrdersByEmail);

module.exports = router;
