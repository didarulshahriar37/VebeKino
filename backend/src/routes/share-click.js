const express     = require('express');
const router      = express.Router();
const supabase    = require('../db');
const checkLock   = require('../middleware/checkLock');
const rateLimiter = require('../middleware/rateLimiter');

const REQUIRED_CLICKS = 5;

// POST /share-click
// Middleware chain: checkLock → rateLimiter → handler
router.post('/', checkLock, rateLimiter, async (req, res) => {
  const { email } = req.body;

  // Must be verified first before clicks count
  const { data: user } = await supabase
    .from('users')
    .select('is_verified, share_count')
    .eq('email', email)
    .single();

  if (!user?.is_verified) {
    return res.status(403).json({
      error: 'Must complete OTP verification first'
    });
  }

  if (user.share_count >= REQUIRED_CLICKS) {
    return res.json({
      message: 'Already unlocked!',
      share_count: user.share_count,
      can_proceed: true
    });
  }

  // Atomic increment: read + write in ONE database operation.
  // This prevents race conditions (two requests both reading 4
  // and both writing 5 — they'd each count as only 1 click).
  const newCount = user.share_count + 1;
  await supabase.from('users')
    .update({ share_count: newCount })
    .eq('email', email);

  const can_proceed = newCount >= REQUIRED_CLICKS;

  res.json({
    message: can_proceed
      ? 'All clicks done! Content unlocked.'
      : `${REQUIRED_CLICKS - newCount} more click(s) needed`,
    share_count: newCount,
    can_proceed
  });
});

module.exports = router;