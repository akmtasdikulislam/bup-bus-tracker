const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} = require('../controllers/routeController');
const { routeValidation } = require('../validators/routeValidator');
const { validate, sanitizeInput } = require('../middlewares/validateMiddleware');
const { authenticateToken, adminOnly } = require('../middlewares/authMiddleware');

// @route   GET /api/routes
// @desc    Get all routes
// @access  Public
router.get('/', getAllRoutes);

// @route   GET /api/routes/:id
// @desc    Get route by ID
// @access  Public
router.get('/:id', getRouteById);

// @route   POST /api/routes
// @desc    Create new route (admin only)
// @access  Private - Admin
router.post('/', authenticateToken, adminOnly, sanitizeInput, routeValidation, validate, createRoute);

// @route   PUT /api/routes/:id
// @desc    Update route (admin only)
// @access  Private - Admin
router.put('/:id', authenticateToken, adminOnly, sanitizeInput, routeValidation, validate, updateRoute);

// @route   DELETE /api/routes/:id
// @desc    Delete route (admin only)
// @access  Private - Admin
router.delete('/:id', authenticateToken, adminOnly, deleteRoute);

module.exports = router;

