# 🚌 BUP Bus Tracker

> Real-time Bus Tracking System for Bangladesh University of Professionals

## 📌 Project Info

- **Project Name:** BUP Bus Tracker
- **Project Duration:** 20 Days (05 June 2025 – 25 June 2025)

## ![Project Version](https://img.shields.io/badge/Version-1.0.0-blue.svg) ![Type](<https://img.shields.io/badge/Type-Prototype%20(Web--Based)-blue>) ![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue)

## 📍 Overview

**BUP Bus Tracker** is a real-time MERN-stack web application designed to help students and staff of **Bangladesh University of Professionals (BUP)** track university bus movements across Dhaka. This platform enables users to:

- View live location of campus buses.
- Explore available routes and schedules.
- Share live location voluntarily while on a bus.
- Securely register and log in with role-based access.
- Submit feedback and monitor service updates.

> ⚠️ **This is a prototype** developed by BUP students to demonstrate functionality. Upon approval, we plan to integrate it with BUP's official servers and expand to include mobile support and GPS hardware devices.

---

## 👥 Project Contributors

- **Akm Tasdikul Islam**  
  CSE Department (Batch 04), Faculty of Science and Technology, BUP

- **Muztaba Rafid Mahi**  
  Management Department (Batch 06), Faculty of Business Studies, BUP

---

## 🚀 Live Demo

