const { body } = require('express-validator');

const routeValidation = [
  body('routeName')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Route name must be between 3 and 100 characters'),
  
  body('startPoint.name')
    .trim()
    .notEmpty()
    .withMessage('Start point name is required'),
  
  body('startPoint.coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Start point latitude must be between -90 and 90'),
  
  body('startPoint.coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Start point longitude must be between -180 and 180'),
  
  body('endPoint.name')
    .trim()
    .notEmpty()
    .withMessage('End point name is required'),
  
  body('endPoint.coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('End point latitude must be between -90 and 90'),
  
  body('endPoint.coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('End point longitude must be between -180 and 180'),
  
  body('distance')
    .isFloat({ min: 0 })
    .withMessage('Distance must be a positive number'),
  
  body('estimatedTime')
    .isInt({ min: 1 })
    .withMessage('Estimated time must be at least 1 minute'),
];

const locationValidation = [
  body('scheduleId')
    .isMongoId()
    .withMessage('Invalid schedule ID'),
  
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  
  body('heading')
    .optional()
    .isFloat({ min: 0, max: 360 })
    .withMessage('Heading must be between 0 and 360'),
  
  body('speed')
    .optional()
    .isFloat({ min: 0, max: 200 })
    .withMessage('Speed must be between 0 and 200'),
];

module.exports = {
  routeValidation,
  locationValidation,
};

