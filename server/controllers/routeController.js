// Bus route CRUD
const BusRoute = require('../models/BusRoute');
const { validationResult } = require('express-validator');

// Get all routes
const getAllRoutes = async (req, res) => {
  try {
    const routes = await BusRoute.find({ isActive: true });
    res.json(routes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get route by ID
const getRouteById = async (req, res) => {
  try {
    const route = await BusRoute.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new route (admin only)
const createRoute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { routeName, startPoint, endPoint, stops, distance, estimatedTime } = req.body;

    const route = new BusRoute({
      routeName,
      startPoint,
      endPoint,
      stops,
      distance,
      estimatedTime,
      createdBy: req.user.id,
    });

    await route.save();
    res.status(201).json({ message: 'Route created successfully', route });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update route (admin only)
const updateRoute = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const route = await BusRoute.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    const { routeName, startPoint, endPoint, stops, distance, estimatedTime } = req.body;

    route.routeName = routeName || route.routeName;
    route.startPoint = startPoint || route.startPoint;
    route.endPoint = endPoint || route.endPoint;
    route.stops = stops || route.stops;
    route.distance = distance || route.distance;
    route.estimatedTime = estimatedTime || route.estimatedTime;
    route.updatedAt = Date.now();

    await route.save();
    res.json({ message: 'Route updated successfully', route });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete route (admin only)
const deleteRoute = async (req, res) => {
  try {
    const route = await BusRoute.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    route.isActive = false;
    await route.save();

    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
};

