// Entry point: server + Socket.io initialization
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const setupLocationSocket = require('./sockets/locationSocket');

// Connect to MongoDB
connectDB();

// Get port from environment
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.CLIENT_URL?.split(',') || []
      : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// Setup location socket handlers
setupLocationSocket(io);

// Make io accessible to routes/controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 BUP Bus Tracker Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Server listening on port ${PORT}`);
  console.log(`🔗 API URL: http://localhost:${PORT}/api`);
  console.log(`📊 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔌 Socket.io enabled for real-time updates`);
  console.log(`⏰ Started at: ${new Date().toISOString()}\n`);
});

// Export server for testing
module.exports = server;

