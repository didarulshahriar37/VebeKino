const supabase = require('../services/supabase');
const bcrypt = require('bcrypt');

// Admin login
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    return res.status(200).json({ message: 'Admin logged in', admin_id: admin.id });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { data: users } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    return res.status(200).json({ users });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reset user lock
const resetLock = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    await supabase
      .from('users')
      .update({ is_locked: false, lock_until: null })
      .eq('id', user_id);

    return res.status(200).json({ message: 'User lock reset successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Set lock duration
const setLockDuration = async (req, res) => {
  const { hours } = req.body;

  if (!hours) {
    return res.status(400).json({ message: 'Hours is required' });
  }

  try {
    const { data: existing } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'lock_duration_hours')
      .single();

    if (existing) {
      await supabase
        .from('settings')
        .update({ value: hours.toString(), updated_at: new Date().toISOString() })
        .eq('key', 'lock_duration_hours');
    } else {
      await supabase
        .from('settings')
        .insert([{ key: 'lock_duration_hours', value: hours.toString() }]);
    }

    return res.status(200).json({ message: `Lock duration set to ${hours} hours` });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get access logs
const getAccessLogs = async (req, res) => {
  try {
    const { data: logs } = await supabase
      .from('access_logs')
      .select('*, users(email)')
      .order('created_at', { ascending: false });

    return res.status(200).json({ logs });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { adminLogin, getAllUsers, resetLock, setLockDuration, getAccessLogs }; 
