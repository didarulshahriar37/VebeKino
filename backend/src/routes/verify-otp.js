const express    = require('express');
const router     = express.Router();
const supabase   = require('../db');
const checkLock  = require('../middleware/checkLock');

// Default lock duration if admin config is missing
const DEFAULT_LOCK_HOURS = 2;

// POST /verify-otp
// Middleware chain: checkLock runs first, then this handler
router.post('/', checkLock, async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP required' });
  }

  // 1. Fetch user + admin lock config in parallel
  const [userRes, configRes] = await Promise.all([
    supabase.from('users')
      .select('otp, otp_expiry, is_verified')
      .eq('email', email).single(),
    supabase.from('admin_config')
      .select('value')
      .eq('key', 'lock_hours').single()
  ]);

  const user = userRes.data;
  const lockHours = configRes.data
    ? parseInt(configRes.data.value)
    : DEFAULT_LOCK_HOURS;

  if (!user) return res.status(404).json({ error: 'User not found' });

  // 2. Check if OTP has expired (5-minute window)
  if (new Date() > new Date(user.otp_expiry)) {
    return res.status(400).json({ error: 'OTP expired. Please request a new one.' });
  }

  // 3. Compare the submitted OTP with the stored one
  if (otp !== user.otp) {
    // Wrong OTP → lock the account
    const lock_until = new Date(
      Date.now() + lockHours * 60 * 60 * 1000 // lockHours in ms
    ).toISOString();

    await supabase.from('users').update({
      is_locked: true,
      lock_until
    }).eq('email', email);

    return res.status(401).json({
      error: 'Wrong OTP',
      locked_until: lock_until,
      message: `Account locked for ${lockHours} hour(s)`
    });
  }

  // 4. Correct OTP → mark user as verified, clear the OTP
  await supabase.from('users').update({
    is_verified: true,
    is_locked: false,
    lock_until: null,
    otp: null,        // clear so it can't be reused
    otp_expiry: null
  }).eq('email', email);

  res.json({ message: 'Verified successfully! Proceed to next step.', email });
});

module.exports = router;