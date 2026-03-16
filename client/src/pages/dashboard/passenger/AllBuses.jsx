import { useState } from "react";
import {
  PiBusDuotone,
  PiClockDuotone,
  PiMagnifyingGlassDuotone,
  PiMapPinDuotone,
  PiPlusDuotone,
  PiUserDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const AllBuses = () => {
  const navigate = useNavigate();
  const [searchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock buses data
  const allBuses = [
    {
      id: 1,
      busNo: "BUP-001",
      route: "BUP ↔ Savar",
      currentLocation: "Savar Bus Stand",
      nextStop: "Savar Bazar",
      eta: "5 min",
      passengers: 35,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ রহিম উদ্দিন",
      driverPhone: "+880 1712-345678",
      lastMaintenance: "2024-01-10",
      totalTrips: 156,
      avgRating: 4.5,
    },
    {
      id: 2,
      busNo: "BUP-002",
      route: "BUP ↔ Savar",
      currentLocation: "BUP Main Gate",
      nextStop: "Ashulia",
      eta: "8 min",
      passengers: 28,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ আব্দুল কাদের",
      driverPhone: "+880 1712-345679",
      lastMaintenance: "2024-01-08",
      totalTrips: 142,
      avgRating: 4.3,
    },
    {
      id: 3,
      busNo: "BUP-003",
      route: "BUP ↔ Mirpur",
      currentLocation: "Mirpur-10",
      nextStop: "Mirpur-12",
      eta: "3 min",
      passengers: 42,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ করিম আহমেদ",
      driverPhone: "+880 1712-345680",
      lastMaintenance: "2024-01-12",
      totalTrips: 198,
      avgRating: 4.7,
    },
    {
      id: 4,
      busNo: "BUP-004",
      route: "BUP ↔ Mirpur",
      currentLocation: "Kazipara",
      nextStop: "Shewrapara",
      eta: "6 min",
      passengers: 38,
      capacity: 45,
      status: "delayed",
      driver: "মোঃ জহির উদ্দিন",
      driverPhone: "+880 1712-345681",
      lastMaintenance: "2024-01-05",
      totalTrips: 134,
      avgRating: 4.2,
    },
    {
      id: 5,
      busNo: "BUP-005",
      route: "BUP ↔ Uttara",
      currentLocation: "Uttara Sector 4",
      nextStop: "Uttara Sector 7",
      eta: "4 min",
      passengers: 28,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ সালিম হোসেন",
      driverPhone: "+880 1712-345682",
      lastMaintenance: "2024-01-15",
      totalTrips: 89,
      avgRating: 4.6,
    },
    {
      id: 6,
      busNo: "BUP-006",
      route: "BUP ↔ Uttara",
      currentLocation: "Depot",
      nextStop: "Maintenance",
      eta: "N/A",
      passengers: 0,
      capacity: 45,
      status: "maintenance",
      driver: "মোঃ আল আমিন",
      driverPhone: "+880 1712-345683",
      lastMaintenance: "2024-01-14",
      totalTrips: 167,
      avgRating: 4.4,
    },
    {
      id: 7,
      busNo: "BUP-007",
      route: "BUP ↔ Dhanmondi",
      currentLocation: "Dhanmondi 27",
      nextStop: "Science Lab",
      eta: "7 min",
      passengers: 32,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ নাসির উদ্দিন",
      driverPhone: "+880 1712-345684",
      lastMaintenance: "2024-01-09",
      totalTrips: 123,
      avgRating: 4.1,
    },
    {
      id: 8,
      busNo: "BUP-008",
      route: "BUP ↔ Gulshan",
      currentLocation: "Gulshan 2",
      nextStop: "Gulshan 1",
      eta: "5 min",
      passengers: 26,
      capacity: 45,
      status: "on-time",
      driver: "মোঃ শফিক উল্লাহ",
      driverPhone: "+880 1712-345685",
      lastMaintenance: "2024-01-11",
      totalTrips: 98,
      avgRating: 4.5,
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  const handleBusClick = (busId) => {
    navigate(`/passenger/buses/${busId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      case "maintenance":
        return "bg-orange-500/30 text-orange-200 border-orange-300/50";
      case "offline":
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
      default:
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
    }
  };

  const getOccupancyColor = (passengers, capacity) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return "text-red-300";
    if (percentage >= 70) return "text-yellow-300";
    return "text-green-300";
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-300";
    if (rating >= 4.0) return "text-yellow-300";
    return "text-orange-300";
  };

  const filteredBuses = allBuses.filter((bus) => {
    const matchesSearch =
      bus.busNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.driver.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || bus.status === selectedFilter;
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
        pageTitle="All Buses"
        showBackButton={true}
        backButtonPath="/passenger/dashboard"
        onLogoutClick={handleLogout}
        customActions={
          <div className="flex items-center gap-2">
            <button
              className={`rounded-lg p-2 text-white transition-all duration-300 hover:scale-105 ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
              title="Search Buses"
            >
              <PiMagnifyingGlassDuotone className="h-5 w-5 drop-shadow-lg" />
            </button>
            <button
              className={`rounded-lg p-2 text-white transition-all duration-300 hover:scale-105 ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
              title="Add Bus"
            >
              <PiPlusDuotone className="h-5 w-5 drop-shadow-lg" />
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8`}
      >
        {/* Header Section */}
        <div className={`mb-6 rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiBusDuotone className="h-8 w-8 text-orange-200" />
              <div>
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  All Buses
                </h2>
                <p className="text-gray-300 drop-shadow">
                  {filteredBuses.length} buses available
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/passenger/routes")}
              className={`px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
            >
              View All Routes
            </button>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {["all", "on-time", "delayed", "maintenance", "offline"].map(
              (filter) => (
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
              ),
            )}
          </div>
        </div>

        {/* Buses Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => handleBusClick(bus.id)}
              className={`cursor-pointer rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500/20 p-2">
                    <PiBusDuotone className="h-6 w-6 text-orange-200" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                      {bus.busNo}
                    </h3>
                    <p className="text-sm text-gray-300 drop-shadow">
                      {bus.route}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(bus.status)}`}
                >
                  {bus.status}
                </span>
              </div>

              {/* Current Location & Next Stop */}
              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                  <span>Current: {bus.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <PiClockDuotone className="h-4 w-4 text-green-200" />
                  <span>
                    Next: {bus.nextStop} ({bus.eta})
                  </span>
                </div>
              </div>

              {/* Passengers & Capacity */}
              <div className="mb-4 rounded-lg bg-white/10 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PiUsersDuotone className="h-4 w-4 text-purple-200" />
                    <span className="text-sm text-gray-300">Passengers</span>
                  </div>
                  <span
                    className={`text-sm font-medium ${getOccupancyColor(bus.passengers, bus.capacity)}`}
                  >
                    {bus.passengers}/{bus.capacity}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/20">
                  <div
                    className={`h-2 rounded-full ${
                      (bus.passengers / bus.capacity) * 100 >= 90
                        ? "bg-red-400"
                        : (bus.passengers / bus.capacity) * 100 >= 70
                          ? "bg-yellow-400"
                          : "bg-green-400"
                    }`}
                    style={{
                      width: `${(bus.passengers / bus.capacity) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {Math.round((bus.passengers / bus.capacity) * 100)}% full
                </div>
              </div>

              {/* Driver Info */}
              <div className="mb-4 rounded-lg bg-white/10 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <PiUserDuotone className="h-4 w-4 text-blue-200" />
                  <span className="text-sm text-gray-300">Driver</span>
                </div>
                <div className="text-sm font-medium text-white">
                  {bus.driver}
                </div>
                <div className="text-xs text-gray-400">{bus.driverPhone}</div>
              </div>

              {/* Stats */}
              <div className="border-t border-white/20 pt-4">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium text-white">
                      {bus.totalTrips}
                    </div>
                    <div className="text-gray-400">Total Trips</div>
                  </div>
                  <div className="text-center">
                    <div
                      className={`font-medium ${getRatingColor(bus.avgRating)}`}
                    >
                      {bus.avgRating}★
                    </div>
                    <div className="text-gray-400">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-white">
                      {new Date(bus.lastMaintenance).toLocaleDateString()}
                    </div>
                    <div className="text-gray-400">Last Service</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div
            className={`rounded-xl py-12 text-center ${GLASS_PRESETS.DASHBOARD_CARD}`}
          >
            <PiBusDuotone className="mx-auto mb-4 h-16 w-16 text-gray-400" />
            <h3 className="mb-2 text-lg font-semibold text-white">
              No buses found
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

export default AllBuses;
