const {
  getOrders,
  setOrders,
  createId,
} = require('../data/mockStore');

const createOrder = (req, res) => {
  const { email, items = [], totalAmount = 0, paymentIntentId } = req.body;

  if (!email || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'email and items are required' });
  }

  const existing = getOrders(email);

  const order = {
    _id: createId('order'),
    createdAt: new Date().toISOString(),
    status: 'Processing',
    items,
    totalAmount: Number(totalAmount) || 0,
    paymentIntentId: paymentIntentId || null,
  };

  setOrders(email, [order, ...existing]);
  return res.status(201).json(order);
};

const getOrdersByEmail = (req, res) => {
  const { email } = req.params;
  return res.status(200).json(getOrders(email));
};

module.exports = {
  createOrder,
  getOrdersByEmail,
};
