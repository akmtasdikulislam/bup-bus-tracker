const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getAllFeedback,
  getUserFeedback,
  updateFeedbackStatus,
} = require('../controllers/feedbackController');
const { feedbackValidation } = require('../validators/feedbackValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');
const { authenticateToken, adminOnly } = require('../middlewares/authMiddleware');
const { uploadMultiple } = require('../middlewares/uploadMiddleware');

// @route   POST /api/feedback
// @desc    Submit feedback
// @access  Private
router.post('/', 
  authenticateToken, 
  uploadMultiple('attachments', 3, 'feedback'),
  sanitizeInput, 
  feedbackValidation, 
  validate, 
  submitFeedback
);

// @route   GET /api/feedback
// @desc    Get all feedback (admin only)
// @access  Private - Admin
router.get('/', authenticateToken, adminOnly, getAllFeedback);

// @route   GET /api/feedback/user
// @desc    Get user's feedback
// @access  Private
router.get('/user', authenticateToken, getUserFeedback);

// @route   PUT /api/feedback/:feedbackId/status
// @desc    Update feedback status (admin only)
// @access  Private - Admin
router.put('/:feedbackId/status', authenticateToken, adminOnly, sanitizeInput, updateFeedbackStatus);

module.exports = router;

