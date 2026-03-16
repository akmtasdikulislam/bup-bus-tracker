const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusRoute',
    required: [true, 'Route ID is required'],
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Driver ID is required'],
  },
  busNumber: {
    type: String,
    required: [true, 'Bus number is required'],
    trim: true,
    uppercase: true,
  },
  departureTime: {
    type: String,  
    required: [true, 'Departure time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format'],
  },
  arrivalTime: {
    type: String,  
    required: [true, 'Arrival time is required'],
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time in HH:MM format'],
  },
  days: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    required: true,
  }],
  frequency: {
    type: String,
    enum: ['once', 'daily', 'weekly', 'custom'],
    default: 'daily',
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled', 'delayed'],
    default: 'scheduled',
  },
  capacity: {
    type: Number,
    required: [true, 'Bus capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [100, 'Capacity cannot exceed 100'],
  },
  currentPassengers: {
    type: Number,
    default: 0,
    min: [0, 'Current passengers cannot be negative'],
  },
  fare: {
    type: Number,
    required: [true, 'Fare is required'],
    min: [0, 'Fare cannot be negative'],
  },
  estimatedDuration: {
    type: Number,  
    required: [true, 'Estimated duration is required'],
    min: [1, 'Duration must be at least 1 minute'],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters'],
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
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

scheduleSchema.pre('save', function(next) {
  const departureMinutes = this.departureTime.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0);
  const arrivalMinutes = this.arrivalTime.split(':').reduce((acc, time) => (60 * acc) + parseInt(time), 0);
  
  if (arrivalMinutes <= departureMinutes) {
    next(new Error('Arrival time must be after departure time'));
  } else {
    next();
  }
});

scheduleSchema.pre('save', function(next) {
  if (this.currentPassengers > this.capacity) {
    next(new Error('Current passengers cannot exceed bus capacity'));
  } else {
    next();
  }
});

scheduleSchema.index({ routeId: 1 });
scheduleSchema.index({ driverId: 1 });
scheduleSchema.index({ departureTime: 1 });
scheduleSchema.index({ days: 1 });
scheduleSchema.index({ status: 1 });
scheduleSchema.index({ isActive: 1 });
scheduleSchema.index({ busNumber: 1 });

scheduleSchema.virtual('availableSeats').get(function() {
  return this.capacity - this.currentPassengers;
});

scheduleSchema.virtual('occupancyPercentage').get(function() {
  return Math.round((this.currentPassengers / this.capacity) * 100);
});

module.exports = mongoose.model('Schedule', scheduleSchema);

