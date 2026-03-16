import { useEffect, useState } from "react";
import {
  PiBusDuotone,
  PiClockDuotone,
  PiLineSegmentsDuotone,
  PiMapPinDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ routes: [], buses: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
    performSearch(query);
  }, [searchParams]);

  const performSearch = async (query) => {
    setLoading(true);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockRoutes = [
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
        },
      ];

      const mockBuses = [
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
        },
      ];

      // Enhanced filtering - search in multiple fields with better matching
      const searchLower = query.toLowerCase().trim();

      const filteredRoutes = mockRoutes.filter((route) => {
        if (!searchLower) return true;

        return (
          route.name.toLowerCase().includes(searchLower) ||
          route.description.toLowerCase().includes(searchLower) ||
          route.status.toLowerCase().includes(searchLower) ||
          route.distance.toLowerCase().includes(searchLower) ||
          route.duration.toLowerCase().includes(searchLower) ||
          route.frequency.toLowerCase().includes(searchLower)
        );
      });

      const filteredBuses = mockBuses.filter((bus) => {
        if (!searchLower) return true;

        return (
          bus.busNo.toLowerCase().includes(searchLower) ||
          bus.route.toLowerCase().includes(searchLower) ||
          bus.currentLocation.toLowerCase().includes(searchLower) ||
          bus.nextStop.toLowerCase().includes(searchLower) ||
          bus.driver.toLowerCase().includes(searchLower) ||
          bus.status.toLowerCase().includes(searchLower)
        );
      });

      setSearchResults({
        routes: filteredRoutes,
        buses: filteredBuses,
      });
      setLoading(false);
    }, 500);
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    navigate("/passenger/profile");
  };

  const handleSettingsClick = () => {
    navigate("/passenger/settings");
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

  const handleBusClick = (busId) => {
    navigate(`/passenger/buses/${busId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "on-time":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
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
        pageTitle={`Search Results - "${searchParams.get("q")}"`}
        showBackButton={true}
        backButtonPath="/passenger/dashboard"
        notificationCount={3}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
        customActions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/passenger/routes")}
              className="rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35"
            >
              All Routes
            </button>
            <button
              onClick={() => navigate("/passenger/buses")}
              className="rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-blue-500/35"
            >
              All Buses
            </button>
          </div>
        }
      />

      {/* Main Content */}
      <main className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8`}>
        {/* Search Info */}
        <div className="mb-6 rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                Search Results for "{searchParams.get("q")}"
              </h2>
              <p className="text-gray-300 drop-shadow">
                {loading
                  ? "Searching..."
                  : `Found ${searchResults.routes.length} routes and ${searchResults.buses.length} buses`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/passenger/dashboard")}
                className="group flex items-center gap-2 rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/35 hover:shadow-2xl"
              >
                <span className="font-medium">Dashboard</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-400"></div>
              <p className="text-white">Searching...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Routes Results */}
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-2">
                <PiLineSegmentsDuotone className="h-6 w-6 text-green-200" />
                <h3 className="text-lg font-semibold text-white">
                  Routes ({searchResults.routes.length})
                </h3>
              </div>

              {searchResults.routes.length > 0 ? (
                searchResults.routes.map((route) => (
                  <div
                    key={route.id}
                    onClick={() => handleRouteClick(route.id)}
                    className="cursor-pointer rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/40"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white drop-shadow-lg">
                          {route.name}
                        </h4>
                        <p className="text-gray-300 drop-shadow">
                          {route.description}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(route.status)}`}
                      >
                        {route.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                        <span>{route.distance}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiClockDuotone className="h-4 w-4 text-green-200" />
                        <span>{route.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiBusDuotone className="h-4 w-4 text-orange-200" />
                        <span>{route.activeBuses} active buses</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiUsersDuotone className="h-4 w-4 text-purple-200" />
                        <span>{route.totalStops} stops</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">
                          Frequency: {route.frequency}
                        </span>
                        <span className="text-gray-300">
                          Operating: {route.operatingHours}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-300">
                  <PiLineSegmentsDuotone className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p>No routes found matching your search.</p>
                </div>
              )}
            </div>

            {/* Buses Results */}
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-2">
                <PiBusDuotone className="h-6 w-6 text-orange-200" />
                <h3 className="text-lg font-semibold text-white">
                  Buses ({searchResults.buses.length})
                </h3>
              </div>

              {searchResults.buses.length > 0 ? (
                searchResults.buses.map((bus) => (
                  <div
                    key={bus.id}
                    onClick={() => handleBusClick(bus.id)}
                    className="cursor-pointer rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-black/40"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-semibold text-white drop-shadow-lg">
                          {bus.busNo}
                        </h4>
                        <p className="text-gray-300 drop-shadow">{bus.route}</p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(bus.status)}`}
                      >
                        {bus.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                        <span>Current: {bus.currentLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiClockDuotone className="h-4 w-4 text-green-200" />
                        <span>
                          Next stop: {bus.nextStop} ({bus.eta})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PiUsersDuotone className="h-4 w-4 text-purple-200" />
                        <span
                          className={`font-medium ${getOccupancyColor(bus.passengers, bus.capacity)}`}
                        >
                          {bus.passengers}/{bus.capacity} passengers
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-white/20 pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">
                          Driver: {bus.driver}
                        </span>
                        <span className="text-gray-300">
                          {Math.round((bus.passengers / bus.capacity) * 100)}%
                          full
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-300">
                  <PiBusDuotone className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <p>No buses found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
