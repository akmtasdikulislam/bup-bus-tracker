const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', sanitizeInput, registerValidation, validate, register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', sanitizeInput, loginValidation, validate, login);

module.exports = router;

