import { createBrowserRouter } from "react-router";

// ── Public Pages ──────────────────────────────────────────────────────────────
import Home from "./pages/public/Home";
import ComingSoon from "./pages/public/ComingSoon";
import Map from "./pages/Map";

// ── Auth Pages ────────────────────────────────────────────────────────────────
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";

// ── Admin Pages ───────────────────────────────────────────────────────────────
import AdminDashboard from "./pages/dashboard/admin/AdminDashboard";
import AdminBusView from "./pages/dashboard/admin/AdminBusView";
import AdminRouteView from "./pages/dashboard/admin/AdminRouteView";
import BusesManagement from "./pages/dashboard/admin/BusesManagement";
import DriversManagement from "./pages/dashboard/admin/DriversManagement";
import ModeratorsManagement from "./pages/dashboard/admin/ModeratorsManagement";
import PassengersManagement from "./pages/dashboard/admin/PassengersManagement";
import RoutesManagement from "./pages/dashboard/admin/RoutesManagement";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSettings from "./pages/admin/AdminSettings";

// ── Driver Pages ──────────────────────────────────────────────────────────────
import DriverDashboard from "./pages/dashboard/driver/DriverDashboard";
import DriverProfile from "./pages/driver/DriverProfile";
import DriverSettings from "./pages/driver/DriverSettings";

// ── Moderator Pages ───────────────────────────────────────────────────────────
import ModeratorDashboard from "./pages/dashboard/moderator/ModeratorDashboard";
import ModeratorBusesManagement from "./pages/dashboard/moderator/ModeratorBusesManagement";
import ModeratorRoutesManagement from "./pages/dashboard/moderator/ModeratorRoutesManagement";
import ModeratorProfile from "./pages/dashboard/moderator/ModeratorProfile";
import ModeratorSettings from "./pages/dashboard/moderator/ModeratorSettings";

// ── Passenger Pages ───────────────────────────────────────────────────────────
import PassengerDashboard from "./pages/dashboard/passenger/PassengerDashboard";
import PassengerProfile from "./pages/dashboard/passenger/PassengerProfile";
import PassengerSettings from "./pages/dashboard/passenger/PassengerSettings";
import AllBuses from "./pages/dashboard/passenger/AllBuses";
import BusDetail from "./pages/dashboard/passenger/BusDetail";
import AllRoutes from "./pages/dashboard/passenger/AllRoutes";
import RouteDetail from "./pages/dashboard/passenger/RouteDetail";
import SearchResults from "./pages/dashboard/passenger/SearchResults";

// ─────────────────────────────────────────────────────────────────────────────

const router = createBrowserRouter([
  // ── Public ────────────────────────────────────────────────────────────────
  { path: "/", element: <Home /> },
  { path: "/map", element: <Map /> },
  { path: "/coming-soon", element: <ComingSoon /> },

  // ── Auth ──────────────────────────────────────────────────────────────────
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgot-password", element: <ForgotPassword /> },

  // ── Admin ─────────────────────────────────────────────────────────────────
  { path: "/admin", element: <AdminDashboard /> },
  { path: "/admin/profile", element: <AdminProfile /> },
  { path: "/admin/settings", element: <AdminSettings /> },
  { path: "/admin/passengers", element: <PassengersManagement /> },
  { path: "/admin/drivers", element: <DriversManagement /> },
  { path: "/admin/moderators", element: <ModeratorsManagement /> },
  { path: "/admin/buses", element: <BusesManagement /> },
  { path: "/admin/buses/view/:busId", element: <AdminBusView /> },
  { path: "/admin/routes", element: <RoutesManagement /> },
  { path: "/admin/routes/view/:routeId", element: <AdminRouteView /> },

  // ── Driver ────────────────────────────────────────────────────────────────
  { path: "/driver/dashboard", element: <DriverDashboard /> },
  { path: "/driver/profile", element: <DriverProfile /> },
  { path: "/driver/settings", element: <DriverSettings /> },

  // ── Moderator ─────────────────────────────────────────────────────────────
  { path: "/moderator", element: <ModeratorDashboard /> },
  { path: "/moderator/buses", element: <ModeratorBusesManagement /> },
  { path: "/moderator/routes", element: <ModeratorRoutesManagement /> },
  { path: "/moderator/profile", element: <ModeratorProfile /> },
  { path: "/moderator/settings", element: <ModeratorSettings /> },

  // ── Passenger ─────────────────────────────────────────────────────────────
  { path: "/passenger/dashboard", element: <PassengerDashboard /> },
  { path: "/passenger/profile", element: <PassengerProfile /> },
  { path: "/passenger/settings", element: <PassengerSettings /> },
  { path: "/passenger/search", element: <SearchResults /> },
  { path: "/passenger/buses", element: <AllBuses /> },
  { path: "/passenger/buses/:busId", element: <BusDetail /> },
  { path: "/passenger/routes", element: <AllRoutes /> },
  { path: "/passenger/routes/:routeId", element: <RouteDetail /> },
]);

export default router;
