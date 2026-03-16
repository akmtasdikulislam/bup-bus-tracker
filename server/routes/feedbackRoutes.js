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

router.post('/', 
  authenticateToken, 
  uploadMultiple('attachments', 3, 'feedback'),
  sanitizeInput, 
  feedbackValidation, 
  validate, 
  submitFeedback
);

router.get('/', authenticateToken, adminOnly, getAllFeedback);

router.get('/user', authenticateToken, getUserFeedback);

router.put('/:feedbackId/status', authenticateToken, adminOnly, sanitizeInput, updateFeedbackStatus);

module.exports = router;

