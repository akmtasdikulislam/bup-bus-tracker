// Reusable enums, roles, messages
const USER_ROLES = {
  ADMIN: 'admin',
  DRIVER: 'driver',
  STUDENT: 'student',
};

const SCHEDULE_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
};

const FEEDBACK_TYPES = {
  COMPLAINT: 'complaint',
  SUGGESTION: 'suggestion',
  COMPLIMENT: 'compliment',
  BUG_REPORT: 'bug-report',
  GENERAL: 'general',
};

const FEEDBACK_CATEGORIES = {
  SERVICE_QUALITY: 'service-quality',
  DRIVER_BEHAVIOR: 'driver-behavior',
  BUS_CONDITION: 'bus-condition',
  SCHEDULE: 'schedule',
  APP_ISSUE: 'app-issue',
  ROUTE: 'route',
  SAFETY: 'safety',
  OTHER: 'other',
};

const FEEDBACK_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

const LOCATION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  OFFLINE: 'offline',
};

const TRIP_STATUS = {
  NOT_STARTED: 'not-started',
  IN_TRANSIT: 'in-transit',
  AT_STOP: 'at-stop',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const DAYS_OF_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const SUCCESS_MESSAGES = {
  USER_REGISTERED: 'User registered successfully',
  USER_LOGGED_IN: 'Login successful',
  USER_APPROVED: 'User approved successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  ROUTE_CREATED: 'Route created successfully',
  ROUTE_UPDATED: 'Route updated successfully',
  ROUTE_DELETED: 'Route deleted successfully',
  SCHEDULE_CREATED: 'Schedule created successfully',
  SCHEDULE_UPDATED: 'Schedule updated successfully',
  SCHEDULE_DELETED: 'Schedule deleted successfully',
  LOCATION_UPDATED: 'Location updated successfully',
  TRACKING_STOPPED: 'Tracking stopped successfully',
  FEEDBACK_SUBMITTED: 'Feedback submitted successfully',
  FEEDBACK_UPDATED: 'Feedback status updated successfully',
};

const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found',
  USER_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid credentials',
  ACCOUNT_PENDING: 'Account pending approval',
  ACCOUNT_NOT_APPROVED: 'Account not approved',
  ACCESS_TOKEN_REQUIRED: 'Access token required',
  INVALID_TOKEN: 'Invalid token',
  TOKEN_EXPIRED: 'Token expired',
  ACCESS_DENIED: 'Access denied',
  ROUTE_NOT_FOUND: 'Route not found',
  SCHEDULE_NOT_FOUND: 'Schedule not found',
  LOCATION_NOT_FOUND: 'Location not found',
  FEEDBACK_NOT_FOUND: 'Feedback not found',
  VALIDATION_FAILED: 'Validation failed',
  SERVER_ERROR: 'Server error',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  FILE_UPLOAD_FAILED: 'File upload failed',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File too large',
};

const VALIDATION_PATTERNS = {
  EMAIL: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  TIME_24H: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
  COORDINATE_LAT: { min: -90, max: 90 },
  COORDINATE_LNG: { min: -180, max: 180 },
};

const DEFAULT_VALUES = {
  PAGE_SIZE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES_PER_FEEDBACK: 3,
  LOCATION_UPDATE_INTERVAL: 30, // seconds
  LOCATION_EXPIRY_TIME: 5 * 60 * 1000, // 5 minutes in milliseconds
  PASSWORD_MIN_LENGTH: 6,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutes
};

module.exports = {
  USER_ROLES,
  SCHEDULE_STATUS,
  FEEDBACK_TYPES,
  FEEDBACK_CATEGORIES,
  FEEDBACK_STATUS,
  PRIORITY_LEVELS,
  LOCATION_STATUS,
  TRIP_STATUS,
  DAYS_OF_WEEK,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  VALIDATION_PATTERNS,
  DEFAULT_VALUES,
};

