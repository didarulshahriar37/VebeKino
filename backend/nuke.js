const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

async function nuke() {
  await mongoose.connect(process.env.MONGODB_URI);
  const res = await User.deleteMany({ email: { $ne: 'admin@vebe-kino.com' } });
  console.log('Users deleted:', res.deletedCount);
  process.exit(0);
}
nuke();
