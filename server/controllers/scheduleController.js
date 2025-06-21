// Schedule management
const Schedule = require('../models/Schedule');
const BusRoute = require('../models/BusRoute');
const { validationResult } = require('express-validator');

// Get all schedules
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ isActive: true })
      .populate('routeId', 'routeName startPoint endPoint')
      .populate('driverId', 'name email');
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get schedules by route
const getSchedulesByRoute = async (req, res) => {
  try {
    const { routeId } = req.params;
    const schedules = await Schedule.find({ routeId, isActive: true })
      .populate('routeId', 'routeName startPoint endPoint')
      .populate('driverId', 'name email');
    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new schedule (admin only)
const createSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { routeId, driverId, departureTime, arrivalTime, busNumber, days } = req.body;

    // Check if route exists
    const route = await BusRoute.findById(routeId);
    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    const schedule = new Schedule({
      routeId,
      driverId,
      departureTime,
      arrivalTime,
      busNumber,
      days,
      createdBy: req.user.id,
    });

    await schedule.save();
    await schedule.populate('routeId', 'routeName startPoint endPoint');
    await schedule.populate('driverId', 'name email');

    res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update schedule (admin only)
const updateSchedule = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    const { routeId, driverId, departureTime, arrivalTime, busNumber, days } = req.body;

    schedule.routeId = routeId || schedule.routeId;
    schedule.driverId = driverId || schedule.driverId;
    schedule.departureTime = departureTime || schedule.departureTime;
    schedule.arrivalTime = arrivalTime || schedule.arrivalTime;
    schedule.busNumber = busNumber || schedule.busNumber;
    schedule.days = days || schedule.days;
    schedule.updatedAt = Date.now();

    await schedule.save();
    await schedule.populate('routeId', 'routeName startPoint endPoint');
    await schedule.populate('driverId', 'name email');

    res.json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete schedule (admin only)
const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.isActive = false;
    await schedule.save();

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllSchedules,
  getSchedulesByRoute,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};

