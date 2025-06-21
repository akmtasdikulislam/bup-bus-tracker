const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  getSchedulesByRoute,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/scheduleController');
const { scheduleValidation } = require('../validators/scheduleValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');
const { authenticateToken, adminOnly } = require('../middlewares/authMiddleware');

// @route   GET /api/schedules
// @desc    Get all schedules
// @access  Public
router.get('/', getAllSchedules);

// @route   GET /api/schedules/route/:routeId
// @desc    Get schedules by route
// @access  Public
router.get('/route/:routeId', getSchedulesByRoute);

// @route   POST /api/schedules
// @desc    Create new schedule (admin only)
// @access  Private - Admin
router.post('/', authenticateToken, adminOnly, sanitizeInput, scheduleValidation, validate, createSchedule);

// @route   PUT /api/schedules/:id
// @desc    Update schedule (admin only)
// @access  Private - Admin
router.put('/:id', authenticateToken, adminOnly, sanitizeInput, scheduleValidation, validate, updateSchedule);

// @route   DELETE /api/schedules/:id
// @desc    Delete schedule (admin only)
// @access  Private - Admin
router.delete('/:id', authenticateToken, adminOnly, deleteSchedule);

module.exports = router;

