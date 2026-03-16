import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiCalendarDuotone,
  PiCheckCircleDuotone,
  PiClockDuotone,
  PiGearDuotone,
  PiIdentificationBadgeDuotone,
  PiMapPinDuotone,
  PiNavigationArrowDuotone,
  PiPencilDuotone,
  PiRoadHorizonDuotone,
  PiSpeedometerDuotone,
  PiUsersDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const AdminBusView = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [busData, setBusData] = useState(null);
  const [liveLocationData, setLiveLocationData] = useState(null);
  const [routeStops, setRouteStops] = useState([]);
  const [driverInfo, setDriverInfo] = useState(null);

  // Mock data - in real app, fetch based on busId
  useEffect(() => {
    const mockBusData = {
      id: busId,
      busNumber: "BUP-001",
      model: "Ashok Leyland 2518",
      capacity: 50,
      manufacturer: "Ashok Leyland",
      yearOfManufacture: 2020,
      registrationNumber: "DHAKA-GA-11-2020",
      status: "active",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-04-15",
      fuelType: "diesel",
      mileage: 8.5,
      photo:
        "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop&crop=center",
      totalTrips: 245,
      totalDistance: 12500,
      routeAssigned: "Mirpur - BUP Campus",
      driverAssigned: "মোহাম্মদ রহিম",
    };

    const mockDriverInfo = {
      name: "মোহাম্মদ রহিম",
      license: "DH-789456123",
      phone: "+880 1712-345678",
      experience: "8 years",
      rating: 4.7,
      totalTripsCompleted: 1250,
    };

    const mockLiveLocationData = {
      isLive: true,
      currentLocation: "Kazipara",
      nextStop: "Shewrapara",
      eta: "5 min",
      passengers: 32,
      speed: 35,
      direction: "North-East",
      lastUpdate: new Date().toISOString(),
      coordinates: { lat: 23.8003, lng: 90.4125 },
    };

    const mockRouteStops = [
      {
        id: 1,
        name: "BUP Main Gate",
        order: 1,
        estimatedTime: "0 min",
        coordinates: { lat: 23.8103, lng: 90.4125 },
      },
      {
        id: 2,
        name: "Mirpur-10",
        order: 2,
        estimatedTime: "8 min",
        coordinates: { lat: 23.8069, lng: 90.4125 },
      },
      {
        id: 3,
        name: "Mirpur-11",
        order: 3,
        estimatedTime: "15 min",
        coordinates: { lat: 23.8036, lng: 90.4125 },
      },
      {
        id: 4,
        name: "Kazipara",
        order: 4,
        estimatedTime: "22 min",
        coordinates: { lat: 23.8003, lng: 90.4125 },
      },
      {
        id: 5,
        name: "Shewrapara",
        order: 5,
        estimatedTime: "28 min",
        coordinates: { lat: 23.7969, lng: 90.4125 },
      },
      {
        id: 6,
        name: "Hemayetpur",
        order: 6,
        estimatedTime: "35 min",
        coordinates: { lat: 23.7936, lng: 90.4125 },
      },
      {
        id: 7,
        name: "Aminbazar",
        order: 7,
        estimatedTime: "42 min",
        coordinates: { lat: 23.7903, lng: 90.4125 },
      },
      {
        id: 8,
        name: "Savar Bus Stand",
        order: 8,
        estimatedTime: "50 min",
        coordinates: { lat: 23.7869, lng: 90.4125 },
      },
    ];

    setBusData(mockBusData);
    setDriverInfo(mockDriverInfo);
    setLiveLocationData(mockLiveLocationData);
    setRouteStops(mockRouteStops);
  }, [busId]);

  const handleBack = () => {
    navigate("/admin/buses");
  };

  const handleEdit = () => {
    navigate(`/admin/buses/edit/${busId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400";
      case "inactive":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PiCheckCircleDuotone className="h-4 w-4" />;
      case "maintenance":
        return <PiWarningCircleDuotone className="h-4 w-4" />;
      case "inactive":
        return <PiClockDuotone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const isMaintenanceDue = (nextMaintenance) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const getOccupancyColor = (passengers, capacity) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return "text-red-300";
    if (percentage >= 70) return "text-yellow-300";
    return "text-green-300";
  };

  if (!busData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Header */}
      <header className={`relative z-10 ${GLASS_PRESETS.HEADER_CONTAINER}`}>
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="rounded-lg border border-white/40 bg-white/25 p-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/60 hover:bg-white/35 hover:shadow-2xl"
              >
                <PiArrowLeftDuotone className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="BUP Bus Tracker"
                  className="h-10 w-16 object-contain drop-shadow-lg"
                />
                <div>
                  <h1 className="text-lg font-bold text-white drop-shadow-lg">
                    Bus Details - {busData.busNumber}
                  </h1>
                  <p className="text-xs font-medium text-blue-200 drop-shadow">
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-blue-400/60 hover:bg-blue-500/35 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <PiPencilDuotone className="h-4 w-4" />
              Edit Bus
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className={`${GLASS_PRESETS.DASHBOARD_CARD} rounded-2xl p-6`}>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiMapPinDuotone className="h-7 w-7 text-green-200 drop-shadow-lg" />
              <h2 className="text-xl font-semibold text-white drop-shadow-lg">
                Live Bus Details - {busData.busNumber}
              </h2>
              {liveLocationData?.isLive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-3 py-1 text-sm font-medium text-green-400">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  Live
                </span>
              )}
            </div>
            <div className="text-base text-gray-400">
              Last updated:{" "}
              {liveLocationData?.lastUpdate
                ? new Date(liveLocationData.lastUpdate).toLocaleTimeString()
                : "N/A"}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Interactive Map & Bus Info */}
            <div className="lg:col-span-2">
              {/* Bus Basic Info Header */}
              <div className="mb-6 rounded-xl border border-white/30 bg-black/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40 hover:shadow-lg hover:shadow-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={busData.photo}
                    alt={busData.busNumber}
                    className="h-24 w-32 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white">
                        {busData.busNumber}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(busData.status)}`}
                      >
                        {getStatusIcon(busData.status)}
                        {busData.status}
                      </span>
                    </div>
                    <p className="text-base text-gray-300">
                      {busData.model} • {busData.manufacturer}
                    </p>
                    <p className="text-sm text-gray-400">
                      {busData.capacity} seats •{" "}
                      {busData.fuelType.toUpperCase()} • {busData.mileage} km/l
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-base text-gray-400">Route</p>
                    <p className="text-lg font-semibold text-white">
                      {busData.routeAssigned}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map and Live Tracking Side by Side */}
              <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Interactive Map */}
                <div className="lg:col-span-2">
                  <div className="relative h-[500px] overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-green-500/25 via-blue-500/25 to-purple-500/25 backdrop-blur-md">
                    {liveLocationData?.isLive ? (
                      <>
                        {/* Enhanced Map Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-blue-400/15 to-purple-400/15" />

                        {/* Animated Background Elements */}
                        <div className="absolute top-10 left-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-green-400/25 to-blue-400/25 blur-lg" />
                        <div className="absolute right-10 bottom-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-purple-400/25 to-pink-400/25 blur-lg delay-1000" />

                        {/* Route Lines */}
                        <svg className="absolute inset-0 h-full w-full">
                          <defs>
                            <linearGradient
                              id="routeGradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop offset="0%" stopColor="#10b981" />
                              <stop offset="50%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M 50 50 Q 150 100 250 150 T 350 250"
                            stroke="url(#routeGradient)"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray="8,4"
                            className="animate-pulse drop-shadow-lg"
                          />
                        </svg>

                        {/* Bus Stops */}
                        {routeStops.map((stop, index) => (
                          <div
                            key={stop.id}
                            className="absolute h-3 w-3 rounded-full border-2 border-white bg-white/60 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-125"
                            style={{
                              left: `${10 + (index * 80) / routeStops.length}%`,
                              top: `${20 + (index % 2) * 40}%`,
                            }}
                            title={stop.name}
                          />
                        ))}

                        {/* Live Bus */}
                        <div
                          className="absolute h-8 w-8 cursor-pointer transition-all duration-300 hover:scale-125"
                          style={{ left: "40%", top: "50%" }}
                        >
                          <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-xl backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/50">
                            <span className="text-sm">🚌</span>
                          </div>
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/80 px-1 py-0.5 text-xs text-white backdrop-blur-sm">
                            {busData.busNumber}
                          </div>
                        </div>

                        {/* Map Legend */}
                        <div className="absolute bottom-4 left-4 rounded-xl border border-white/40 bg-black/60 p-3 shadow-lg backdrop-blur-md">
                          <p className="mb-2 text-sm font-semibold text-white drop-shadow-lg">
                            Live Tracking
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                              <span className="text-green-200 drop-shadow">
                                Live Bus
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-white/60"></div>
                              <span className="text-white drop-shadow">
                                Bus Stop
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center text-white">
                          <PiMapPinDuotone className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                          <h3 className="mb-2 text-xl font-semibold">
                            Bus Not Live
                          </h3>
                          <p className="text-base text-gray-400">
                            The bus is currently not active or location tracking
                            is disabled.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Live Status Panel */}
                <div className="lg:col-span-1">
                  <div
                    className={`${GLASS_PRESETS.DASHBOARD_CARD} h-[500px] overflow-y-auto rounded-xl p-5`}
                  >
                    <h3 className="mb-5 text-lg font-semibold text-white drop-shadow-lg">
                      Live Status & Monitoring
                    </h3>

                    {liveLocationData?.isLive ? (
                      <div className="space-y-6">
                        <div className="rounded-xl border border-green-300/60 bg-green-500/30 p-4 backdrop-blur-md transition-all duration-300 hover:border-green-300/80 hover:bg-green-500/40 hover:shadow-lg hover:shadow-green-500/20">
                          <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-green-500 text-white shadow-lg transition-transform duration-300 hover:scale-110">
                              <span className="text-sm">🚌</span>
                            </div>
                            <div>
                              <p className="text-base font-semibold text-white">
                                {busData.busNumber}
                              </p>
                              <p className="text-sm text-gray-200">
                                {busData.routeAssigned}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2">
                              <PiMapPinDuotone className="h-4 w-4 text-green-200" />
                              <span className="text-gray-200">
                                At: {liveLocationData.currentLocation}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <PiNavigationArrowDuotone className="h-4 w-4 text-blue-200" />
                              <span className="text-gray-200">
                                Next: {liveLocationData.nextStop}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <PiClockDuotone className="h-4 w-4 text-yellow-200" />
                              <span className="text-gray-200">
                                ETA: {liveLocationData.eta}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex items-center gap-2">
                                <PiSpeedometerDuotone className="h-4 w-4 text-cyan-200" />
                                <span className="text-gray-200">
                                  {liveLocationData.speed} km/h
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <PiNavigationArrowDuotone className="h-4 w-4 text-orange-200" />
                                <span className="text-gray-200">
                                  {liveLocationData.direction}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <PiUsersDuotone className="h-4 w-4 text-purple-200" />
                                <span
                                  className={`font-medium ${getOccupancyColor(liveLocationData.passengers, busData.capacity)}`}
                                >
                                  {liveLocationData.passengers}/
                                  {busData.capacity}
                                </span>
                              </div>
                              <div className="h-2 w-16 rounded-full bg-white/20">
                                <div
                                  className={`h-2 rounded-full ${
                                    (liveLocationData.passengers /
                                      busData.capacity) *
                                      100 >=
                                    90
                                      ? "bg-red-400"
                                      : (liveLocationData.passengers /
                                            busData.capacity) *
                                            100 >=
                                          70
                                        ? "bg-yellow-400"
                                        : "bg-green-400"
                                  }`}
                                  style={{
                                    width: `${(liveLocationData.passengers / busData.capacity) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Additional Live Information */}
                        <div className="mt-6 space-y-4">
                          {/* Real-time Statistics */}
                          <div className="rounded-xl border border-blue-300/40 bg-blue-500/20 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-blue-100">
                              <PiSpeedometerDuotone className="h-5 w-5 text-blue-300" />
                              Real-time Stats
                            </h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                                <p className="text-blue-200">Avg Speed</p>
                                <p className="font-semibold text-white">
                                  31 km/h
                                </p>
                              </div>
                              <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                                <p className="text-blue-200">Trip Time</p>
                                <p className="font-semibold text-white">
                                  42 min
                                </p>
                              </div>
                              <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                                <p className="text-blue-200">Distance</p>
                                <p className="font-semibold text-white">
                                  18.5 km
                                </p>
                              </div>
                              <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                                <p className="text-blue-200">Fuel Used</p>
                                <p className="font-semibold text-white">
                                  2.1 L
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Route Progress */}
                          <div className="rounded-xl border border-purple-300/40 bg-purple-500/20 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-purple-100">
                              <PiRoadHorizonDuotone className="h-5 w-5 text-purple-300" />
                              Route Progress
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-purple-200">
                                  Completed
                                </span>
                                <span className="font-semibold text-white">
                                  4/8 stops
                                </span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-white/20">
                                <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div>
                                  <p className="text-purple-200">
                                    Remaining Time
                                  </p>
                                  <p className="font-medium text-white">
                                    23 min
                                  </p>
                                </div>
                                <div>
                                  <p className="text-purple-200">
                                    Remaining Stops
                                  </p>
                                  <p className="font-medium text-white">
                                    4 stops
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Passenger Analytics */}
                          <div className="rounded-xl border border-orange-300/40 bg-orange-500/20 p-4">
                            <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-orange-100">
                              <PiUsersDuotone className="h-5 w-5 text-orange-300" />
                              Passenger Analytics
                            </h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex items-center justify-between">
                                <span className="text-orange-200">
                                  Peak Occupancy
                                </span>
                                <span className="font-semibold text-white">
                                  42/50 (84%)
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-orange-200">
                                  Boarding Rate
                                </span>
                                <span className="font-semibold text-white">
                                  2.3 pass/min
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-orange-200">
                                  Total Boarded
                                </span>
                                <span className="font-semibold text-white">
                                  67 passengers
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="rounded-xl border border-gray-400/40 bg-gray-500/20 p-4 text-center">
                          <PiClockDuotone className="mx-auto mb-3 h-12 w-12 text-gray-400" />
                          <p className="mb-2 text-base text-gray-400">
                            Bus is offline
                          </p>
                          <p className="text-sm text-gray-500">
                            Last seen: 2 hours ago
                          </p>
                        </div>

                        {/* Offline Statistics */}
                        <div className="rounded-xl border border-white/30 bg-black/30 p-4">
                          <h4 className="mb-3 text-base font-semibold text-white">
                            Today's Summary
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded border border-white/20 bg-white/10 p-3">
                              <p className="text-gray-400">Trips Completed</p>
                              <p className="font-semibold text-white">3</p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/10 p-3">
                              <p className="text-gray-400">Distance</p>
                              <p className="font-semibold text-white">85 km</p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/10 p-3">
                              <p className="text-gray-400">Passengers</p>
                              <p className="font-semibold text-white">142</p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/10 p-3">
                              <p className="text-gray-400">Fuel Used</p>
                              <p className="font-semibold text-white">9.8 L</p>
                            </div>
                          </div>
                        </div>

                        {/* Schedule Information */}
                        <div className="rounded-xl border border-white/30 bg-black/30 p-4">
                          <h4 className="mb-3 text-base font-semibold text-white">
                            Next Schedule
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Next Trip:</span>
                              <span className="font-medium text-white">
                                6:00 AM
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Route:</span>
                              <span className="font-medium text-white">
                                {busData.routeAssigned}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">
                                Expected Duration:
                              </span>
                              <span className="font-medium text-white">
                                45 min
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Route Stops Grid */}
              <div className="rounded-xl border border-white/30 bg-black/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40 hover:shadow-lg hover:shadow-white/10">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <PiRoadHorizonDuotone className="h-5 w-5 text-blue-400" />
                  Route Stops
                </h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {routeStops.map((stop) => (
                    <div
                      key={stop.id}
                      className={`cursor-pointer rounded-lg border p-3 backdrop-blur-md transition-all duration-300 hover:shadow-md ${
                        liveLocationData?.currentLocation === stop.name
                          ? "border-green-400/60 bg-green-500/30 hover:border-green-400/80 hover:bg-green-500/40"
                          : "border-white/20 bg-white/10 hover:border-blue-400/40 hover:bg-blue-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold transition-transform duration-300 hover:scale-110 ${
                            liveLocationData?.currentLocation === stop.name
                              ? "bg-green-500 text-white"
                              : "bg-white/20 text-gray-300"
                          }`}
                        >
                          {stop.order}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className={`truncate text-sm font-medium ${
                              liveLocationData?.currentLocation === stop.name
                                ? "text-green-200"
                                : "text-white"
                            }`}
                          >
                            {stop.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {stop.estimatedTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Information Panel */}
            <div className="lg:col-span-1">
              <div
                className={`${GLASS_PRESETS.DASHBOARD_CARD} max-h-auto h-fit overflow-y-auto rounded-xl p-5`}
              >
                <h3 className="mb-5 text-lg font-semibold text-white drop-shadow-lg">
                  Detailed Information
                </h3>

                <div className="space-y-4">
                  {/* Driver Information */}
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiIdentificationBadgeDuotone className="h-5 w-5 text-purple-400" />
                      <span className="text-base font-semibold text-white">
                        Driver Information
                      </span>
                    </div>
                    {driverInfo ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white shadow-lg transition-transform duration-300 hover:scale-110">
                            👨‍✈️
                          </div>
                          <div className="flex-1">
                            <p className="text-base font-semibold text-white">
                              {driverInfo.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              Licensed Driver
                            </p>
                            <p className="text-sm text-purple-300">
                              {driverInfo.experience} experience
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/20">
                              <p className="text-gray-400">License No.</p>
                              <p className="font-medium text-white">
                                {driverInfo.license}
                              </p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-green-400/40 hover:bg-green-500/20">
                              <p className="text-gray-400">Rating</p>
                              <p className="font-medium text-white">
                                ⭐ {driverInfo.rating}/5.0
                              </p>
                            </div>
                          </div>

                          <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/20">
                            <p className="text-sm text-gray-400">
                              Phone Number
                            </p>
                            <p className="text-base font-medium text-white">
                              {driverInfo.phone}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/20">
                              <p className="text-gray-400">Total Trips</p>
                              <p className="font-medium text-white">
                                {driverInfo.totalTripsCompleted}
                              </p>
                            </div>
                            <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500/20">
                              <p className="text-gray-400">Experience</p>
                              <p className="font-medium text-white">
                                {driverInfo.experience}
                              </p>
                            </div>
                          </div>

                          <div className="rounded border border-green-400/40 bg-green-500/20 p-3">
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-green-200">
                                Current Assignment
                              </p>
                              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/30 px-2 py-1 text-sm font-medium text-green-300">
                                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                                Active
                              </span>
                            </div>
                            <p className="mt-1 text-base font-medium text-white">
                              {busData.routeAssigned}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <PiIdentificationBadgeDuotone className="mx-auto mb-2 h-8 w-8 text-gray-400" />
                        <p className="text-xs text-gray-400">
                          No driver assigned
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiGearDuotone className="h-5 w-5 text-green-400" />
                      <span className="text-base font-semibold text-white">
                        Performance
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-orange-400/40 hover:bg-orange-500/20">
                        <p className="text-gray-400">Fuel</p>
                        <p className="font-medium text-white">
                          {busData.fuelType.toUpperCase()}
                        </p>
                      </div>
                      <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/20">
                        <p className="text-gray-400">Mileage</p>
                        <p className="font-medium text-white">
                          {busData.mileage} km/l
                        </p>
                      </div>
                      <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/20">
                        <p className="text-gray-400">Trips</p>
                        <p className="font-medium text-white">
                          {busData.totalTrips}
                        </p>
                      </div>
                      <div className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/20">
                        <p className="text-gray-400">Distance</p>
                        <p className="font-medium text-white">
                          {busData.totalDistance} km
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Maintenance Info */}
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiCalendarDuotone className="h-5 w-5 text-yellow-400" />
                      <span className="text-base font-semibold text-white">
                        Maintenance
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last:</span>
                        <span className="font-medium text-white">
                          {new Date(
                            busData.lastMaintenance,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Next:</span>
                        <span
                          className={`font-medium ${isMaintenanceDue(busData.nextMaintenance) ? "text-red-300" : "text-white"}`}
                        >
                          {new Date(
                            busData.nextMaintenance,
                          ).toLocaleDateString()}
                          {isMaintenanceDue(busData.nextMaintenance) && (
                            <span className="ml-1">⚠️</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminBusView;
