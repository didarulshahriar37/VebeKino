const supabase = require('../db');

// This middleware runs BEFORE any protected route.
// If the user is locked → stop here, return error.
// If not locked → call next() to continue to the route.
async function checkLock(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  // Fetch the user from Supabase
  const { data: user, error } = await supabase
    .from('users')
    .select('is_locked, lock_until')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check: is the lock still active?
  //   new Date()           = right now
  //   new Date(lock_until)  = when the lock expires
  //   if now < expiry → still locked
  if (user.is_locked && new Date() < new Date(user.lock_until)) {
    const remaining = Math.ceil(
      (new Date(user.lock_until) - new Date()) / 60000
    ); // minutes remaining
    return res.status(403).json({
      error: 'Account locked',
      message: `Try again in ${remaining} minutes`
    });
  }

  // Lock expired → auto-reset it in DB, then proceed
  if (user.is_locked) {
    await supabase.from('users').update({
      is_locked: false, lock_until: null
    }).eq('email', email);
  }

  next(); // ← all clear, continue to the actual route
}

module.exports = checkLock;