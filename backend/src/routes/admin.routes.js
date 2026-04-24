const express = require('express');
const router = express.Router();
const { adminLogin, getAllUsers, resetLock, setLockDuration, getAccessLogs } = require('../controllers/admin.controller');
const { isAdmin } = require('../middleware/auth.middleware');

router.post('/login', adminLogin);
router.get('/users', isAdmin, getAllUsers);
router.post('/reset-lock', isAdmin, resetLock);
router.post('/set-lock-duration', isAdmin, setLockDuration);
router.get('/logs', isAdmin, getAccessLogs);

module.exports = router;