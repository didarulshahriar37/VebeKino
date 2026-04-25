const supabase = require('./src/db');
async function run() {
  const { data, error } = await supabase.from('users').upsert({ email: 'test2@test.com', role: 'user' }, { onConflict: 'email' });
  console.log('Result:', data, error);
}
run();
