# 🛠️ BUP Bus Tracker – Backend (Server)

> Express.js API server powering the BUP Bus Tracker application.

---

## 📌 Project Overview

This is the **backend** of the **BUP Bus Tracker** – a RESTful API service developed to handle:

- 🔐 User authentication via Firebase Admin SDK
- 🧑‍💼 Role-based access control (Admin, Driver, Passenger)
- 📍 Live location tracking using Socket.io
- 🗺️ Route and schedule management
- 📨 Feedback collection and user registration workflow

> Built using **Node.js**, **Express.js**, **MongoDB**, and **Socket.io**.

---

## 🌐 API Base URL

```bash
https://bup-bus-tracker-api.onrender.com/api
```

---

## 🚀 Tech Stack (Backend)

| Tool / Library     | Purpose                                     |
| ------------------ | ------------------------------------------- |
| Express.js         | Web framework for building RESTful APIs     |
| MongoDB + Mongoose | NoSQL database and ODM                      |
| Firebase Admin SDK | Secure authentication and user verification |
| Socket.io          | Real-time communication (bus tracking)      |
| Multer             | File uploads (e.g., profile photo)          |
| JWT                | Auth tokens for secure route protection     |
| dotenv             | Environment variable management             |
| Nodemailer         | Email service integration (future scope)    |

---

## 📁 Folder Structure

```text
bup-bus-tracker/
├── server/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection setup
│   │   └── firebase.js           # Firebase Admin SDK initialization
│
│   ├── controllers/
│   │   ├── authController.js     # Register, login, token handling
│   │   ├── userController.js     # User management (approval, profile)
│   │   ├── routeController.js    # Bus route CRUD
│   │   ├── scheduleController.js # Schedule management
│   │   ├── locationController.js # Real-time location logic
│   │   └── feedbackController.js # Feedback submissions
│
│   ├── middlewares/
│   │   ├── authMiddleware.js     # JWT + role-based guards
│   │   ├── validateMiddleware.js # Request validation via express-validator
│   │   ├── errorHandler.js       # Central error handling
│   │   └── uploadMiddleware.js   # Multer config for file uploads
│
│   ├── models/
│   │   ├── User.js
│   │   ├── BusRoute.js
│   │   ├── Schedule.js
│   │   ├── LiveLocation.js
│   │   └── Feedback.js
│
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── routeRoutes.js
│   │   ├── scheduleRoutes.js
│   │   ├── locationRoutes.js
│   │   └── feedbackRoutes.js
│
│   ├── sockets/
│   │   └── locationSocket.js     # Socket.io config for live location updates
│
│   ├── utils/
│   │   ├── generateToken.js      # JWT generation
│   │   └── constants.js          # Reusable enums, roles, messages
│
│   ├── validators/
│   │   ├── authValidator.js
│   │   ├── userValidator.js
│   │   ├── routeValidator.js
│   │   ├── scheduleValidator.js
│   │   └── feedbackValidator.js
│
│   ├── app.js                    # Express app config (middleware, routes, error handler)
│   └── index.js                  # Entry point: server + Socket.io initialization
│
├── .env                          # Environment variables (DO NOT COMMIT)
├── .gitignore
├── package.json
├── yarn.lock
└── README.md

```

---

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`.

### `.env.example`

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/bup-bus-tracker

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_REFRESH_EXPIRES_IN=30d
JWT_ISSUER=bup-bus-tracker
JWT_AUDIENCE=bup-bus-tracker-users

# Firebase Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com
FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Client URLs (comma-separated for production)
CLIENT_URL=http://localhost:3000,http://localhost:3001

# API Documentation URL
API_DOCS_URL=/api/docs
```

> ⚠️ Don't forget to wrap `FIREBASE_PRIVATE_KEY` in double quotes and escape newlines.

---

## 🧪 Scripts

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `yarn`       | Install all dependencies              |
| `yarn dev`   | Start development server with nodemon |
| `yarn start` | Start production server               |

---

## 🧰 API Endpoints Overview

| Method | Endpoint                 | Description                          |
| ------ | ------------------------ | ------------------------------------ |
| POST   | `/api/auth/register`     | Register a user (pending approval)   |
| POST   | `/api/auth/login`        | Login and receive JWT                |
| GET    | `/api/users`             | List users (admin only)              |
| PUT    | `/api/users/approve/:id` | Approve user registration            |
| GET    | `/api/routes`            | Get all routes                       |
| POST   | `/api/routes`            | Add new route (admin only)           |
| POST   | `/api/location/start`    | Start sharing location (driver only) |
| POST   | `/api/location/stop`     | Stop sharing location                |
| GET    | `/api/location/live`     | Fetch active bus locations           |
| POST   | `/api/feedback`          | Submit feedback (passenger only)     |

---

## 🔐 Middleware & Security

- JWT-based authentication (`Authorization: Bearer <token>`)
- Role-based guards (Admin, Driver, Passenger)
- Firebase token verification on sensitive routes
- Input validation using Express Validator
- Passwords hashed using Bcrypt (if stored directly)

---

## 🔌 Realtime Communication (Socket.io)

- Event: `location-update`
- Used by driver clients to broadcast live bus coordinates
- Received by all connected clients for map updates

---

## 🧭 Developer Instructions

```bash
git clone https://github.com/yourusername/bup-bus-tracker.git
cd bup-bus-tracker/server
cp .env.example .env
yarn install
yarn dev
```

---

## 📧 Contact

For queries, suggestions, or access requests:

**Akm Tasdikul Islam**

- Email: [akmtasdikuulislam@gmail.com](mailto:akmtasdikuulislam@gmail.com)
- Github: [akmtasdikulislam](https://github.com/akmtasdikulislam)
- LinkedIn: [akmtasdikulislam](https://www.linkedin.com/in/akm-tasdikul-islam/)

**Muztaba Rafid**

- Email: [mdmahi.962005@gmail.com](mailto:mdmahi.962005@gmail.com)

---

## 📝 License

This backend is part of the **BUP Bus Tracker prototype**. It is designed for demonstration and internal academic purposes only.

All rights reserved by the contributors.

---

> _"Designed to modernize campus transportation through reliable, real-time connectivity."_
