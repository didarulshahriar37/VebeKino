 const cron = require('node-cron');
const supabase = require('../services/supabase');

const unlockUsers = () => {
  cron.schedule('*/30 * * * *', async () => {
    console.log('Running unlock job...');

    try {
      const now = new Date().toISOString();

      const { data: lockedUsers } = await supabase
        .from('users')
        .select('*')
        .eq('is_locked', true)
        .lt('lock_until', now);

      if (!lockedUsers || lockedUsers.length === 0) {
        console.log('No users to unlock');
        return;
      }

      for (const user of lockedUsers) {
        await supabase
          .from('users')
          .update({ is_locked: false, lock_until: null })
          .eq('id', user.id);

        await supabase
          .from('access_logs')
          .insert([{ user_id: user.id, action: 'auto_unlock', status: 'success' }]);

        console.log(`Unlocked user: ${user.email}`);
      }

    } catch (error) {
      console.error('Unlock job error:', error.message);
    }
  });

  console.log('Unlock cron job started!');
};

module.exports = unlockUsers;