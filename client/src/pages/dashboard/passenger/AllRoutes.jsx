import { useState } from "react";
import {
  PiBusDuotone,
  PiClockDuotone,
  PiLineSegmentsDuotone,
  PiMapPinDuotone,
  PiMagnifyingGlassDuotone,
  PiPlusDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const AllRoutes = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock routes data
  const allRoutes = [
    {
      id: 1,
      name: "BUP ↔ Savar",
      description: "Main campus to Savar and back",
      distance: "25 km",
      duration: "45 min",
      frequency: "Every 30 min",
      operatingHours: "7:00 AM - 10:00 PM",
      activeBuses: 3,
      totalStops: 12,
      status: "active",
      averagePassengers: 38,
      peakHours: "8:00 AM - 9:00 AM, 5:00 PM - 6:00 PM",
      fare: "৳35",
    },
    {
      id: 2,
      name: "BUP ↔ Mirpur",
      description: "Main campus to Mirpur and back",
      distance: "18 km",
      duration: "35 min",
      frequency: "Every 25 min",
      operatingHours: "6:30 AM - 11:00 PM",
      activeBuses: 4,
      totalStops: 15,
      status: "active",
      averagePassengers: 42,
      peakHours: "7:30 AM - 8:30 AM, 5:30 PM - 6:30 PM",
      fare: "৳30",
    },
    {
      id: 3,
      name: "BUP ↔ Uttara",
      description: "Main campus to Uttara and back",
      distance: "22 km",
      duration: "40 min",
      frequency: "Every 35 min",
      operatingHours: "7:00 AM - 9:30 PM",
      activeBuses: 2,
      totalStops: 10,
      status: "active",
      averagePassengers: 35,
      peakHours: "8:00 AM - 9:00 AM, 4:30 PM - 5:30 PM",
      fare: "৳32",
    },
    {
      id: 4,
      name: "BUP ↔ Dhanmondi",
      description: "Main campus to Dhanmondi and back",
      distance: "15 km",
      duration: "30 min",
      frequency: "Every 40 min",
      operatingHours: "7:30 AM - 9:00 PM",
      activeBuses: 2,
      totalStops: 8,
      status: "active",
      averagePassengers: 28,
      peakHours: "8:30 AM - 9:30 AM, 5:00 PM - 6:00 PM",
      fare: "৳28",
    },
    {
      id: 5,
      name: "BUP ↔ Gulshan",
      description: "Main campus to Gulshan and back",
      distance: "20 km",
      duration: "38 min",
      frequency: "Every 45 min",
      operatingHours: "8:00 AM - 8:30 PM",
      activeBuses: 2,
      totalStops: 9,
      status: "active",
      averagePassengers: 32,
      peakHours: "8:00 AM - 9:00 AM, 5:30 PM - 6:30 PM",
      fare: "৳30",
    },
    {
      id: 6,
      name: "BUP ↔ Motijheel",
      description: "Main campus to Motijheel and back",
      distance: "28 km",
      duration: "50 min",
      frequency: "Every 50 min",
      operatingHours: "7:00 AM - 9:00 PM",
      activeBuses: 1,
      totalStops: 11,
      status: "maintenance",
      averagePassengers: 25,
      peakHours: "8:00 AM - 9:00 AM, 5:00 PM - 6:00 PM",
      fare: "৳38",
    },
  ];

  const handleBackToDashboard = () => {
    navigate("/passenger/dashboard");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/passenger/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleRouteClick = (routeId) => {
    navigate(`/passenger/routes/${routeId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "maintenance":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      case "offline":
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
      default:
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
    }
  };

  const filteredRoutes = allRoutes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || route.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
        pageTitle="All Routes"
        showBackButton={true}
        backButtonPath="/passenger/dashboard"
        onLogoutClick={handleLogout}
        customActions={
          <div className="flex items-center gap-2">
            <button
              className={`rounded-lg p-2 text-white transition-all duration-300 hover:scale-105 ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
              title="Search Routes"
            >
              <PiMagnifyingGlassDuotone className="h-5 w-5 drop-shadow-lg" />
            </button>
            <button
              className={`rounded-lg p-2 text-white transition-all duration-300 hover:scale-105 ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
              title="Add Route"
            >
              <PiPlusDuotone className="h-5 w-5 drop-shadow-lg" />
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <main className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8`}>
        {/* Header Section */}
        <div className={`mb-6 rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiLineSegmentsDuotone className="h-8 w-8 text-green-200" />
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  All Routes
                </h2>
                <p className="text-gray-300 drop-shadow">
                  {filteredRoutes.length} routes available
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/passenger/buses")}
              className={`px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
            >
              View All Buses
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["all", "active", "maintenance", "offline"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  selectedFilter === filter
                    ? "border border-white/40 bg-blue-500/60 text-white shadow-xl backdrop-blur-md"
                    : "border border-white/30 bg-white/20 text-gray-300 backdrop-blur-md hover:bg-white/30"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              onClick={() => handleRouteClick(route.id)}
              className={`cursor-pointer rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <PiLineSegmentsDuotone className="h-6 w-6 text-green-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                      {route.name}
                    </h3>
                    <p className="text-sm text-gray-300 drop-shadow">
                      {route.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(route.status)}`}
                >
                  {route.status}
                </span>
              </div>

              {/* Route Stats */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                  <span>{route.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiClockDuotone className="h-4 w-4 text-green-200" />
                  <span>{route.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiBusDuotone className="h-4 w-4 text-orange-200" />
                  <span>{route.activeBuses} buses</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiUsersDuotone className="h-4 w-4 text-purple-200" />
                  <span>{route.totalStops} stops</span>
                </div>
              </div>

              {/* Frequency & Fare */}
              <div className="mb-4 rounded-lg bg-white/10 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Frequency</span>
                  <span className="text-sm font-medium text-white">
                    {route.frequency}
                  </span>
                </div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Fare</span>
                  <span className="text-sm font-medium text-green-200">
                    {route.fare}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Avg. Passengers</span>
                  <span className="text-sm font-medium text-white">
                    {route.averagePassengers}
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="border-t border-white/20 pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-300">Operating Hours</span>
                  <span className="text-sm font-medium text-white">
                    {route.operatingHours}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Peak Hours</span>
                  <span className="text-xs text-gray-400">
                    {route.peakHours}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className={`rounded-xl py-12 text-center ${GLASS_PRESETS.DASHBOARD_CARD}`}>
            <PiLineSegmentsDuotone className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-white">
              No routes found
            </h3>
            <p className="text-gray-300">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllRoutes;
