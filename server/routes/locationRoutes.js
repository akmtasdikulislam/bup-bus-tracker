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

router.get('/active', getAllActiveLocations);

router.get('/:scheduleId', getBusLocation);

router.post('/update', authenticateToken, driverOnly, sanitizeInput, locationValidation, validate, updateLocation);

router.delete('/:scheduleId', authenticateToken, driverOnly, stopTracking);

module.exports = router;