> Coming soon on [Vercel](https://vercel.com/) (Frontend) and [Render](https://render.com/) (Backend)  
> Live API will be hosted via [Render](https://render.com/)

---

## ⚙️ Tech Stack

### Frontend

- **React.js (Vite)**: SPA framework for building fast UI
- **TailwindCSS + DaisyUI**: Utility-first CSS and prebuilt UI components
- **React Router v6**: Client-side routing
- **Firebase Authentication v9+**: Auth system
- **React Hook Form**: Form management and validation
- **React Hot Toast**: Elegant toast notifications
- **Google Maps API**: Map visualization
- **Socket.io Client**: Real-time communication
- **React Icons**: Iconography support

### Backend

- **Node.js + Express.js**: RESTful API with custom middleware
- **MongoDB Atlas + Mongoose**: Cloud NoSQL database
- **JWT + Firebase Admin SDK**: Auth token validation
- **Multer**: File uploads (user photos)
- **Bcrypt.js**: Password encryption
- **Socket.io**: Real-time location tracking
- **Nodemailer** _(planned)_: Notification emails
- **Express Validator**: Input validation

### DevOps & Tools

- **Yarn**: Dependency management
- **dotenv**: Environment configuration
- **Postman**: API testing
- **Sentry**: Error monitoring
- **GitHub**: Version control and collaboration

---

## 🔐 User Roles & Features

| Role          | Capabilities                                                 |
| ------------- | ------------------------------------------------------------ |
| **Admin**     | Approve users, manage routes & schedules, monitor feedback   |
| **Moderator** | Approve new users                                            |
| **Driver**    | Share live location, update trip status, view assigned route |
| **Passenger** | Track live buses, view routes/schedules, give feedback       |

---

## ✨ Core Features

- 🔐 **Role-Based Authentication** : Separate access for Admin, Driver, and Passenger with secure login via Firebase.

- 🗺️ **Live Bus Location Tracking** : Real-time tracking using Google Maps API and Socket.io. Drivers can start/stop location sharing from their dashboard.

- 🚌 **Bus Routes & Schedule Management** : View predefined bus routes across Dhaka with schedules for each.

- 🧾 **Registration System with Admin Approval** : New users must be approved by Admins before accessing the system.

- 🧭 **Passenger Dashboard** : Displays a list of all active buses along with their live map locations.

- 🧑‍✈️ **Driver Dashboard** : Allows drivers to toggle live location sharing.

- 📣 **Passenger Feedback Submission** : Feedback system for reporting issues or suggestions.

- ⚠️ **(Optional) Panic Button Feature** : An emergency button for passengers, to be implemented based on hardware integration.

- 💬 **(Optional) Chatbot** : For automated FAQs and assistance.

- 🪑 **(Optional) Seat Count Feature** : Future enhancement to track bus seating availability in real-time.

---

🧱 Project Structure

```bash
bup-bus-tracker/
├── client/                  # React Frontend
│   ├── src/
│   └── public/
├── server/                  # Node.js Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── middlewares/
├── README.md
└── .env                     # Environment variables
```

---

## 🧾 Database Schemas (Mongoose)

### `User`

```js
{
  name: String,
  email: { type: String, unique: true },
  phone: String,
  role: { type: String, enum: ["admin", "driver", "passenger"] },
  studentId: String,
  passwordHash: String,
  photoURL: String,
  approved: Boolean,
  createdAt: Date
}
```

### `BusRoute`

```js
{
  name: String,
  origin: String,
  destination: String,
  stops: [String],
  createdBy: { type: ObjectId, ref: "User" },
  createdAt: Date
}
```

### `Schedule`

```js
{
  routeId: { type: ObjectId, ref: "BusRoute" },
  departureTime: Date,
  arrivalTime: Date,
  frequency: String,
  busNo: String,
  driverId: { type: ObjectId, ref: "User" },
  status: { type: String, enum: ["on-time", "delayed", "cancelled"] }
}
```

### `LiveLocation`

```js
{
  userId: { type: ObjectId, ref: "User" },
  routeId: { type: ObjectId, ref: "BusRoute" },
  coordinates: { lat: Number, lng: Number },
  timestamp: Date,
  isActive: Boolean
}
```

### `Feedback`

```js
{
  userId: { type: ObjectId, ref: "User" },
  message: String,
  createdAt: Date
}
```

---

## 🔗 API Documentation

### Base URL

```
https://bup-bus-api.onrender.com/api
```

### Endpoints Summary

#### 🔐 Auth

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Register a new user   |
| POST   | `/auth/login`    | Login and return JWT  |
| GET    | `/auth/me`       | Get current user data |

#### 👨‍💼 Admin

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| GET    | `/users`             | Get all users |
| PUT    | `/users/approve/:id` | Approve user  |
| DELETE | `/users/:id`         | Delete user   |

#### 🚌 Bus Routes

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | `/routes`     | Get all routes |
| POST   | `/routes`     | Create a route |
| PUT    | `/routes/:id` | Edit a route   |
| DELETE | `/routes/:id` | Remove a route |

#### 📍 Live Location

| Method | Endpoint          | Description              |
| ------ | ----------------- | ------------------------ |
| POST   | `/location/start` | Start sharing            |
| POST   | `/location/stop`  | Stop sharing             |
| GET    | `/location/live`  | Get active bus locations |

#### 💬 Feedback

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/feedback` | Submit feedback                |
| GET    | `/feedback` | View all feedback (admin only) |

---

## 🎨 UI/UX Design

- **Color Palette**: #2c3e50 (Dark Blue), #3498db (Light Blue)
- **Typography**: Lato, Montserrat
- **Icons**: FontAwesome
- **Layout**: Responsive, mobile-first

---

## 🗂️ Pages & Components

### 🌐 Public Pages

- Landing Page
  - Hero Section with intro and CTA buttons
  - Static Live Map Preview (demo bus markers)
  - Features Showcase (tracking, alerts, schedule)
  - About Us Section
  - Footer with Contact Info, Terms, Privacy
- Login Page
  - Email & Password Fields
  - Role Dropdown (Driver/Passenger)
  - Forgot Password Link
  - Redirect on Success
- Registration Page
  - Full Name, Email, Phone, Student ID
  - Role Selection (Driver or Passenger)
  - Password & Confirm Password
  - Profile Photo Upload (optional)
  - Terms & Conditions Checkbox
  - Submit for Admin Approval

### 👤 Passenger Dashboard

- Dashboard Home
  - Interactive Live Map (Google Maps API)
  - Active Buses Panel (Cards with Route, Bus No., ETA)
  - Schedule Viewer (Filter by route or day)
  - Submit Feedback Button (Floating/Fixed)
- Profile Page
  - View/Edit Profile Info
  - Change Password

### 🚍 Driver Dashboard

- Dashboard Home
  - Assigned Route Display
  - Start/Stop Location Sharing Button
  - Trip Status Selector (On-time, Delayed, Cancelled)
- Profile Page
  - View/Edit Profile Info

### 🛡️ Admin Panel

- Admin Dashboard
  - System Overview (Active users, buses, routes)
- User Management Page
  - Pending Registration Table (Approve/Reject)
  - Role Management (Admin/Moderator Upgrades)
- Route Management Page
  - View/Add/Edit/Delete Routes
  - Interactive Map to Add Stops & Destinations
- Schedule Management Page
  - View/Add/Edit/Delete Schedules
  - Assign Driver to Route
  - Calendar Integration (optional)
- Feedback Inbox
  - View & Categorize User Feedback (Resolved, Pending)
- Admin Settings
  - System Settings, JWT Expiry, Timeout Configs

### ⚙️ Forms

- Login Form
- Registration Form
- Edit Profile Form
- Change Password Form
- Feedback Submission Form
- Route Creation Form (Admin)
- Schedule Creation Form (Admin)
- User Approval Form (Admin)
- Live Location Start Form (Driver)
- Trip Status Update Form (Driver)

### 🧩 Modals & Components

- Navbar (Dynamic by Role)
- Sidebar Navigation (Dashboard)
- MapView Component (Google Maps Integration)
- BusCard Component (Bus Info with ETA)
- Feedback Modal (Passenger)
- User Approval Modal (Admin)
- Toast Notifications (React Hot Toast)
- Loader/Spinner Component
- RoutePolyline Overlay (Map)
- StatusDropdown (Trip Status)
- ToggleButton (Live Location Sharing)

### 📱 Optional/Future Enhancements

- Panic Button (Mobile UI)
- Chatbot Widget
- Seat Tracker Overlay
- ETA Push Notification Opt-in

## 📸 Screenshots

Coming soon after UI polishing and deployment

---

## 🧭 Project Status

| Feature                  | Status         |
| ------------------------ | -------------- |
| Core Functionalities     | 🚧 In Progress |
| Admin Dashboard          | 🚧 In Progress |
| Real-Time Updates        | 🚧 In Progress |
| Deployment               | 🚧 In Progress |
| Mobile App Extension     | 🔜 Planned     |
| GPS Hardware Integration | 🔜 Planned     |

---

## 📝 Future Enhancements

The system is currently under demonstration for potential integration with BUP's official services.  
Future plans include:

- A dedicated **mobile app** version
- Integration with **hardware-based bus tracking devices**
- Deployment into BUP's official infrastructure upon approval

---

## 📦 Installation (for local development)

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bup-bus-tracker.git
   cd bup-bus-tracker
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Setup environment:

   - Copy `.env.example` to `.env`
   - Add Firebase, MongoDB URI, JWT secret, etc.

4. Run development servers:

   ```bash
   # Frontend
   yarn dev

   # Backend (in separate terminal)
   yarn server
   ```

---

## 🔐 Environment Variables

#### Backend .env

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

#### Frontend .env

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🤝 Contribution Guidelines

Since this project is part of a university prototype, external contributions are currently limited. For inquiries or collaboration, please reach out via email.

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

## 📜 License

This project is developed solely for demonstration purposes at Bangladesh University of Professionals. All rights reserved by the developers.

---

## 📝 Acknowledgements

- Bangladesh University of Professionals (BUP)
- Google Maps Platform
- Firebase by Google
- MongoDB Atlas
- Socket.io

_"Revolutionizing campus transportation through real-time tracking and smart mobility solutions."_
