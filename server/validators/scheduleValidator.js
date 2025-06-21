const { body } = require('express-validator');
const { DAYS_OF_WEEK } = require('../utils/constants');

const scheduleValidation = [
  body('routeId')
    .isMongoId()
    .withMessage('Invalid route ID'),
  
  body('driverId')
    .isMongoId()
    .withMessage('Invalid driver ID'),
  
  body('busNumber')
    .trim()
    .notEmpty()
    .withMessage('Bus number is required'),
  
  body('departureTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Departure time must be in HH:MM format'),
  
  body('arrivalTime')
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Arrival time must be in HH:MM format'),
  
  body('days')
    .isArray({ min: 1 })
    .withMessage('At least one day must be selected'),
  
  body('days.*')
    .isIn(DAYS_OF_WEEK)
    .withMessage('Invalid day'),
  
  body('capacity')
    .isInt({ min: 1, max: 100 })
    .withMessage('Capacity must be between 1 and 100'),
  
  body('fare')
    .isFloat({ min: 0 })
    .withMessage('Fare must be a positive number'),
  
  body('estimatedDuration')
    .isInt({ min: 1 })
    .withMessage('Estimated duration must be at least 1 minute'),
];

module.exports = {
  scheduleValidation,
};

