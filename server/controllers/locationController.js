// Real-time location logic
const LiveLocation = require('../models/LiveLocation');
const Schedule = require('../models/Schedule');
const { validationResult } = require('express-validator');

// Update bus location (driver only)
const updateLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scheduleId, latitude, longitude, heading, speed } = req.body;

    // Check if schedule exists and belongs to the driver
    const schedule = await Schedule.findOne({ 
      _id: scheduleId, 
      driverId: req.user.id,
      isActive: true 
    });
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found or unauthorized' });
    }

    // Update or create location record
    let location = await LiveLocation.findOne({ scheduleId });
    
    if (location) {
      location.latitude = latitude;
      location.longitude = longitude;
      location.heading = heading;
      location.speed = speed;
      location.lastUpdated = new Date();
    } else {
      location = new LiveLocation({
        scheduleId,
        driverId: req.user.id,
        latitude,
        longitude,
        heading,
        speed,
      });
    }

    await location.save();
    
    // Emit location update via Socket.io
    req.io.emit('locationUpdate', {
      scheduleId,
      latitude,
      longitude,
      heading,
      speed,
      timestamp: location.lastUpdated,
    });

    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current location of a bus
const getBusLocation = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    
    const location = await LiveLocation.findOne({ scheduleId })
      .populate({
        path: 'scheduleId',
        populate: {
          path: 'routeId',
          select: 'routeName startPoint endPoint',
        },
      });

    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.json(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all active bus locations
const getAllActiveLocations = async (req, res) => {
  try {
    // Get locations updated within the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const locations = await LiveLocation.find({ 
      lastUpdated: { $gte: fiveMinutesAgo } 
    })
    .populate({
      path: 'scheduleId',
      populate: {
        path: 'routeId',
        select: 'routeName startPoint endPoint',
      },
    })
    .populate('driverId', 'name');

    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Stop tracking (driver only)
const stopTracking = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    
    const location = await LiveLocation.findOne({ 
      scheduleId, 
      driverId: req.user.id 
    });
    
    if (!location) {
      return res.status(404).json({ message: 'Location tracking not found' });
    }

    await LiveLocation.deleteOne({ _id: location._id });
    
    // Emit stop tracking event
    req.io.emit('trackingStopped', { scheduleId });

    res.json({ message: 'Tracking stopped successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  updateLocation,
  getBusLocation,
  getAllActiveLocations,
  stopTracking,
};

