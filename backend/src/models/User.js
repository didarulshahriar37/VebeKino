const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // STRICT: Must have a password
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  otp: { type: String, default: null },
  otp_expiry: { type: Date, default: null },
  is_verified: { type: Boolean, default: false },
  is_locked: { type: Boolean, default: false },
  lock_until: { type: Date, default: null },
  share_count: { type: Number, default: 0 },
  access_granted: { type: Boolean, default: false },
  access_granted_at: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
