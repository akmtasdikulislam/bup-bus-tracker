const mongoose = require('mongoose');

const liveLocationSchema = new mongoose.Schema({
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: [true, 'Schedule ID is required'],
    unique: true,  
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Driver ID is required'],
  },
  latitude: {
    type: Number,
    required: [true, 'Latitude is required'],
    min: [-90, 'Latitude must be between -90 and 90'],
    max: [90, 'Latitude must be between -90 and 90'],
  },
  longitude: {
    type: Number,
    required: [true, 'Longitude is required'],
    min: [-180, 'Longitude must be between -180 and 180'],
    max: [180, 'Longitude must be between -180 and 180'],
  },
  heading: {
    type: Number,  
    min: [0, 'Heading must be between 0 and 360'],
    max: [360, 'Heading must be between 0 and 360'],
    default: 0,
  },
  speed: {
    type: Number,  
    min: [0, 'Speed cannot be negative'],
    max: [200, 'Speed cannot exceed 200 km/h'],
    default: 0,
  },
  altitude: {
    type: Number,  
    default: 0,
  },
  accuracy: {
    type: Number,  
    default: 0,
  },
  isMoving: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'offline'],
    default: 'active',
  },
  nearestStop: {
    stopId: {
      type: String,
    },
    stopName: {
      type: String,
    },
    distanceToStop: {
      type: Number,  
    },
    estimatedArrival: {
      type: Date,
    },
  },
  passengers: {
    onBoard: {
      type: Number,
      default: 0,
      min: [0, 'Passengers on board cannot be negative'],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  tripStatus: {
    type: String,
    enum: ['not-started', 'in-transit', 'at-stop', 'completed', 'cancelled'],
    default: 'not-started',
  },
  metadata: {
    deviceId: String,
    appVersion: String,
    batteryLevel: Number,
    networkType: String,
  },
}, {
  timestamps: true,
});

liveLocationSchema.pre('save', function(next) {
  this.lastUpdated = new Date();

  this.isMoving = this.speed > 5;  
  
  next();
});

liveLocationSchema.index({ driverId: 1 });
liveLocationSchema.index({ lastUpdated: 1 });
liveLocationSchema.index({ status: 1 });
liveLocationSchema.index({ tripStatus: 1 });
liveLocationSchema.index({ 
  location: '2dsphere'  
});

liveLocationSchema.index({ 
  latitude: 1, 
  longitude: 1 
});

liveLocationSchema.virtual('coordinates').get(function() {
  return [this.longitude, this.latitude];
});

liveLocationSchema.methods.distanceTo = function(lat, lng) {
  const R = 6371e3;  
  const φ1 = this.latitude * Math.PI / 180;
  const φ2 = lat * Math.PI / 180;
  const Δφ = (lat - this.latitude) * Math.PI / 180;
  const Δλ = (lng - this.longitude) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;  
};

liveLocationSchema.statics.findNearby = function(lat, lng, radiusInMeters = 1000) {
  return this.find({
    latitude: {
      $gte: lat - (radiusInMeters / 111320),  
      $lte: lat + (radiusInMeters / 111320)
    },
    longitude: {
      $gte: lng - (radiusInMeters / (111320 * Math.cos(lat * Math.PI / 180))),
      $lte: lng + (radiusInMeters / (111320 * Math.cos(lat * Math.PI / 180)))
    },
    status: 'active',
    lastUpdated: { $gte: new Date(Date.now() - 5 * 60 * 1000) }  
  });
};

module.exports = mongoose.model('LiveLocation', liveLocationSchema);

