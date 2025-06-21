// JWT generation
const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  const payload = {
    id: userId,
    role: role,
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: process.env.JWT_ISSUER || 'bup-bus-tracker',
    audience: process.env.JWT_AUDIENCE || 'bup-bus-tracker-users',
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const generateRefreshToken = (userId) => {
  const payload = {
    id: userId,
    type: 'refresh',
  };

  const options = {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
    issuer: process.env.JWT_ISSUER || 'bup-bus-tracker',
    audience: process.env.JWT_AUDIENCE || 'bup-bus-tracker-users',
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, options);
};

module.exports = {
  generateToken,
  generateRefreshToken,
};

