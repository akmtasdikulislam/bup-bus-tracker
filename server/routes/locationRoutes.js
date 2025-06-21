const express = require('express');
const router = express.Router();
const {
  updateLocation,
  getBusLocation,
  getAllActiveLocations,
  stopTracking,
} = require('../controllers/locationController');
const { locationValidation } = require('../validators/routeValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');
const { authenticateToken, driverOnly } = require('../middlewares/authMiddleware');

// @route   GET /api/location/active
// @desc    Get all active bus locations
// @access  Public
router.get('/active', getAllActiveLocations);

// @route   GET /api/location/:scheduleId
// @desc    Get current location of a bus
// @access  Public
router.get('/:scheduleId', getBusLocation);

// @route   POST /api/location/update
// @desc    Update bus location (driver only)
// @access  Private - Driver
router.post('/update', authenticateToken, driverOnly, sanitizeInput, locationValidation, validate, updateLocation);

// @route   DELETE /api/location/:scheduleId
// @desc    Stop tracking (driver only)
// @access  Private - Driver
router.delete('/:scheduleId', authenticateToken, driverOnly, stopTracking);

module.exports = router;

