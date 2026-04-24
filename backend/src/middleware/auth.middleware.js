 const supabase = require('../services/supabase');

const isAdmin = async (req, res, next) => {
  const admin_id = req.headers['admin_id'];

  if (!admin_id) {
    return res.status(401).json({ message: 'Unauthorized. Admin ID required' });
  }

  try {
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('id', admin_id)
      .single();

    if (!admin) {
      return res.status(401).json({ message: 'Unauthorized. Invalid admin' });
    }

    req.admin = admin;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const isVerified = async (req, res, next) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(401).json({ message: 'Unauthorized. User ID required' });
  }

  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Please verify OTP first' });
    }

    if (user.is_locked && new Date(user.lock_until) > new Date()) {
      return res.status(403).json({ message: `Account locked until ${user.lock_until}` });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { isAdmin, isVerified };
