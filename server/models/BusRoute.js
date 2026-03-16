const mongoose = require('mongoose');

const busRouteSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: [true, 'Route name is required'],
    trim: true,
    maxlength: [100, 'Route name cannot exceed 100 characters'],
  },
  routeCode: {
    type: String,
    unique: true,
    trim: true,
    uppercase: true,
  },
  startPoint: {
    name: {
      type: String,
      required: [true, 'Start point name is required'],
      trim: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, 'Start point latitude is required'],
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        required: [true, 'Start point longitude is required'],
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
    },
    address: {
      type: String,
      trim: true,
    },
  },
  endPoint: {
    name: {
      type: String,
      required: [true, 'End point name is required'],
      trim: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, 'End point latitude is required'],
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        required: [true, 'End point longitude is required'],
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
    },
    address: {
      type: String,
      trim: true,
    },
  },
  stops: [{
    name: {
      type: String,
      required: true,
      trim: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        required: true,
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
    },
    address: {
      type: String,
      trim: true,
    },
    estimatedArrivalTime: {
      type: Number,  
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  }],
  distance: {
    type: Number,  
    required: [true, 'Distance is required'],
    min: [0, 'Distance must be positive'],
  },
  estimatedTime: {
    type: Number,  
    required: [true, 'Estimated time is required'],
    min: [1, 'Estimated time must be at least 1 minute'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

busRouteSchema.pre('save', function(next) {
  if (!this.routeCode) {
     
    const startCode = this.startPoint.name.substring(0, 3).toUpperCase();
    const endCode = this.endPoint.name.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-4);
    this.routeCode = `${startCode}-${endCode}-${timestamp}`;
  }
  next();
});

busRouteSchema.index({ isActive: 1 });
busRouteSchema.index({ 'startPoint.name': 'text', 'endPoint.name': 'text', routeName: 'text' });

module.exports = mongoose.model('BusRoute', busRouteSchema);

