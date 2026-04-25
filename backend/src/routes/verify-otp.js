const express = require('express');
const router = express.Router();
const User = require('../models/User');
const AdminConfig = require('../models/AdminConfig');

router.post('/', async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: 'Email and OTP required' });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check lock
    if (user.is_locked && new Date() < user.lock_until) {
      return res.status(403).json({ error: 'Account locked', locked_until: user.lock_until });
    }

    // Check expiry
    if (new Date() > user.otp_expiry) {
      return res.status(400).json({ error: 'OTP expired' });
    }

    if (otp !== user.otp) {
      // Handle wrong OTP (locking logic)
      const config = await AdminConfig.findOne({ key: 'lock_hours' });
      const lockHours = config ? parseInt(config.value) : 2;
      user.is_locked = true;
      user.lock_until = new Date(Date.now() + lockHours * 60 * 60 * 1000);
      await user.save();
      return res.status(401).json({ error: 'Invalid OTP', locked_until: user.lock_until });
    }

    // Success
    user.is_verified = true;
    user.is_locked = false;
    user.lock_until = null;
    user.otp = null;
    user.otp_expiry = null;
    console.log(`VERIFYING user ${email}. Current password length: ${user.password ? user.password.length : 'MISSING'}`);
    await user.save();

    res.json({
      message: 'Verified successfully',
      email: user.email,
      role: user.role,
      name: user.name || user.email.split('@')[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;