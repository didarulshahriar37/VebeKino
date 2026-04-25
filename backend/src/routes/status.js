const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ is_locked: false, is_verified: false });
    }

    const is_locked = user.is_locked && user.lock_until && new Date() < user.lock_until;
    
    res.json({
      email: user.email,
      is_locked,
      lock_until: user.lock_until,
      is_verified: user.is_verified
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;