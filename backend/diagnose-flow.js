const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./src/models/User');

async function testFlow() {
  await mongoose.connect(process.env.MONGODB_URI);
  const email = 'flowtest@example.com';
  const password = 'testpassword123';
  
  console.log('--- 1. CLEANUP ---');
  await User.deleteMany({ email });
  
  console.log('--- 2. SIGNUP (Step 1) ---');
  const otp = '123456';
  const user = new User({ email, password, otp, otp_expiry: new Date(Date.now() + 60000) });
  await user.save();
  
  let check1 = await User.findOne({ email });
  console.log('DB after signup (has password?):', !!check1.password, check1.password);
  
  console.log('--- 3. VERIFY OTP (Step 2) ---');
  check1.is_verified = true;
  await check1.save();
  
  let check2 = await User.findOne({ email });
  console.log('DB after verify (has password?):', !!check2.password, check2.password);
  
  console.log('--- 4. LOGIN ---');
  const loginUser = await User.findOne({ email });
  const isMatch = loginUser.password === password;
  console.log('Login match:', isMatch);
  
  await User.deleteMany({ email });
  process.exit(0);
}

testFlow();
