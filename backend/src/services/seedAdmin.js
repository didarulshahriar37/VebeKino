const supabase = require('./supabase');
const bcrypt = require('bcrypt');
require('dotenv').config();

const seedAdmin = async () => {
  const email = 'admin@vebekino.com';
  const password = 'admin123';

  try {
    // Check if admin already exists
    const { data: existing } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (existing) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await supabase
      .from('admins')
      .insert([{ email, password: hashedPassword }]);

    console.log('Admin created successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);

  } catch (error) {
    console.error('Error seeding admin:', error.message);
    process.exit(1);
  }
};

seedAdmin(); 
