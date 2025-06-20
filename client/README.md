# 🖥️ BUP Bus Tracker – Frontend (Client)

> React-based Single Page Application (SPA) for real-time tracking of BUP campus buses.

---

## 📌 Project Overview

This is the **frontend** of the **BUP Bus Tracker** – a prototype web application developed for the students and staff of **Bangladesh University of Professionals (BUP)** to:

- 📍 View live bus locations on Google Maps
- 🕒 Access routes and schedules
- 🧾 Register and log in based on user roles (admin, driver, passenger)
- 🚌 Allow drivers to share real-time location
- 💬 Submit and view feedback

> ⚠️ This is a **demo prototype** developed by BUP students. Pending approval, we plan to integrate it with the university’s official systems, add mobile support, and connect with physical GPS hardware.

---

## 🌐 Live URL

- **Frontend Deployment**: [https://bup-bus-tracker.vercel.app](https://bup-bus-tracker.vercel.app)

---

## 🚀 Tech Stack (Frontend)

| Tool / Library          | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| React (Vite)            | Modern SPA framework                          |
| TailwindCSS + DaisyUI   | Styling with utility-first CSS and components |
| React Router v6         | Routing system for SPAs                       |
| Firebase Authentication | Email/password auth & token management        |
| Google Maps API         | Real-time map visualization                   |
| Socket.io Client        | Real-time data sync (bus tracking)            |
| React Hook Form         | Form handling and validation                  |
| React Hot Toast         | Notifications & user feedback                 |
| React Icons             | Clean icon support                            |

---

## 📁 Folder Structure

```text
M:\bup-bus-tracker\client\
├── node_modules/                           # Dependencies (excluded from listing)
├── public/                                # Static assets
│   └── favicon.ico                        # Website favicon
├── src/                                   # Source code
│   ├── api/                              # API related files
│   ├── assets/                           # Static assets
│   │   ├── images/                       # Image files
│   │   │   ├── bup-cover.jpg            # BUP cover image
│   │   │   └── developers/               # Developer photos
│   │   │       ├── akm-tasdikul-islam.png
│   │   │       └── muztaba-rafid.png
│   │   ├── logo/                         # Logo files
│   │   │   └── bup-bus-tracker-logo.png # Main logo
│   │   └── styles/                       # CSS files
│   │       ├── global.css               # Global styles
│   │       └── index.css                # Main CSS file
│   ├── components/                       # React components
│   │   ├── common/                       # Common components
│   │   ├── maps/                         # Map components
│   │   └── ui/                          # UI components
│   ├── contexts/                         # React contexts
│   │   ├── AuthContext.jsx              # Authentication context
│   │   ├── Role.Context.jsx             # Role management context
│   │   └── ToastContext.jsx             # Toast notification context
│   ├── forms/                            # Form components
│   │   ├── admin/                        # Admin forms
│   │   ├── auth/                         # Auth forms
│   │   ├── driver/                       # Driver forms
│   │   └── passenger/                    # Passenger forms
│   ├── hooks/                            # Custom React hooks
│   │   ├── useAuth.js                   # Authentication hook
│   │   ├── useRole.js                   # Role management hook
│   │   └── useToast.js                  # Toast notification hook
│   ├── layouts/                          # Layout components
│   ├── lib/                              # Utility libraries
│   │   └── firebase.js                  # Firebase configuration
│   ├── modals/                           # Modal components
│   ├── pages/                            # Page components
│   │   ├── admin/                        # Admin pages
│   │   ├── driver/                       # Driver pages
│   │   ├── moderator/                    # Moderator pages
│   │   ├── passenger/                    # Passenger pages
│   │   └── public/                       # Public pages
│   ├── Routes/                           # Routing configuration
│   ├── services/                         # API services
│   ├── utils/                            # Utility functions
│   ├── .env                             # Environment variables
│   ├── .env.example                     # Environment variables template
│   ├── App.jsx                          # Main App component
│   ├── main.jsx                         # Application entry point
│   └── Routes.jsx                       # Main routing configuration
├── .prettierrc                          # Prettier configuration
├── eslint.config.js                     # ESLint configuration
├── index.html                           # Main HTML file
├── package.json                         # Project dependencies & scripts
├── README.md                            # Project documentation
├── vite.config.js                       # Vite configuration
└── yarn.lock                            # Yarn lockfile
```

---

## 🔐 Environment Variables

You need to create a `.env` file based on `.env.example`.

### `.env.example`

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GOOGLE_MAPS_API_KEY=
VITE_BACKEND_API_URL=http://localhost:5000/api/
```

---

## 🧪 Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `yarn install` | Install dependencies              |
| `yarn start`   | Start dev server with host access |
| `yarn dev`     | Start dev server (localhost:5173) |
| `yarn build`   | Build production files            |
| `yarn preview` | Preview production locally        |
| `yarn lint`    | Lint source code (ESLint)         |

---

## 🔒 Role-Based Routing

| Role        | Dashboard Path     | Features Included                        |
| ----------- | ------------------ | ---------------------------------------- |
| Admin       | `/admin`           | User approval, route/schedule management |
| Driver      | `/driver`          | Start/stop location sharing, trip status |
| Passenger   | `/passenger`       | Track buses, send feedback               |
| Public User | `/`, `/login` etc. | Home, Auth pages                         |

Routing is protected via custom hooks and `ProtectedRoute` components.

---

## 🧰 Core Context Providers & Hooks

- `AuthContext` → Manages Firebase auth state
- `RoleContext` → Fetches and stores user role from backend
- `ToastContext` → Global toast notifications (`react-hot-toast`)
<!-- - `LiveLocationContext` (optional) → Manages live bus coordinates
- `useAdminGuard`, `useDriverGuard`, `usePassengerGuard` → Role-based route protection
- `useFormFields`, `useFetch` → Form/input helpers and API fetching -->

---

## 🎯 Features (Frontend Side)

- 🛠️ Auth system with registration, login, approval handling
- 🗺️ Google Maps live bus tracking via socket events
- 📆 Role-based dashboards with smart UI states
- 💬 Feedback submission
- 🔔 Toast notifications for all actions
- 🌐 Responsive UI for desktop and mobile

---

## 💡 Design Highlights

- Fully responsive layout using Tailwind’s grid/flex system
- Dynamic dashboards based on user role
- Component-driven architecture (UI, Forms, Modals)
- Centralized styling + theming via Tailwind config

---

## 🧭 Developer Instructions

1. **Clone & Setup:**

```bash
git clone https://github.com/yourusername/bup-bus-tracker.git
cd bup-bus-tracker/client
cp .env.example .env
yarn install
```

2. **Start Development:**

```bash
yarn dev
```

3. **Build for Production:**

```bash
yarn build
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

This frontend project is part of the **BUP Bus Tracker prototype** and is intended solely for demonstration purposes within Bangladesh University of Professionals.

All rights reserved by the contributors.

---

## 📝 Acknowledgements

- Bangladesh University of Professionals (BUP)
- Google Maps Platform
- Firebase by Google
- Socket.io

---

> _"Enhancing BUP’s transportation system through real-time technology and user-first design."_
