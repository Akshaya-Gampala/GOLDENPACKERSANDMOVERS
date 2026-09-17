const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, logoutAdmin } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.get('/me', protectAdmin, getMe);

module.exports = router;
