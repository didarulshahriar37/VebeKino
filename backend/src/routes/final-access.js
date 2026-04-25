const express   = require('express');
const router    = express.Router();
const supabase  = require('../db');
const checkLock = require('../middleware/checkLock');

// POST /final-access
router.post('/', checkLock, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  // Fetch user state
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('is_verified, share_count, is_locked, lock_until')
    .eq('email', email)
    .single();

  if (userError || !user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if AI result exists for this user
  const { data: aiResult } = await supabase
    .from('ai_results')
    .select('id')
    .eq('email', email)
    .limit(1)
    .single();

  const checks = {
    otp_verified: user.is_verified === true,
    not_locked:   !user.is_locked || new Date() >= new Date(user.lock_until),
    shares_done:  user.share_count >= 5,
    ai_seen:      !!aiResult
  };

  const allPassed = Object.values(checks).every(Boolean);

  if (!allPassed) {
    const failed = Object.entries(checks)
      .filter(([, v]) => !v)
      .map(([k]) => k);

    return res.status(403).json({
      error:         'Not all steps completed',
      failed_checks: failed,
      checks
    });
  }

  // Grant access — update user record
  const { error: updateError } = await supabase
    .from('users')
    .update({
      access_granted:    true,
      access_granted_at: new Date().toISOString()
    })
    .eq('email', email);

  if (updateError) {
    console.error('Failed to update access_granted:', updateError.message);
    // Non-fatal: access is still granted in response
  }

  res.json({
    message:      'Access granted! Welcome to Vebe Kino.',
    email,
    checks,
    access_token: 'vk_demo_token_' + Date.now() // replace with JWT in production
  });
});

module.exports = router;