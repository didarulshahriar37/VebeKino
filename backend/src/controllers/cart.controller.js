const {
  getCart,
  setCart,
} = require('../data/mockStore');

const getCartByEmail = (req, res) => {
  const { email } = req.params;
  return res.status(200).json(getCart(email));
};

const addToCart = (req, res) => {
  const { userEmail, product, quantity = 1 } = req.body;

  if (!userEmail || !product || !product._id) {
    return res.status(400).json({ message: 'userEmail and product are required' });
  }

  const existing = getCart(userEmail);
  const index = existing.findIndex((item) => item.productId === product._id);

  if (index >= 0) {
    existing[index].quantity += Number(quantity) || 1;
  } else {
    existing.push({
      _id: product._id,
      productId: product._id,
      name: product.name,
      image_url: product.image_url,
      category: product.category,
      price: Number(product.price) || 0,
      quantity: Number(quantity) || 1,
    });
  }

  setCart(userEmail, existing);
  return res.status(200).json(existing);
};

const updateCartQuantity = (req, res) => {
  const { userEmail, productId, quantity } = req.body;

  if (!userEmail || !productId || quantity == null) {
    return res.status(400).json({ message: 'userEmail, productId and quantity are required' });
  }

  let existing = getCart(userEmail);
  existing = existing
    .map((item) => (item.productId === productId ? { ...item, quantity: Number(quantity) } : item))
    .filter((item) => item.quantity > 0);

  setCart(userEmail, existing);
  return res.status(200).json(existing);
};

const removeFromCart = (req, res) => {
  const { email, productId } = req.params;
  const existing = getCart(email).filter((item) => item.productId !== productId);
  setCart(email, existing);
  return res.status(200).json(existing);
};

const clearCart = (req, res) => {
  const { email } = req.params;
  setCart(email, []);
  return res.status(200).json([]);
};

module.exports = {
  getCartByEmail,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
