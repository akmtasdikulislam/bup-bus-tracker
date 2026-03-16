 
const LiveLocation = require('../models/LiveLocation');
const Schedule = require('../models/Schedule');
const { validationResult } = require('express-validator');

const updateLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { scheduleId, latitude, longitude, heading, speed } = req.body;

    const schedule = await Schedule.findOne({ 
      _id: scheduleId, 
      driverId: req.user.id,
      isActive: true 
    });
    
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found or unauthorized' });
    }

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

const getAllActiveLocations = async (req, res) => {
  try {
     
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

