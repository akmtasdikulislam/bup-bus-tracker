 
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const connectDB = require('./config/db');
const setupLocationSocket = require('./sockets/locationSocket');

connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

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

setupLocationSocket(io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(PORT, () => {
  console.log(`\n🚀 BUP Bus Tracker Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Server listening on port ${PORT}`);
  console.log(`🔗 API URL: http: 
  console.log(`📊 Health Check: http: 
  console.log(`🔌 Socket.io enabled for real-time updates`);
  console.log(`⏰ Started at: ${new Date().toISOString()}\n`);
});

module.exports = server;

