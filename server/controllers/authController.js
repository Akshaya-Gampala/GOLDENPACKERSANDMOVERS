const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'golden_packers_movers_super_secret_jwt_key_2026',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });

if (!admin) {
    return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
    });
}

    const isMatch = await admin.matchPassword(password);

if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
    });
}

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
const getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: {
        id: req.admin._id,
        name: req.admin.name,
        email: req.admin.email,
        role: req.admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching admin profile' });
  }
};

// @desc    Admin logout
// @route   POST /api/auth/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = { loginAdmin, getMe, logoutAdmin };
