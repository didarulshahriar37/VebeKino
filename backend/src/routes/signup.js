const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  console.log('Signup request body:', req.body);
  const { email, password, name } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  if (!password) return res.status(400).json({ error: 'Password required' });

  try {
    // Generate a simple 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Upsert user
    let user = await User.findOne({ email });
    if (user) {
      // Check if already verified
      if (user.is_verified) {
        return res.status(409).json({ error: 'User already exists. Please login instead.' });
      }

      // Check if locked
      if (user.is_locked && new Date() < user.lock_until) {
        return res.status(403).json({ 
          error: 'Account locked due to previous failed attempts', 
          locked_until: user.lock_until 
        });
      }
      user.otp = otp;
      user.otp_expiry = otp_expiry;
      user.password = password; 
      user.name = name || user.name; // Update name
      console.log(`UPSERTing user ${email} with password length: ${user.password ? user.password.length : 'MISSING'}`);
      await user.save();
    } else {
      user = new User({ email, password, name, otp, otp_expiry });
      console.log(`CREATING user ${email} with password length: ${user.password ? user.password.length : 'MISSING'}`);
      await user.save();
    }

    console.log(`OTP for ${email}: ${otp}`); // For testing
    res.json({ message: 'OTP sent successfully', otp }); // Sending OTP in response for demo purposes
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;