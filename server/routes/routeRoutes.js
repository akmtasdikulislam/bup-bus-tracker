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

router.get('/', getAllRoutes);

router.get('/:id', getRouteById);

router.post('/', authenticateToken, adminOnly, sanitizeInput, routeValidation, validate, createRoute);

router.put('/:id', authenticateToken, adminOnly, sanitizeInput, routeValidation, validate, updateRoute);

router.delete('/:id', authenticateToken, adminOnly, deleteRoute);

module.exports = router;

