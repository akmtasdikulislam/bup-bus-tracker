const express = require('express');
const router = express.Router();
const {
  getPendingUsers,
  approveUser,
  getProfile,
  updateProfile,
} = require('../controllers/userController');
const { updateProfileValidation } = require('../validators/userValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');
const { authenticateToken, adminOnly } = require('../middlewares/authMiddleware');
const { uploadSingle } = require('../middlewares/uploadMiddleware');

// @route   GET /api/users/pending
// @desc    Get all pending users (admin only)
// @access  Private - Admin
router.get('/pending', authenticateToken, adminOnly, getPendingUsers);

// @route   PUT /api/users/approve/:userId
// @desc    Approve a user (admin only)
// @access  Private - Admin
router.put('/approve/:userId', authenticateToken, adminOnly, approveUser);

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticateToken, getProfile);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', 
  authenticateToken, 
  uploadSingle('profilePicture', 'profile-pictures'),
  sanitizeInput, 
  updateProfileValidation, 
  validate, 
  updateProfile
);

module.exports = router;

