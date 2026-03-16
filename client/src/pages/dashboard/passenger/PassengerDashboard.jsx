import { useEffect, useState } from "react";
import {
  PiBusDuotone,
  PiLineSegmentsDuotone,
  PiMagnifyingGlassDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import LiveBusMap from "../../../components/dashboard/passenger/LiveBusMap";
import PassengerInfo from "../../../components/dashboard/passenger/PassengerInfo";
import RecentTrips from "../../../components/dashboard/passenger/RecentTrips";
import RouteSchedules from "../../../components/dashboard/passenger/RouteSchedules";
import Header from "../../../components/common/Header";
import UpcomingBuses from "../../../components/dashboard/passenger/UpcomingBuses";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/");
  };

  const handleProfile = () => {
    // Navigate to profile page
    navigate("/passenger/profile");
  };

  const handleSettings = () => {
    // Navigate to settings page
    navigate("/passenger/settings");
  };

  const handleNotificationClick = () => {
    // Handle notification click
    console.log("Notification clicked");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/passenger/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleViewAllRoutes = () => {
    navigate("/passenger/routes");
  };

  const handleViewAllBuses = () => {
    navigate("/passenger/buses");
  };

  // Placeholder passenger data
  const passengerData = {
    name: "সারা খান",
    nameEn: "Sara Khan",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b9e0b9d5?w=150&h=150&fit=crop&crop=face",
    studentId: "BCSE-25-001",
    department: "Computer Science & Engineering",
    faculty: "Faculty of Science & Technology",
    phone: "+880 1712-345678",
    email: "sara.khan@student.bup.edu.bd",
    address: "Mirpur-12, Dhaka-1216",
    memberSince: "January 2023",
    totalTrips: 156,
    favoriteRoute: "BUP ↔ Savar",
    recentTrips: [
      {
        id: 1,
        route: "BUP → Savar",
        date: "Today",
        time: "08:30 AM",
        busNo: "BUP-001",
      },
      {
        id: 2,
        route: "Savar → BUP",
        date: "Yesterday",
        time: "04:15 PM",
        busNo: "BUP-002",
      },
      {
        id: 3,
        route: "BUP → Savar",
        date: "Yesterday",
        time: "01:30 PM",
        busNo: "BUP-003",
      },
    ],
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Glassomorphism */}
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      {/* Header */}
      <Header
        userType="passenger"
        pageTitle="Dashboard"
        notificationCount={3}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfile}
        onSettingsClick={handleSettings}
        onLogoutClick={handleLogout}
      />

      {/* Quick Navigation */}
      <div className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8`}>
        <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-white drop-shadow-lg">
              Explore BUP Transport
            </h2>
            <p className="text-sm text-gray-300 drop-shadow">
              Search, browse routes and buses with real-time information
            </p>
          </div>

          {/* Main Content Layout */}
          <div className="flex flex-col items-center justify-center gap-6 lg:flex-row">
            {/* Left Navigation Card */}
            <div className="flex-shrink-0">
              <button
                onClick={handleViewAllRoutes}
                className="group relative rounded-xl border border-white/40 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:from-green-500/30 hover:to-blue-500/30 hover:shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/30 p-2">
                    <PiLineSegmentsDuotone className="h-6 w-6 text-green-200" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">All Routes</div>
                    <div className="text-xs text-gray-300">
                      6 routes available
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>

            {/* Expanded Search Bar in the Middle */}
            <div className="w-full max-w-2xl flex-1">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <PiMagnifyingGlassDuotone className="absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search routes, buses, locations, or drivers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full rounded-xl px-12 py-4 text-lg text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                  />
                  <button
                    type="submit"
                    className={`absolute top-1/2 right-2 -translate-y-1/2 rounded-lg px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                  >
                    Search
                  </button>
                </div>
              </form>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSearchQuery("Savar")}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-white/20"
                >
                  Popular: Savar
                </button>
                <button
                  onClick={() => setSearchQuery("Mirpur")}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-white/20"
                >
                  Mirpur
                </button>
                <button
                  onClick={() => setSearchQuery("Uttara")}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-white/20"
                >
                  Uttara
                </button>
                <button
                  onClick={() => setSearchQuery("BUP-001")}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300 transition-colors hover:bg-white/20"
                >
                  BUP-001
                </button>
              </div>
            </div>

            {/* Right Navigation Card */}
            <div className="flex-shrink-0">
              <button
                onClick={handleViewAllBuses}
                className="group relative rounded-xl border border-white/40 bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:from-orange-500/30 hover:to-red-500/30 hover:shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500/30 p-2">
                    <PiBusDuotone className="h-6 w-6 text-orange-200" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">All Buses</div>
                    <div className="text-xs text-gray-300">8 buses active</div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8`}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column - Passenger Information */}
          <div className="lg:col-span-3">
            <PassengerInfo passengerData={passengerData} />
          </div>

          {/* Middle Column - Live Bus Map */}
          <div className="space-y-6 lg:col-span-6">
            <LiveBusMap />
            {/* Recent Trips Card */}
            <RecentTrips passengerData={passengerData} />
          </div>

          {/* Right Column - Schedules & Upcoming Buses */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Route Schedules */}
              <RouteSchedules />

              {/* Upcoming Buses */}
              <UpcomingBuses />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PassengerDashboard;
