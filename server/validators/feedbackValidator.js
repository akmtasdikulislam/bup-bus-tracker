const { body } = require('express-validator');
const { FEEDBACK_TYPES, FEEDBACK_CATEGORIES } = require('../utils/constants');

const feedbackValidation = [
  body('type')
    .isIn(Object.values(FEEDBACK_TYPES))
    .withMessage('Invalid feedback type'),
  
  body('category')
    .isIn(Object.values(FEEDBACK_CATEGORIES))
    .withMessage('Invalid feedback category'),
  
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('scheduleId')
    .optional()
    .isMongoId()
    .withMessage('Invalid schedule ID'),
  
  body('routeId')
    .optional()
    .isMongoId()
    .withMessage('Invalid route ID'),
  
  body('rating')
    .if(body('type').equals('compliment'))
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('location.latitude')
    .optional()
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('location.longitude')
    .optional()
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
];

module.exports = {
  feedbackValidation,
};

