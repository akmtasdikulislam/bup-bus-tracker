import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiBusDuotone,
  PiCalendarDuotone,
  PiCheckCircleDuotone,
  PiClockDuotone,
  PiGaugeDuotone,
  PiLineSegmentsDuotone,
  PiListBulletsDuotone,
  PiMapPinDuotone,
  PiMoneyDuotone,
  PiNavigationArrowDuotone,
  PiPencilDuotone,
  PiTextTDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const AdminRouteView = () => {
  const navigate = useNavigate();
  const { routeId } = useParams();
  const [routeData, setRouteData] = useState(null);
  const [assignedBuses, setAssignedBuses] = useState([]);
  const [routeStats, setRouteStats] = useState(null);

  useEffect(() => {
    const mockRouteData = {
      id: routeId,
      routeName: "মিরপুর - বিউপি ক্যাম্পাস",
      routeNameEn: "Mirpur - BUP Campus",
      startLocation: "Mirpur-10",
      endLocation: "BUP Main Campus",
      distance: "12.5 km",
      duration: "45 minutes",
      fare: 25,
      status: "active",
      busesAssigned: 3,
      totalPassengers: 150,
      description:
        "Main route connecting Mirpur area to BUP Campus via major stops including Kazipara, Shewrapara, and Hemayetpur.",
      operatingDays: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ],
      schedule: ["06:00", "07:30", "09:00", "11:00", "13:00", "15:30", "17:00"],
      waypoints: [
        "Mirpur-10",
        "Mirpur-11",
        "Kazipara",
        "Shewrapara",
        "Hemayetpur",
        "Aminbazar",
        "Savar Bus Stand",
        "BUP Main Campus",
      ],
      createdDate: "2024-01-15",
      lastUpdated: "2024-03-10",
      photo:
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center",
    };

    const mockAssignedBuses = [
      {
        id: "BUS001",
        busNumber: "BUP-001",
        model: "Ashok Leyland 2518",
        capacity: 50,
        status: "active",
        isLive: true,
        currentLocation: "Kazipara",
        passengers: 32,
        driverName: "মোহাম্মদ রহিম",
      },
      {
        id: "BUS002",
        busNumber: "BUP-002",
        model: "Tata LP 909",
        capacity: 45,
        status: "active",
        isLive: true,
        currentLocation: "Shewrapara",
        passengers: 28,
        driverName: "আব্দুল করিম",
      },
      {
        id: "BUS003",
        busNumber: "BUP-003",
        model: "Mahindra Tourister",
        capacity: 35,
        status: "maintenance",
        isLive: false,
        currentLocation: "Depot",
        passengers: 0,
        driverName: "মোহাম্মদ আলী",
      },
    ];

    const mockRouteStats = {
      todayTrips: 18,
      totalPassengersToday: 425,
      averageOccupancy: 68,
      onTimePerformance: 92,
      totalRevenue: 10625,
      averageTripTime: 42,
      peakHours: ["07:30", "17:00"],
      popularStops: ["Mirpur-10", "Kazipara", "BUP Main Campus"],
    };

    setRouteData(mockRouteData);
    setAssignedBuses(mockAssignedBuses);
    setRouteStats(mockRouteStats);
  }, [routeId]);

  const handleBack = () => {
    navigate("/admin/routes");
  };

  const handleEdit = () => {
    navigate(`/admin/routes/edit/${routeId}`);
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

  const getDayLabel = (day) => {
    const dayLabels = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    };
    return dayLabels[day] || day;
  };

  const getBusStatusColor = (isLive, status) => {
    if (status === "maintenance") return "text-yellow-300";
    return isLive ? "text-green-300" : "text-gray-400";
  };

  if (!routeData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      { }
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      { }
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
                    Route Details - {routeData.routeNameEn}
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
              Edit Route
            </button>
          </div>
        </div>
      </header>

      { }
      <main className="relative z-10 mx-auto max-w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className={`${GLASS_PRESETS.DASHBOARD_CARD} rounded-2xl p-6`}>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PiLineSegmentsDuotone className="h-7 w-7 text-blue-200 drop-shadow-lg" />
              <h2 className="text-xl font-semibold text-white drop-shadow-lg">
                Route Overview
              </h2>
            </div>
            <div className="text-base text-gray-400">
              Last updated:{" "}
              {new Date(routeData.lastUpdated).toLocaleDateString()}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            { }
            <div className="lg:col-span-2">
              { }
              <div className="mb-6 rounded-xl border border-white/30 bg-black/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40 hover:shadow-lg hover:shadow-white/10">
                <div className="flex items-start gap-4">
                  <img
                    src={routeData.photo}
                    alt={routeData.routeNameEn}
                    className="h-24 w-32 rounded-lg object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-white">
                        {routeData.routeName}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(routeData.status)}`}
                      >
                        {getStatusIcon(routeData.status)}
                        {routeData.status}
                      </span>
                    </div>
                    <p className="mb-1 text-lg text-gray-300">
                      {routeData.routeNameEn}
                    </p>
                    <p className="mb-2 text-base text-blue-300">
                      {routeData.startLocation} → {routeData.endLocation}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <PiNavigationArrowDuotone className="h-4 w-4" />
                        {routeData.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <PiClockDuotone className="h-4 w-4" />
                        {routeData.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <PiMoneyDuotone className="h-4 w-4" />৳{routeData.fare}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base text-gray-400">Buses Assigned</p>
                    <p className="text-2xl font-bold text-white">
                      {routeData.busesAssigned}
                    </p>
                    <p className="text-sm text-green-300">
                      {assignedBuses.filter((bus) => bus.isLive).length} Live
                    </p>
                  </div>
                </div>
              </div>

              { }
              <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
                { }
                <div className="lg:col-span-2">
                  <div className="relative h-[500px] overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-blue-500/25 via-green-500/25 to-purple-500/25 backdrop-blur-md">
                    { }
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/15 via-green-400/15 to-purple-400/15" />

                    { }
                    <div className="absolute top-10 left-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-blue-400/25 to-green-400/25 blur-lg" />
                    <div className="absolute right-10 bottom-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-r from-purple-400/25 to-pink-400/25 blur-lg delay-1000" />

                    { }
                    <svg className="absolute inset-0 h-full w-full">
                      <defs>
                        <linearGradient
                          id="routeGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 50 100 Q 150 120 250 140 T 400 180 Q 450 200 480 250"
                        stroke="url(#routeGradient)"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="10,5"
                        className="animate-pulse drop-shadow-lg"
                      />
                    </svg>

                    { }
                    {routeData.waypoints.map((stop, index) => (
                      <div
                        key={index}
                        className="absolute h-4 w-4 cursor-pointer rounded-full border-2 border-white bg-blue-500 shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-125"
                        style={{
                          left: `${15 + (index * 70) / routeData.waypoints.length}%`,
                          top: `${20 + (index % 2) * 35 + Math.sin(index) * 15}%`,
                        }}
                        title={stop}
                      >
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded bg-black/80 px-2 py-1 text-xs whitespace-nowrap text-white backdrop-blur-sm">
                          {stop}
                        </div>
                      </div>
                    ))}

                    { }
                    {assignedBuses
                      .filter((bus) => bus.isLive)
                      .map((bus, index) => (
                        <div
                          key={bus.id}
                          className="absolute h-8 w-8 cursor-pointer transition-all duration-300 hover:scale-125"
                          style={{
                            left: `${30 + index * 40}%`,
                            top: `${40 + index * 20}%`,
                          }}
                        >
                          <div className="flex h-8 w-8 animate-pulse items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-xl backdrop-blur-sm hover:shadow-2xl hover:shadow-green-500/50">
                            <PiBusDuotone className="h-4 w-4" />
                          </div>
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 rounded bg-black/80 px-1 py-0.5 text-xs text-white backdrop-blur-sm">
                            {bus.busNumber}
                          </div>
                        </div>
                      ))}

                    { }
                    <div className="absolute bottom-4 left-4 rounded-xl border border-white/40 bg-black/60 p-3 shadow-lg backdrop-blur-md">
                      <p className="mb-2 text-sm font-semibold text-white drop-shadow-lg">
                        Route Map
                      </p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                          <span className="text-green-200 drop-shadow">
                            Live Bus
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          <span className="text-blue-200 drop-shadow">
                            Bus Stop
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-4 bg-gradient-to-r from-blue-400 to-purple-400"></div>
                          <span className="text-white drop-shadow">
                            Route Path
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                { }
                <div className="lg:col-span-1">
                  <div
                    className={`${GLASS_PRESETS.DASHBOARD_CARD} h-[500px] overflow-y-auto rounded-xl p-5`}
                  >
                    <h3 className="mb-5 text-lg font-semibold text-white drop-shadow-lg">
                      Today's Statistics
                    </h3>

                    <div className="space-y-4">
                      {/* Key Metrics */}
                      <div className="rounded-xl border border-blue-300/40 bg-blue-500/20 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-blue-100">
                          <PiGaugeDuotone className="h-5 w-5 text-blue-300" />
                          Performance Today
                        </h4>
                        <div className="grid grid-cols-1 gap-3 text-sm">
                          <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                            <p className="text-blue-200">Total Trips</p>
                            <p className="text-xl font-bold text-white">
                              {routeStats?.todayTrips}
                            </p>
                          </div>
                          <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                            <p className="text-blue-200">Passengers</p>
                            <p className="text-xl font-bold text-white">
                              {routeStats?.totalPassengersToday}
                            </p>
                          </div>
                          <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                            <p className="text-blue-200">Avg Occupancy</p>
                            <p className="text-xl font-bold text-white">
                              {routeStats?.averageOccupancy}%
                            </p>
                          </div>
                          <div className="rounded border border-blue-400/40 bg-blue-500/30 p-3">
                            <p className="text-blue-200">On-Time Rate</p>
                            <p className="text-xl font-bold text-white">
                              {routeStats?.onTimePerformance}%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Revenue & Performance */}
                      <div className="rounded-xl border border-green-300/40 bg-green-500/20 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-green-100">
                          <PiMoneyDuotone className="h-5 w-5 text-green-300" />
                          Revenue & Efficiency
                        </h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-green-200">
                              Today's Revenue
                            </span>
                            <span className="text-lg font-bold text-white">
                              ৳{routeStats?.totalRevenue}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-green-200">
                              Avg Trip Time
                            </span>
                            <span className="font-semibold text-white">
                              {routeStats?.averageTripTime} min
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-green-200">Revenue/Trip</span>
                            <span className="font-semibold text-white">
                              ৳
                              {Math.round(
                                routeStats?.totalRevenue /
                                  routeStats?.todayTrips,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      { }
                      <div className="rounded-xl border border-orange-300/40 bg-orange-500/20 p-4">
                        <h4 className="mb-3 flex items-center gap-2 text-base font-semibold text-orange-100">
                          <PiClockDuotone className="h-5 w-5 text-orange-300" />
                          Peak Hours
                        </h4>
                        <div className="space-y-2">
                          {routeStats?.peakHours.map((hour, index) => (
                            <div
                              key={index}
                              className="rounded border border-orange-400/40 bg-orange-500/30 p-2"
                            >
                              <span className="text-orange-200">
                                Peak {index + 1}:{" "}
                              </span>
                              <span className="font-semibold text-white">
                                {hour}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              { }
              <div className="rounded-xl border border-white/30 bg-black/30 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40 hover:shadow-lg hover:shadow-white/10">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                  <PiMapPinDuotone className="h-5 w-5 text-blue-400" />
                  Route Stops & Waypoints
                </h4>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {routeData.waypoints.map((stop, index) => (
                    <div
                      key={index}
                      className="cursor-pointer rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/20 hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white transition-transform duration-300 hover:scale-110">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-white">
                            {stop}
                          </p>
                          <p className="text-xs text-gray-400">
                            Stop {index + 1}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            { }
            <div className="lg:col-span-1">
              <div
                className={`${GLASS_PRESETS.DASHBOARD_CARD} h-fit max-h-screen overflow-y-auto rounded-xl p-5`}
              >
                <h3 className="mb-5 text-lg font-semibold text-white drop-shadow-lg">
                  Route Information
                </h3>

                <div className="space-y-4">
                  { }
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiListBulletsDuotone className="h-5 w-5 text-blue-400" />
                      <span className="text-base font-semibold text-white">
                        Basic Details
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded border border-white/20 bg-white/10 p-3">
                          <p className="text-gray-400">Distance</p>
                          <p className="font-medium text-white">
                            {routeData.distance}
                          </p>
                        </div>
                        <div className="rounded border border-white/20 bg-white/10 p-3">
                          <p className="text-gray-400">Duration</p>
                          <p className="font-medium text-white">
                            {routeData.duration}
                          </p>
                        </div>
                        <div className="rounded border border-white/20 bg-white/10 p-3">
                          <p className="text-gray-400">Fare</p>
                          <p className="font-medium text-white">
                            ৳{routeData.fare}
                          </p>
                        </div>
                        <div className="rounded border border-white/20 bg-white/10 p-3">
                          <p className="text-gray-400">Stops</p>
                          <p className="font-medium text-white">
                            {routeData.waypoints.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  { }
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiCalendarDuotone className="h-5 w-5 text-green-400" />
                      <span className="text-base font-semibold text-white">
                        Operating Schedule
                      </span>
                    </div>

                    { }
                    <div className="mb-4">
                      <p className="mb-2 text-sm text-gray-400">
                        Operating Days
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {[
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                          "sunday",
                        ].map((day) => (
                          <span
                            key={day}
                            className={`rounded px-2 py-1 text-xs ${
                              routeData.operatingDays.includes(day)
                                ? "bg-green-500/30 text-green-300"
                                : "bg-gray-500/30 text-gray-400"
                            }`}
                          >
                            {getDayLabel(day)}
                          </span>
                        ))}
                      </div>
                    </div>

                    { }
                    <div>
                      <p className="mb-2 text-sm text-gray-400">
                        Daily Schedule
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {routeData.schedule.map((time, index) => (
                          <div
                            key={index}
                            className="rounded border border-green-400/40 bg-green-500/20 p-2 text-center"
                          >
                            <span className="font-medium text-green-200">
                              {time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  { }
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiBusDuotone className="h-5 w-5 text-purple-400" />
                      <span className="text-base font-semibold text-white">
                        Assigned Buses
                      </span>
                    </div>
                    <div className="space-y-3">
                      {assignedBuses.map((bus) => (
                        <div
                          key={bus.id}
                          className="rounded border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:border-purple-400/40 hover:bg-purple-500/20"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-white">
                              {bus.busNumber}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${getStatusColor(bus.status)}`}
                            >
                              {getStatusIcon(bus.status)}
                              {bus.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            <p>
                              {bus.model} • {bus.capacity} seats
                            </p>
                            <p>Driver: {bus.driverName}</p>
                            <div className="flex items-center justify-between">
                              <span
                                className={getBusStatusColor(
                                  bus.isLive,
                                  bus.status,
                                )}
                              >
                                {bus.isLive
                                  ? `@ ${bus.currentLocation}`
                                  : "Offline"}
                              </span>
                              {bus.isLive && (
                                <span className="text-white">
                                  {bus.passengers}/{bus.capacity}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  { }
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiTextTDuotone className="h-5 w-5 text-orange-400" />
                      <span className="text-base font-semibold text-white">
                        Description
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">
                      {routeData.description}
                    </p>
                  </div>

                  { }
                  <div className="rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-black/40">
                    <div className="mb-4 flex items-center gap-2">
                      <PiCalendarDuotone className="h-5 w-5 text-cyan-400" />
                      <span className="text-base font-semibold text-white">
                        Route Metadata
                      </span>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Route ID:</span>
                        <span className="font-medium text-white">
                          {routeData.id}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Created:</span>
                        <span className="font-medium text-white">
                          {new Date(routeData.createdDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated:</span>
                        <span className="font-medium text-white">
                          {new Date(routeData.lastUpdated).toLocaleDateString()}
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

export default AdminRouteView;
