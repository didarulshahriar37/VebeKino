const express = require('express');
const router = express.Router();
const User = require('../models/User');

const REQUIRED_CLICKS = 5;

router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.is_verified) {
      return res.status(403).json({ error: 'Must verify OTP first' });
    }

    if (user.share_count >= REQUIRED_CLICKS) {
      return res.json({ message: 'Already unlocked', share_count: user.share_count, can_proceed: true });
    }

    user.share_count += 1;
    if (user.share_count >= REQUIRED_CLICKS) {
      user.access_granted = true;
      user.access_granted_at = new Date();
    }
    await user.save();

    res.json({
      message: user.access_granted ? 'Unlocked!' : `${REQUIRED_CLICKS - user.share_count} more clicks needed`,
      share_count: user.share_count,
      can_proceed: user.access_granted
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;