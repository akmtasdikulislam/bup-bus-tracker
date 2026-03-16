const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const routeRoutes = require('./routeRoutes');
const scheduleRoutes = require('./scheduleRoutes');
const locationRoutes = require('./locationRoutes');
const feedbackRoutes = require('./feedbackRoutes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/routes', routeRoutes);
router.use('/schedules', scheduleRoutes);
router.use('/location', locationRoutes);
router.use('/feedback', feedbackRoutes);

router.get('/', (req, res) => {
  res.json({
    name: 'BUP Bus Tracker API',
    version: '1.0.0',
    description: 'Real-time bus tracking system for BUP',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      routes: '/api/routes',
      schedules: '/api/schedules',
      location: '/api/location',
      feedback: '/api/feedback',
    },
    documentation: process.env.API_DOCS_URL || '/api/docs',
  });
});

module.exports = router;
