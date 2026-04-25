const supabase = require('./src/db');

async function seedAdmin() {
  console.log('Seeding admin user...');
  const { data, error } = await supabase
    .from('users')
    .upsert({
      email: 'admin@vebe-kino.com',
      role: 'admin',
      is_verified: true
    }, { onConflict: 'email' });

  if (error) {
    console.error('Error seeding admin:', error.message);
  } else {
    console.log('Admin user seeded successfully:', data);
  }
}

seedAdmin();
