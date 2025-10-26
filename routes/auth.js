const express = require('express');
const router = express.Router();
const { 
  registerUser,
  registerAdmin,
  loginUser,
  getUserProfile
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/register-admin').post(registerAdmin); // New admin registration endpoint
router.route('/login').post(loginUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;