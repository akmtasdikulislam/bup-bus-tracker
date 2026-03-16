const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: function() {
      return !this.firebaseUid;  
    },
    minlength: [6, 'Password must be at least 6 characters'],
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true,  
  },
  role: {
    type: String,
    enum: ['admin', 'driver', 'student'],
    required: [true, 'Role is required'],
  },
  studentId: {
    type: String,
    required: function() {
      return this.role === 'student';
    },
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'],
  },
  profilePicture: {
    type: String,
    default: null,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
    default: null,
  },
  fcmToken: {
    type: String,
    default: null,
  },
   
  personalInfo: {
    fullName: { type: String, trim: true },  
    fullNameEn: { type: String, trim: true },  
    dateOfBirth: { type: Date },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'other'] 
    },
  },
   
  academicInfo: {
    department: { type: String, trim: true },
    semester: { type: String, trim: true },
    session: { type: String, trim: true },
  },
   
  addressInfo: {
    presentAddress: { type: String, trim: true },
    permanentAddress: { type: String, trim: true },
    emergencyContact: { type: String, trim: true },
    emergencyPhone: { 
      type: String, 
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid emergency phone number']
    },
  },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
    language: {
      type: String,
      default: 'en',
      enum: ['en', 'bn'],
    },
    allowNotifications: { type: Boolean, default: true },
  },
}, {
  timestamps: true,
});

userSchema.index({ role: 1 });
userSchema.index({ isApproved: 1 });

userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    studentId: this.studentId,
    phone: this.phone,
    profilePicture: this.profilePicture,
    isApproved: this.isApproved,
    lastLogin: this.lastLogin,
  };
});

module.exports = mongoose.model('User', userSchema);

