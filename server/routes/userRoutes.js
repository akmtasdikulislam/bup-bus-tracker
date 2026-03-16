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

router.get('/pending', authenticateToken, adminOnly, getPendingUsers);

router.put('/approve/:userId', authenticateToken, adminOnly, approveUser);

router.get('/profile', authenticateToken, getProfile);

router.put('/profile', 
  authenticateToken, 
  uploadSingle('profilePicture', 'profile-pictures'),
  sanitizeInput, 
  updateProfileValidation, 
  validate, 
  updateProfile
);

module.exports = router;

