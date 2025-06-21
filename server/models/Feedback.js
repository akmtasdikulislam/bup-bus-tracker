const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  type: {
    type: String,
    enum: ['complaint', 'suggestion', 'compliment', 'bug-report', 'general'],
    required: [true, 'Feedback type is required'],
  },
  category: {
    type: String,
    enum: ['service-quality', 'driver-behavior', 'bus-condition', 'schedule', 'app-issue', 'route', 'safety', 'other'],
    required: [true, 'Feedback category is required'],
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: false, // Not all feedback is related to a specific schedule
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusRoute',
    required: false,
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'in-progress', 'resolved', 'closed'],
    default: 'pending',
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be between 1 and 5'],
    max: [5, 'Rating must be between 1 and 5'],
    required: function() {
      return this.type === 'compliment';
    },
  },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    fileSize: Number,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  location: {
    latitude: {
      type: Number,
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
    },
    longitude: {
      type: Number,
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
    },
    address: String,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  response: {
    type: String,
    trim: true,
    maxlength: [1000, 'Response cannot exceed 1000 characters'],
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  respondedAt: {
    type: Date,
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
  }],
  metadata: {
    deviceInfo: {
      platform: String,
      version: String,
      model: String,
    },
    appVersion: String,
    userAgent: String,
    ipAddress: String,
  },
  relatedFeedback: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
  }],
  escalationLevel: {
    type: Number,
    default: 0,
    min: [0, 'Escalation level cannot be negative'],
    max: [3, 'Maximum escalation level is 3'],
  },
  isPublic: {
    type: Boolean,
    default: false, // Whether this feedback can be shown publicly (testimonials, etc.)
  },
}, {
  timestamps: true,
});

// Auto-assign priority based on keywords
feedbackSchema.pre('save', function(next) {
  if (this.isNew) {
    const urgentKeywords = ['accident', 'emergency', 'danger', 'unsafe', 'broken', 'harassment'];
    const highKeywords = ['delay', 'cancelled', 'rude', 'dirty', 'overcrowded'];
    
    const messageWords = this.message.toLowerCase().split(' ');
    const subjectWords = this.subject.toLowerCase().split(' ');
    const allWords = [...messageWords, ...subjectWords];
    
    if (urgentKeywords.some(keyword => allWords.includes(keyword))) {
      this.priority = 'urgent';
    } else if (highKeywords.some(keyword => allWords.includes(keyword))) {
      this.priority = 'high';
    }
  }
  next();
});

// Update escalation level based on time and priority
feedbackSchema.methods.checkEscalation = function() {
  const daysSinceCreated = Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
  
  if (this.status === 'pending') {
    if (this.priority === 'urgent' && daysSinceCreated >= 1) {
      this.escalationLevel = Math.min(3, Math.floor(daysSinceCreated));
    } else if (this.priority === 'high' && daysSinceCreated >= 3) {
      this.escalationLevel = Math.min(3, Math.floor(daysSinceCreated / 3));
    } else if (this.priority === 'medium' && daysSinceCreated >= 7) {
      this.escalationLevel = Math.min(3, Math.floor(daysSinceCreated / 7));
    }
  }
  
  return this.escalationLevel;
};

// Index for better query performance
feedbackSchema.index({ userId: 1 });
feedbackSchema.index({ type: 1 });
feedbackSchema.index({ category: 1 });
feedbackSchema.index({ status: 1 });
feedbackSchema.index({ priority: 1 });
feedbackSchema.index({ scheduleId: 1 });
feedbackSchema.index({ routeId: 1 });
feedbackSchema.index({ createdAt: -1 });
feedbackSchema.index({ escalationLevel: 1 });
feedbackSchema.index({ isPublic: 1 });

// Text search index
feedbackSchema.index({ 
  subject: 'text', 
  message: 'text',
  tags: 'text'
});

// Virtual for days since creation
feedbackSchema.virtual('daysSinceCreated').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for response time (if responded)
feedbackSchema.virtual('responseTime').get(function() {
  if (this.respondedAt) {
    return Math.floor((this.respondedAt - this.createdAt) / (1000 * 60 * 60 * 24));
  }
  return null;
});

module.exports = mongoose.model('Feedback', feedbackSchema);

