import { useEffect, useState } from "react";
import {
  PiBusDuotone,
  PiClockDuotone,
  PiEngineDuotone,
  PiGasPumpDuotone,
  PiLineSegmentsDuotone,
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiUserCircleDuotone,
  PiUsersDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";
import { useNavigate, useParams } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import MapView from "../../../components/common/MapView";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const BusDetail = () => {
  const navigate = useNavigate();
  const { busId } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    setTimeout(() => {
      const mockBus = {
        id: parseInt(busId),
        busNo: "BUP-001",
        route: {
          id: 1,
          name: "BUP ↔ Savar",
          totalStops: 12,
        },
        status: "on-time",
        currentLocation: "Ashulia Bazar",
        nextStop: {
          name: "EPZ Gate",
          eta: "8 min",
          distance: "2.5 km",
        },
        passengers: 35,
        capacity: 45,
        driver: {
          name: "মোঃ রহিম উদ্দিন",
          phone: "+880 1712-345678",
          experience: "8 years",
          rating: 4.8,
        },
        coordinates: [23.752, 90.385],
        specifications: {
          model: "Ashok Leyland Viking",
          year: "2020",
          engine: "6.7L Diesel",
          fuelCapacity: "120L",
          fuelLevel: "75%",
          mileage: "8.5 km/L",
          lastMaintenance: "2024-01-15",
          nextMaintenance: "2024-02-15",
        },
        tripHistory: [
          {
            id: 1,
            date: "2024-01-14",
            startTime: "07:00 AM",
            endTime: "07:45 AM",
            route: "BUP → Savar",
            passengers: 42,
            status: "completed",
          },
          {
            id: 2,
            date: "2024-01-14",
            startTime: "08:30 AM",
            endTime: "09:15 AM",
            route: "Savar → BUP",
            passengers: 38,
            status: "completed",
          },
          {
            id: 3,
            date: "2024-01-14",
            startTime: "10:00 AM",
            endTime: "10:45 AM",
            route: "BUP → Savar",
            passengers: 35,
            status: "active",
          },
        ],
        schedule: [
          { time: "11:30 AM", route: "Savar → BUP", status: "scheduled" },
          { time: "01:00 PM", route: "BUP → Savar", status: "scheduled" },
          { time: "02:30 PM", route: "Savar → BUP", status: "scheduled" },
          { time: "04:00 PM", route: "BUP → Savar", status: "scheduled" },
          { time: "05:30 PM", route: "Savar → BUP", status: "scheduled" },
        ],
        routeStops: [
          { id: 1, name: "BUP Main Gate", passed: true },
          { id: 2, name: "BUP Back Gate", passed: true },
          { id: 3, name: "Ashulia Bazar", passed: true, current: true },
          { id: 4, name: "EPZ Gate", passed: false, next: true },
          { id: 5, name: "Savar Upazila", passed: false },
          { id: 6, name: "Savar Bazar", passed: false },
          { id: 7, name: "Savar Bus Stand", passed: false },
        ],
      };
      setBus(mockBus);
      setLoading(false);
    }, 1000);
  }, [busId]);

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
      case "on-time":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      case "breakdown":
        return "bg-red-500/30 text-red-200 border-red-300/50";
      case "completed":
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
      case "scheduled":
        return "bg-purple-500/30 text-purple-200 border-purple-300/50";
      case "active":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
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

  const getOccupancyPercentage = (passengers, capacity) => {
    return Math.round((passengers / capacity) * 100);
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
            <p className="text-white">Loading bus details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      { }
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      { }
      <Header
        userType="passenger"
        pageTitle={`Bus Details - ${bus?.busNo} - ${bus?.route.name}`}
        showBackButton={true}
        backButtonPath="/passenger"
        notificationCount={1}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
        customActions={
          <button
            onClick={() => navigate(`/passenger/routes/${bus?.route.id}`)}
            className="rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-blue-500/35"
          >
            View Route
          </button>
        }
      />

      { }
      <main className={`relative ${Z_CLASSES.CONTENT} flex h-[calc(100vh-4rem)]`}>
        { }
        <div className={`w-1/2 border-r border-white/30 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
          <div className="flex h-full flex-col">
            <div className="border-b border-white/30 p-4">
              <h2 className="text-lg font-semibold text-white drop-shadow-lg">
                Live Location
              </h2>
              <p className="text-sm text-gray-300">
                Real-time bus position on route
              </p>
            </div>

            <div className="m-4 flex-1">
              <MapView height="100%" containerClass="rounded-xl overflow-hidden border border-white/30" />
            </div>
          </div>
        </div>

        { }
        <div className={`w-1/2 overflow-y-auto ${GLASS_PRESETS.DASHBOARD_CARD}`}>
          <div className="space-y-6 p-6">
            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-orange-500/20 p-2">
                    <PiBusDuotone className="h-6 w-6 text-orange-200" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {bus?.busNo}
                    </h3>
                    <p className="text-gray-300 drop-shadow">
                      Route: {bus?.route.name}
                    </p>
                  </div>
                </div>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(bus?.status)}`}
                >
                  {bus?.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-200">
                  <PiMapPinDuotone className="h-4 w-4 text-blue-200" />
                  <span>At: {bus?.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiClockDuotone className="h-4 w-4 text-green-200" />
                  <span>ETA: {bus?.nextStop.eta}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiLineSegmentsDuotone className="h-4 w-4 text-purple-200" />
                  <span>Next: {bus?.nextStop.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiUsersDuotone className="h-4 w-4 text-yellow-200" />
                  <span>{bus?.route.totalStops} total stops</span>
                </div>
              </div>
            </div>

            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Passenger Occupancy
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Current Passengers</span>
                  <span
                    className={`font-bold ${getOccupancyColor(bus?.passengers, bus?.capacity)}`}
                  >
                    {bus?.passengers}/{bus?.capacity}
                  </span>
                </div>

                { }
                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700/50">
                  <div
                    className={`h-full transition-all duration-500 ${
                      getOccupancyPercentage(bus?.passengers, bus?.capacity) >=
                      90
                        ? "bg-red-500"
                        : getOccupancyPercentage(
                              bus?.passengers,
                              bus?.capacity,
                            ) >= 70
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                    style={{
                      width: `${getOccupancyPercentage(bus?.passengers, bus?.capacity)}%`,
                    }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Occupancy Rate</span>
                  <span
                    className={`font-medium ${getOccupancyColor(bus?.passengers, bus?.capacity)}`}
                  >
                    {getOccupancyPercentage(bus?.passengers, bus?.capacity)}%
                  </span>
                </div>

                { }
                <div className={`flex items-center gap-2 rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                  {getOccupancyPercentage(bus?.passengers, bus?.capacity) >=
                  90 ? (
                    <>
                      <PiWarningCircleDuotone className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-red-300">
                        Nearly Full - Limited Seats
                      </span>
                    </>
                  ) : getOccupancyPercentage(bus?.passengers, bus?.capacity) >=
                    70 ? (
                    <>
                      <PiWarningCircleDuotone className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm text-yellow-300">
                        Moderate - Some Seats Available
                      </span>
                    </>
                  ) : (
                    <>
                      <PiUsersDuotone className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-300">
                        Comfortable - Plenty of Seats
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Driver Information
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-500/20 p-2">
                    <PiUserCircleDuotone className="h-5 w-5 text-blue-200" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {bus?.driver.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {bus?.driver.experience} experience
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <PiPhoneDuotone className="h-4 w-4 text-green-400" />
                    <span className="text-gray-300">{bus?.driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span className="text-gray-300">
                      Rating: {bus?.driver.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Bus Specifications
              </h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-200">
                    <PiBusDuotone className="h-4 w-4 text-blue-200" />
                    <span>{bus?.specifications.model}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <PiClockDuotone className="h-4 w-4 text-green-200" />
                    <span>Year: {bus?.specifications.year}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <PiEngineDuotone className="h-4 w-4 text-orange-200" />
                    <span>{bus?.specifications.engine}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                    <PiGasPumpDuotone className="h-4 w-4 text-yellow-200" />
                    <span>{bus?.specifications.mileage}</span>
                  </div>
                </div>

                { }
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Fuel Level</span>
                    <span className="text-sm font-medium text-green-300">
                      {bus?.specifications.fuelLevel}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-700/50">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: bus?.specifications.fuelLevel }}
                    ></div>
                  </div>
                </div>

                { }
                <div className={`mt-4 rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Maintenance:</span>
                      <span className="text-gray-200">
                        {bus?.specifications.lastMaintenance}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Due:</span>
                      <span className="text-gray-200">
                        {bus?.specifications.nextMaintenance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Today's Trips
              </h4>
              <div className="max-h-48 space-y-3 overflow-y-auto">
                {bus?.tripHistory.map((trip) => (
                  <div
                    key={trip.id}
                    className={`rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-medium text-white">
                        {trip.route}
                      </div>
                      <span
                        className={`rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(trip.status)}`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-400">
                      <div>
                        Time: {trip.startTime} - {trip.endTime}
                      </div>
                      <div>
                        Passengers: {trip.passengers}/{bus?.capacity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            { }
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Upcoming Schedule
              </h4>
              <div className="space-y-2">
                {bus?.schedule.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-white">
                        {item.time}
                      </div>
                      <div className="text-sm text-gray-300">{item.route}</div>
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

export default BusDetail;
