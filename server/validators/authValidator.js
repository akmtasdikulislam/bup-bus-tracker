const { body } = require('express-validator');
const { USER_ROLES } = require('../utils/constants');

const registerValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  
  body('role')
    .isIn(Object.values(USER_ROLES))
    .withMessage('Invalid role'),
  
  body('studentId')
    .if(body('role').equals('student'))
    .notEmpty()
    .withMessage('Student ID is required for students'),
];

const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

module.exports = {
  registerValidation,
  loginValidation,
};

