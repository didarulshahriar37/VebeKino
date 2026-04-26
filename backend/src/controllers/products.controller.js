const { SAMPLE_PRODUCTS } = require('../data/mockStore');

const getAllProducts = (req, res) => {
  res.status(200).json(SAMPLE_PRODUCTS);
};

const getPopularProducts = (req, res) => {
  const popular = [...SAMPLE_PRODUCTS]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 12);

  res.status(200).json(popular);
};

const getProductById = (req, res) => {
  const { id } = req.params;
  const product = SAMPLE_PRODUCTS.find((p) => p._id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getPopularProducts,
  getProductById,
};
