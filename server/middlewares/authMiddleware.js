// JWT + role-based guards
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (!user.isApproved) {
      return res.status(403).json({ message: 'Account not approved' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Access denied. Required roles: ${roles.join(', ')}` 
      });
    }

    next();
  };
};

// Admin only middleware
const adminOnly = authorizeRoles('admin');

// Driver only middleware
const driverOnly = authorizeRoles('driver');

// Student only middleware
const studentOnly = authorizeRoles('student');

// Driver or Admin middleware
const driverOrAdmin = authorizeRoles('driver', 'admin');

module.exports = {
  authenticateToken,
  authorizeRoles,
  adminOnly,
  driverOnly,
  studentOnly,
  driverOrAdmin,
};

