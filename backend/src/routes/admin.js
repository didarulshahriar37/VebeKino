const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const AdminConfig = require('../models/AdminConfig');

// POST /admin/set-lock-hours
router.post('/set-lock-hours', async (req, res) => {
  const { hours } = req.body;
  if (!hours || isNaN(hours)) return res.status(400).json({ error: 'Valid hours required' });

  try {
    await AdminConfig.findOneAndUpdate(
      { key: 'lock_hours' },
      { value: hours.toString() },
      { upsert: true }
    );
    res.json({ message: `Lock duration set to ${hours} hours` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /admin/reset-lock
router.post('/reset-lock', async (req, res) => {
  const { email } = req.body;
  try {
    await User.findOneAndUpdate({ email }, { is_locked: false, lock_until: null });
    res.json({ message: 'User lock reset' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /admin/stats - Global Dashboard Stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const orders = await Order.find().sort({ createdAt: -1 });
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    const recentOrders = orders.slice(0, 5).map(o => ({
      id: o._id,
      email: o.email,
      amount: o.totalAmount,
      status: o.status,
      date: o.createdAt
    }));

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /admin/users - List all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /admin/toggle-role/:email
router.post('/toggle-role/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /admin/delete-user/:email
router.delete('/delete-user/:email', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
