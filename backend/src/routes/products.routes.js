const express = require('express');
const {
  getAllProducts,
  getPopularProducts,
  getProductById,
} = require('../controllers/products.controller');

const router = express.Router();

router.get('/all', getAllProducts);
router.get('/popular', getPopularProducts);
router.get('/:id', getProductById);

module.exports = router;
