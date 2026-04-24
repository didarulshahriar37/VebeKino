const express = require('express');
const router = express.Router();
const { register, verifyOTP, trackShare } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/share', trackShare);

module.exports = router;