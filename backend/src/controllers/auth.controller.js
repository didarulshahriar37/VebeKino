const supabase = require('../services/supabase');

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
};

// Register user and generate OTP
const register = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const otp = generateOTP();
    const otp_created_at = new Date().toISOString();

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      // Check if locked
      if (existingUser.is_locked && new Date(existingUser.lock_until) > new Date()) {
        return res.status(403).json({
          message: `Account locked. Try again after ${existingUser.lock_until}`
        });
      }

      // Update OTP
      await supabase
        .from('users')
        .update({ otp, otp_created_at, is_verified: false })
        .eq('email', email);

    } else {
      // Create new user
      await supabase
        .from('users')
        .insert([{ email, otp, otp_created_at }]);
    }

    // Return OTP in response (shown on webpage as per requirements)
    return res.status(200).json({
      message: 'OTP generated successfully',
      otp // shown on frontend
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if locked
    if (user.is_locked && new Date(user.lock_until) > new Date()) {
      return res.status(403).json({
        message: `Account locked until ${user.lock_until}`
      });
    }

    // Check OTP expiry (10 minutes)
    const otpAge = (new Date() - new Date(user.otp_created_at)) / 1000 / 60;
    if (otpAge > 10) {
      return res.status(400).json({ message: 'OTP expired. Please request a new one' });
    }

    // Check OTP match
    if (user.otp !== otp) {
      // Get lock duration from settings
      const { data: setting } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'lock_duration_hours')
        .single();

      const lockHours = setting ? parseInt(setting.value) : 2; // default 2 hours
      const lock_until = new Date(Date.now() + lockHours * 60 * 60 * 1000).toISOString();

      await supabase
        .from('users')
        .update({ is_locked: true, lock_until })
        .eq('email', email);

      // Log the failed attempt
      await supabase
        .from('access_logs')
        .insert([{ user_id: user.id, action: 'otp_verify', status: 'failed' }]);

      return res.status(401).json({ message: `Wrong OTP. Account locked for ${lockHours} hours` });
    }

    // OTP correct — verify user
    await supabase
      .from('users')
      .update({ is_verified: true, is_locked: false, lock_until: null })
      .eq('email', email);

    // Log success
    await supabase
      .from('access_logs')
      .insert([{ user_id: user.id, action: 'otp_verify', status: 'success' }]);

    return res.status(200).json({ message: 'OTP verified successfully', user_id: user.id });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Track share click
const trackShare = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
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

    const newCount = user.share_count + 1;

    await supabase
      .from('users')
      .update({ share_count: newCount })
      .eq('id', user_id);

    // Log it
    await supabase
      .from('access_logs')
      .insert([{ user_id, action: 'share_click', status: 'success' }]);

    if (newCount >= 5) {
      return res.status(200).json({
        message: 'Access unlocked!',
        share_count: newCount,
        access_granted: true
      });
    }

    return res.status(200).json({
      message: `Share counted! ${5 - newCount} more to go.`,
      share_count: newCount,
      access_granted: false
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, verifyOTP , trackShare};