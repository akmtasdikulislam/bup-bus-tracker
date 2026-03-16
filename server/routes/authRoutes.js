const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');

router.post('/register', sanitizeInput, registerValidation, validate, register);

router.post('/login', sanitizeInput, loginValidation, validate, login);

module.exports = router;

