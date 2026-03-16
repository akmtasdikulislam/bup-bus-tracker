import { useEffect, useState } from "react";
import {
  PiBusDuotone,
  PiClockDuotone,
  PiLineSegmentsDuotone,
  PiMapPinDuotone,
  PiMoneyDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const RouteDetail = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRoute = {
        id: parseInt(routeId),
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
        stops: [
          {
            id: 1,
            name: "BUP Main Gate",
            time: "07:00 AM",
            coordinates: [23.7465, 90.3785],
          },
          {
            id: 2,
            name: "BUP Back Gate",
            time: "07:05 AM",
            coordinates: [23.747, 90.379],
          },
          {
            id: 3,
            name: "Ashulia Bazar",
            time: "07:15 AM",
            coordinates: [23.752, 90.385],
          },
          {
            id: 4,
            name: "EPZ Gate",
            time: "07:25 AM",
            coordinates: [23.758, 90.392],
          },
          {
            id: 5,
            name: "Savar Upazila",
            time: "07:35 AM",
            coordinates: [23.765, 90.4],
          },
          {
            id: 6,
            name: "Savar Bazar",
            time: "07:40 AM",
            coordinates: [23.767, 90.402],
          },
          {
            id: 7,
            name: "Savar Bus Stand",
            time: "07:45 AM",
            coordinates: [23.769, 90.404],
          },
        ],
        buses: [
          {
            id: 1,
            busNo: "BUP-001",
            currentLocation: "Savar Bus Stand",
            nextStop: "Savar Bazar",
            eta: "5 min",
            passengers: 35,
            capacity: 45,
            status: "on-time",
            driver: "মোঃ রহিম উদ্দিন",
            coordinates: [23.769, 90.404],
          },
          {
            id: 2,
            busNo: "BUP-002",
            currentLocation: "BUP Main Gate",
            nextStop: "BUP Back Gate",
            eta: "3 min",
            passengers: 28,
            capacity: 45,
            status: "on-time",
            driver: "মোঃ আব্দুল কাদের",
            coordinates: [23.7465, 90.3785],
          },
          {
            id: 3,
            busNo: "BUP-003",
            currentLocation: "Ashulia Bazar",
            nextStop: "EPZ Gate",
            eta: "8 min",
            passengers: 42,
            capacity: 45,
            status: "delayed",
            driver: "মোঃ করিম আহমেদ",
            coordinates: [23.752, 90.385],
          },
        ],
        schedule: [
          { time: "07:00 AM", bus: "BUP-001", status: "completed" },
          { time: "07:30 AM", bus: "BUP-002", status: "completed" },
          { time: "08:00 AM", bus: "BUP-003", status: "active" },
          { time: "08:30 AM", bus: "BUP-001", status: "scheduled" },
          { time: "09:00 AM", bus: "BUP-002", status: "scheduled" },
          { time: "09:30 AM", bus: "BUP-003", status: "scheduled" },
        ],
      };
      setRoute(mockRoute);
      setLoading(false);
    }, 1000);
  }, [routeId]);

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

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "on-time":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      case "completed":
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
      case "scheduled":
        return "bg-purple-500/30 text-purple-200 border-purple-300/50";
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

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
          <img
            src={BUPCover}
            alt="BUP Cover"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        </div>
        <div className={`relative ${Z_CLASSES.CONTENT} flex min-h-screen items-center justify-center`}>
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-400"></div>
            <p className="text-white">Loading route details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Header */}
      <Header
        userType="passenger"
        pageTitle={`Route Details - ${route?.name}`}
        showBackButton={true}
        backButtonPath="/passenger"
        notificationCount={2}
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
      <main className={`relative ${Z_CLASSES.CONTENT} flex h-[calc(100vh-4rem)]`}>
        {/* Map Sidebar */}
        <div className="w-1/2 border-r border-white/30 bg-black/30 backdrop-blur-xl">
          <div className="flex h-full flex-col">
            <div className="border-b border-white/30 p-4">
              <h2 className="text-lg font-semibold text-white drop-shadow-lg">
                Live Map
              </h2>
              <p className="text-sm text-gray-300">
                Real-time bus locations and route
              </p>
            </div>

            {/* Mock Map Container */}
            <div className="relative m-4 flex-1 overflow-hidden rounded-xl border border-white/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTAgMTBIMTBWMjBIMFYxMFoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz4KPHBhdGggZD0iTTIwIDEwSDMwVjIwSDIwVjEwWiIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPgo8cGF0aCBkPSJNMTAgMjBIMjBWMzBIMTBWMjBaIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+CjxwYXRoIGQ9Ik0zMCAyMEg0MFYzMEgzMFYyMFoiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz4KPC9zdmc+')] opacity-30"></div>

              {/* Route Path */}
              <div className="absolute inset-4">
                <svg className="h-full w-full" viewBox="0 0 400 300">
                  {/* Route Line */}
                  <path
                    d="M 50 250 Q 100 200 150 180 Q 200 160 250 140 Q 300 120 350 100"
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                  />

                  {/* Bus Stop Markers */}
                  {route?.stops.map((stop, index) => (
                    <g key={stop.id}>
                      <circle
                        cx={50 + index * 50}
                        cy={250 - index * 25}
                        r="6"
                        fill="rgba(34, 197, 94, 0.8)"
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth="2"
                      />
                      <text
                        x={50 + index * 50}
                        y={270 - index * 25}
                        textAnchor="middle"
                        className="fill-white text-xs"
                      >
                        {stop.name}
                      </text>
                    </g>
                  ))}

                  {/* Bus Markers */}
                  {route?.buses.map((bus, index) => (
                    <g key={bus.id}>
                      <circle
                        cx={80 + index * 120}
                        cy={235 - index * 30}
                        r="8"
                        fill="rgba(249, 115, 22, 0.8)"
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth="2"
                        className="animate-pulse"
                      />
                      <text
                        x={80 + index * 120}
                        y={255 - index * 30}
                        textAnchor="middle"
                        className="fill-white text-xs font-medium"
                      >
                        {bus.busNo}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Map Legend */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 p-3 backdrop-blur-md">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-white">Bus Stops</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-orange-500"></div>
                    <span className="text-white">Active Buses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-0.5 w-4 bg-blue-500"></div>
                    <span className="text-white">Route Path</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Sidebar */}
        <div className="w-1/2 overflow-y-auto bg-black/30 backdrop-blur-xl">
          <div className="space-y-6 p-6">
            {/* Route Header */}
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-green-500/20 p-2">
                    <PiLineSegmentsDuotone className="h-6 w-6 text-green-200" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {route?.name}
                    </h3>
                    <p className="text-gray-300 drop-shadow">
                      {route?.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(route?.status)}`}
                >
                  {route?.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-200">
                  <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                  <span>{route?.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiClockDuotone className="h-4 w-4 text-green-200" />
                  <span>{route?.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiBusDuotone className="h-4 w-4 text-orange-200" />
                  <span>{route?.activeBuses} active buses</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiMoneyDuotone className="h-4 w-4 text-yellow-200" />
                  <span>{route?.fare}</span>
                </div>
              </div>
            </div>

            {/* Bus Stops */}
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Bus Stops
              </h4>
              <div className="max-h-64 space-y-3 overflow-y-auto">
                {route?.stops.map((stop, index) => (
                  <div
                    key={stop.id}
                    className="flex items-center justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-green-300/50 bg-green-500/30 text-xs font-medium text-green-200">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {stop.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Stop {index + 1}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-300">{stop.time}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Buses */}
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Active Buses
              </h4>
              <div className="space-y-3">
                {route?.buses.map((bus) => (
                  <div
                    key={bus.id}
                    className={`cursor-pointer rounded-lg border p-4 transition-all duration-300 ${
                      selectedBus?.id === bus.id
                        ? "border-blue-300/50 bg-white/20"
                        : "border-white/20 bg-white/10 hover:bg-white/15"
                    }`}
                    onClick={() =>
                      setSelectedBus(selectedBus?.id === bus.id ? null : bus)
                    }
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-orange-500/20 p-1">
                          <PiBusDuotone className="h-4 w-4 text-orange-200" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {bus.busNo}
                          </div>
                          <div className="text-xs text-gray-400">
                            Driver: {bus.driver}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(bus.status)}`}
                      >
                        {bus.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiMapPinDuotone className="h-3 w-3" />
                        <span>At: {bus.currentLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-200">
                        <PiClockDuotone className="h-3 w-3" />
                        <span>
                          Next: {bus.nextStop} ({bus.eta})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PiUsersDuotone className="h-3 w-3 text-purple-200" />
                        <span
                          className={`${getOccupancyColor(bus.passengers, bus.capacity)}`}
                        >
                          {bus.passengers}/{bus.capacity} passengers
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <h4 className="mb-4 text-lg font-semibold text-white">
                Today's Schedule
              </h4>
              <div className="space-y-2">
                {route?.schedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-white">
                        {item.time}
                      </div>
                      <div className="text-sm text-gray-300">{item.bus}</div>
                    </div>
                    <span
                      className={`rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RouteDetail;
