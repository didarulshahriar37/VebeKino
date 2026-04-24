const express = require('express');
const router = express.Router();
const supabase = require('../db');

// Helper: generate a random 6-digit OTP
function generateOTP() {
  // Math.random() gives 0.0–0.999...
  // × 900000 + 100000 → always 6 digits
  return Math.floor(Math.random() * 900000 + 100000).toString();
}

// POST /signup
router.post('/', async (req, res) => {
  const { email } = req.body;

  // 1. Basic validation
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // 2. Generate OTP + expiry (5 minutes from now)
  const otp = generateOTP();
  const otp_expiry = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  //    ^ current time in ms + 5 min in ms, converted to ISO string

  // 3. Upsert into Supabase
  //    upsert = insert if new, update if email already exists
  const { error } = await supabase
    .from('users')
    .upsert({
      email,
      otp,
      otp_expiry,
      is_verified: false,
      is_locked: false,
      lock_until: null,
      share_count: 0
    }, { onConflict: 'email' });

  if (error) {
    console.error('Supabase error:', error.message);
    return res.status(500).json({ error: 'Database error' });
  }

  // 4. Return OTP in response (demo only — in production, send via SMS/email)
  res.json({
    message: 'OTP generated successfully',
    email,
    otp,           
    expires_in: '5 minutes'
  });
});

module.exports = router;