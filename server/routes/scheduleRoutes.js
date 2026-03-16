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

router.get('/', getAllSchedules);

router.get('/route/:routeId', getSchedulesByRoute);

router.post('/', authenticateToken, adminOnly, sanitizeInput, scheduleValidation, validate, createSchedule);

router.put('/:id', authenticateToken, adminOnly, sanitizeInput, scheduleValidation, validate, updateSchedule);

router.delete('/:id', authenticateToken, adminOnly, deleteSchedule);

module.exports = router;

