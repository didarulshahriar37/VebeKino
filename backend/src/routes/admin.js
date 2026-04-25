const express = require('express');
const router = express.Router();
const User = require('../models/User');
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

module.exports = router;
