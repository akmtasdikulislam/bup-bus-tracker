import { useState } from "react";
import {
  PiCalendarDuotone,
  PiClockDuotone,
  PiMapPinDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";

const RouteSchedules = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState("bup-savar");

  const routeSchedules = {
    "bup-savar": {
      name: "BUP → Savar",
      color: "green",
      schedules: [
        {
          id: 1,
          departureTime: "08:00 AM",
          arrivalTime: "08:45 AM",
          busNo: "BUP-001",
          estimatedPassengers: 35,
          status: "on-time",
        },
        {
          id: 2,
          departureTime: "09:30 AM",
          arrivalTime: "10:15 AM",
          busNo: "BUP-003",
          estimatedPassengers: 42,
          status: "active",
        },
        {
          id: 3,
          departureTime: "11:00 AM",
          arrivalTime: "11:45 AM",
          busNo: "BUP-005",
          estimatedPassengers: 38,
          status: "scheduled",
        },
        {
          id: 4,
          departureTime: "01:30 PM",
          arrivalTime: "02:15 PM",
          busNo: "BUP-001",
          estimatedPassengers: 40,
          status: "scheduled",
        },
        {
          id: 5,
          departureTime: "04:00 PM",
          arrivalTime: "04:45 PM",
          busNo: "BUP-003",
          estimatedPassengers: 45,
          status: "scheduled",
        },
      ],
    },
    "savar-bup": {
      name: "Savar → BUP",
      color: "blue",
      schedules: [
        {
          id: 6,
          departureTime: "07:30 AM",
          arrivalTime: "08:15 AM",
          busNo: "BUP-002",
          estimatedPassengers: 30,
          status: "completed",
        },
        {
          id: 7,
          departureTime: "09:00 AM",
          arrivalTime: "09:45 AM",
          busNo: "BUP-004",
          estimatedPassengers: 28,
          status: "active",
        },
        {
          id: 8,
          departureTime: "10:30 AM",
          arrivalTime: "11:15 AM",
          busNo: "BUP-006",
          estimatedPassengers: 32,
          status: "scheduled",
        },
        {
          id: 9,
          departureTime: "12:00 PM",
          arrivalTime: "12:45 PM",
          busNo: "BUP-002",
          estimatedPassengers: 35,
          status: "scheduled",
        },
        {
          id: 10,
          departureTime: "03:30 PM",
          arrivalTime: "04:15 PM",
          busNo: "BUP-004",
          estimatedPassengers: 43,
          status: "scheduled",
        },
      ],
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
      case "active":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "on-time":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
      case "scheduled":
        return "bg-purple-500/30 text-purple-200 border-purple-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      default:
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
    }
  };

  const getRouteColor = (route) => {
    return route === "bup-savar" ? "text-green-300" : "text-blue-300";
  };

  const getRouteIcon = (route) => {
    return route === "bup-savar" ? "→" : "←";
  };

  const currentRoute = routeSchedules[selectedRoute];

  return (
    <div className="hover:shadow-3xl h-auto rounded-2xl border border-white/40 bg-black/40 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiCalendarDuotone className="h-5 w-5 text-indigo-200 drop-shadow-lg" />
          <h2 className="text-base font-semibold text-white drop-shadow-lg">
            Route Schedules
          </h2>
        </div>
        <button
          onClick={() => navigate("/passenger/routes")}
          className="group flex items-center gap-1 rounded-lg border border-white/40 bg-white/25 px-3 py-1 text-xs font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/35 hover:shadow-2xl"
        >
          <span>View All</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      { }
      <div className="mb-4 flex rounded-lg border border-white/30 bg-black/30 p-1 backdrop-blur-md">
        {Object.entries(routeSchedules).map(([key, route]) => (
          <button
            key={key}
            onClick={() => setSelectedRoute(key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
              selectedRoute === key
                ? "bg-white/20 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className={`text-lg ${getRouteColor(key)}`}>
              {getRouteIcon(key)}
            </span>
            <span className="hidden sm:inline">{route.name}</span>
          </button>
        ))}
      </div>

      { }
      <div className="h-48 space-y-2 overflow-y-auto">
        {currentRoute.schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="rounded-lg border border-white/30 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <span
                    className={`text-lg font-bold ${getRouteColor(selectedRoute)} drop-shadow-lg`}
                  >
                    {getRouteIcon(selectedRoute)}
                  </span>
                  <span className="text-xs text-gray-300 drop-shadow">
                    {schedule.busNo}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <PiClockDuotone className="h-4 w-4 text-blue-200" />
                    <span className="font-medium text-white drop-shadow">
                      {schedule.departureTime} - {schedule.arrivalTime}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <PiUsersDuotone className="h-3 w-3 text-purple-200" />
                      <span className="text-gray-200 drop-shadow">
                        ~{schedule.estimatedPassengers}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PiMapPinDuotone className="h-3 w-3 text-green-200" />
                      <span className="text-gray-200 drop-shadow">45 min</span>
                    </div>
                  </div>
                </div>
              </div>
              <span
                className={`rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
                  schedule.status,
                )}`}
              >
                {schedule.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteSchedules;
