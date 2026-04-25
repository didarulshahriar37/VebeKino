const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    // For admin@vebe-kino.com, ensure it exists
    if (email === 'admin@vebe-kino.com' && password === 'admin@VebeKino') {
      let admin = await User.findOne({ email });
      if (!admin) {
        admin = new User({
          email: 'admin@vebe-kino.com',
          password: 'admin@VebeKino',
          role: 'admin',
          name: 'Admin',
          is_verified: true
        });
        await admin.save();
      }
    }

    // For other users, check DB
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Check if locked
    if (user.is_locked && new Date() < user.lock_until) {
      return res.status(403).json({ 
        error: 'Account locked due to too many failed OTP attempts', 
        locked_until: user.lock_until 
      });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a simple 6-digit OTP for login
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otp_expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.otp = otp;
    user.otp_expiry = otp_expiry;
    await user.save();

    console.log(`Login OTP for ${email}: ${otp}`); // For testing
    res.json({ 
      message: 'Credentials valid, OTP sent', 
      otp, 
      requires_otp: true 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
