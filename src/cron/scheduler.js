const cron = require('node-cron');
const User = require('../models/user.model');

const initScheduler = () => {
  cron.schedule('*/5 * * * *', async () => {
    try {
      const total = await User.countAll();
      console.log(`[CRON] Total users: ${total}`);
    } catch (error) {
      console.error('[CRON] Failed to count users:', error.message);
    }
  });

  console.log('[CRON] Scheduler initialized — user count every 5 minutes');
};

module.exports = { initScheduler };
