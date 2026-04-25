const express  = require('express');
const router   = express.Router();
const supabase = require('../db');

// POST /admin/set-lock-hours
// Body: { hours: 4 }
router.post('/set-lock-hours', async (req, res) => {
  const { hours } = req.body;

  if (!hours || isNaN(hours) || hours < 1) {
    return res.status(400).json({ error: 'Provide a valid number of hours' });
  }

  await supabase.from('admin_config')
    .upsert({ key: 'lock_hours', value: String(hours) });

  res.json({ message: `Lock duration set to ${hours} hour(s)` });
});

// POST /admin/reset-lock
// Body: { email: "..." }
router.post('/reset-lock', async (req, res) => {
  const { email } = req.body;
  await supabase.from('users').update({
    is_locked: false, lock_until: null
  }).eq('email', email);
  res.json({ message: 'Lock reset' });
});

module.exports = router;
