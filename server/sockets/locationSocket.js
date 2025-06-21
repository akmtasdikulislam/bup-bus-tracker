// Socket.io config for live location updates
const { authenticateToken } = require('../middlewares/authMiddleware');
const LiveLocation = require('../models/LiveLocation');
const jwt = require('jsonwebtoken');

const setupLocationSocket = (io) => {
  // Middleware to authenticate socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const User = require('../models/User');
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user || !user.isApproved) {
        return next(new Error('Authentication error: Invalid or unapproved user'));
      }

      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.user.name} (${socket.user.role}) - Socket ID: ${socket.id}`);

    // Join user to appropriate rooms based on role
    if (socket.user.role === 'driver') {
      socket.join('drivers');
    } else if (socket.user.role === 'student') {
      socket.join('students');
    } else if (socket.user.role === 'admin') {
      socket.join('admins');
    }

    // Driver location updates
    socket.on('locationUpdate', async (data) => {
      try {
        if (socket.user.role !== 'driver') {
          socket.emit('error', { message: 'Only drivers can send location updates' });
          return;
        }

        const { scheduleId, latitude, longitude, heading, speed, passengers } = data;

        // Validate required fields
        if (!scheduleId || !latitude || !longitude) {
          socket.emit('error', { message: 'Missing required location data' });
          return;
        }

        // Update or create location record
        let location = await LiveLocation.findOne({ scheduleId });
        
        if (location) {
          location.latitude = latitude;
          location.longitude = longitude;
          location.heading = heading || 0;
          location.speed = speed || 0;
          location.lastUpdated = new Date();
          
          if (passengers) {
            location.passengers.onBoard = passengers.onBoard || 0;
            location.passengers.lastUpdated = new Date();
          }
        } else {
          location = new LiveLocation({
            scheduleId,
            driverId: socket.user._id,
            latitude,
            longitude,
            heading: heading || 0,
            speed: speed || 0,
            passengers: {
              onBoard: passengers?.onBoard || 0,
            },
          });
        }

        await location.save();

        // Broadcast location update to all connected clients
        const locationUpdate = {
          scheduleId,
          latitude,
          longitude,
          heading: location.heading,
          speed: location.speed,
          passengers: location.passengers,
          timestamp: location.lastUpdated,
          driverName: socket.user.name,
        };

        // Emit to all users
        io.emit('busLocationUpdate', locationUpdate);
        
        // Emit to specific rooms
        io.to('students').emit('busLocationUpdate', locationUpdate);
        io.to('admins').emit('busLocationUpdate', locationUpdate);

        // Acknowledge the driver
        socket.emit('locationUpdateAck', { 
          success: true, 
          message: 'Location updated successfully',
          timestamp: location.lastUpdated,
        });

      } catch (error) {
        console.error('Location update error:', error);
        socket.emit('error', { message: 'Failed to update location' });
      }
    });

    // Driver trip status updates
    socket.on('tripStatusUpdate', async (data) => {
      try {
        if (socket.user.role !== 'driver') {
          socket.emit('error', { message: 'Only drivers can update trip status' });
          return;
        }

        const { scheduleId, status, nearestStop } = data;

        const location = await LiveLocation.findOne({ 
          scheduleId, 
          driverId: socket.user._id 
        });

        if (!location) {
          socket.emit('error', { message: 'Location tracking not found' });
          return;
        }

        location.tripStatus = status;
        if (nearestStop) {
          location.nearestStop = nearestStop;
        }
        location.lastUpdated = new Date();

        await location.save();

        // Broadcast trip status update
        io.emit('tripStatusUpdate', {
          scheduleId,
          status,
          nearestStop,
          timestamp: location.lastUpdated,
        });

        socket.emit('tripStatusUpdateAck', { 
          success: true, 
          message: 'Trip status updated successfully' 
        });

      } catch (error) {
        console.error('Trip status update error:', error);
        socket.emit('error', { message: 'Failed to update trip status' });
      }
    });

    // Subscribe to specific bus updates
    socket.on('subscribeToBus', (scheduleId) => {
      if (scheduleId) {
        socket.join(`bus-${scheduleId}`);
        socket.emit('subscribed', { scheduleId, message: 'Subscribed to bus updates' });
      }
    });

    // Unsubscribe from bus updates
    socket.on('unsubscribeFromBus', (scheduleId) => {
      if (scheduleId) {
        socket.leave(`bus-${scheduleId}`);
        socket.emit('unsubscribed', { scheduleId, message: 'Unsubscribed from bus updates' });
      }
    });

    // Get active buses (for admins and students)
    socket.on('getActiveBuses', async () => {
      try {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        
        const activeBuses = await LiveLocation.find({
          lastUpdated: { $gte: fiveMinutesAgo },
          status: 'active',
        })
        .populate({
          path: 'scheduleId',
          populate: {
            path: 'routeId',
            select: 'routeName startPoint endPoint',
          },
        })
        .populate('driverId', 'name');

        socket.emit('activeBuses', activeBuses);
      } catch (error) {
        console.error('Get active buses error:', error);
        socket.emit('error', { message: 'Failed to get active buses' });
      }
    });

    // Emergency alert (drivers can send, all receive)
    socket.on('emergencyAlert', async (data) => {
      try {
        const { scheduleId, message, location } = data;
        
        const alert = {
          scheduleId,
          driverId: socket.user._id,
          driverName: socket.user.name,
          message,
          location,
          timestamp: new Date(),
          type: 'emergency',
        };

        // Broadcast emergency alert to all users
        io.emit('emergencyAlert', alert);
        
        // Send to admins with high priority
        io.to('admins').emit('priorityAlert', alert);

        console.log(`Emergency alert from ${socket.user.name}: ${message}`);
        
        socket.emit('emergencyAlertAck', { 
          success: true, 
          message: 'Emergency alert sent successfully' 
        });
      } catch (error) {
        console.error('Emergency alert error:', error);
        socket.emit('error', { message: 'Failed to send emergency alert' });
      }
    });

    // Handle disconnection
    socket.on('disconnect', async (reason) => {
      console.log(`User disconnected: ${socket.user.name} - Reason: ${reason}`);
      
      // If driver disconnects, mark their location as inactive
      if (socket.user.role === 'driver') {
        try {
          await LiveLocation.updateMany(
            { driverId: socket.user._id },
            { 
              status: 'offline',
              lastUpdated: new Date(),
            }
          );
          
          // Notify other users that driver went offline
          io.emit('driverOffline', {
            driverId: socket.user._id,
            driverName: socket.user.name,
            timestamp: new Date(),
          });
        } catch (error) {
          console.error('Error updating driver offline status:', error);
        }
      }
    });

    // Ping/Pong for connection health
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date() });
    });
  });

  // Periodic cleanup of stale location data
  setInterval(async () => {
    try {
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
      
      // Mark old locations as inactive
      await LiveLocation.updateMany(
        { 
          lastUpdated: { $lte: tenMinutesAgo },
          status: 'active',
        },
        { status: 'inactive' }
      );
      
      // Delete very old location records (older than 24 hours)
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      await LiveLocation.deleteMany({
        lastUpdated: { $lte: twentyFourHoursAgo },
      });
      
    } catch (error) {
      console.error('Location cleanup error:', error);
    }
  }, 5 * 60 * 1000); // Run every 5 minutes

  return io;
};

module.exports = setupLocationSocket;

