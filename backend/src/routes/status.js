const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

// GET /status?email=user@example.com
router.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: 'email query param required' });
  }

  const { data: user } = await supabase
    .from('users')
    .select('is_verified, is_locked, lock_until, share_count')
    .eq('email', email)
    .single();

  if (!user) return res.status(404).json({ error: 'User not found' });

  // Compute derived fields server-side — not stored in DB
  const currently_locked = user.is_locked &&
    new Date() < new Date(user.lock_until);

  const can_proceed = user.is_verified &&
    !currently_locked &&
    user.share_count >= 5;

  res.json({
    is_verified:     user.is_verified,
    is_locked:       currently_locked,
    lock_until:      currently_locked ? user.lock_until : null,
    share_count:     user.share_count,
    clicks_needed:   Math.max(0, 5 - user.share_count),
    can_proceed      // true only when all conditions met
  });
});

module.exports = router;