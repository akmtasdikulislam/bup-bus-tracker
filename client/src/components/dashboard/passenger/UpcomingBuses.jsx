import {
  PiBusDuotone,
  PiClockDuotone,
  PiMapPinDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";

const UpcomingBuses = () => {
  const navigate = useNavigate();

  // Placeholder upcoming buses data
  const upcomingBuses = [
    {
      id: 1,
      busNo: "BUP-003",
      route: "BUP → Savar",
      departureTime: "11:00 AM",
      departureLocation: "BUP Main Gate",
      eta: "45 min",
      timeUntilDeparture: "1h 30m",
      estimatedPassengers: 38,
      capacity: 45,
      status: "on-time",
    },
    {
      id: 2,
      busNo: "BUP-006",
      route: "Savar → BUP",
      departureTime: "10:30 AM",
      departureLocation: "Savar Bus Stand",
      eta: "45 min",
      timeUntilDeparture: "1h 0m",
      estimatedPassengers: 32,
      capacity: 45,
      status: "on-time",
    },
    {
      id: 3,
      busNo: "BUP-001",
      route: "BUP → Savar",
      departureTime: "01:30 PM",
      departureLocation: "BUP Main Gate",
      eta: "45 min",
      timeUntilDeparture: "4h 0m",
      estimatedPassengers: 40,
      capacity: 45,
      status: "scheduled",
    },
    {
      id: 4,
      busNo: "BUP-002",
      route: "Savar → BUP",
      departureTime: "12:00 PM",
      departureLocation: "Savar Bus Stand",
      eta: "45 min",
      timeUntilDeparture: "2h 30m",
      estimatedPassengers: 35,
      capacity: 45,
      status: "scheduled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "on-time":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "scheduled":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
      case "delayed":
        return "bg-yellow-500/30 text-yellow-200 border-yellow-300/50";
      case "cancelled":
        return "bg-red-500/30 text-red-200 border-red-300/50";
      default:
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
    }
  };

  const getRouteColor = (route) => {
    return route.includes("BUP →") ? "text-green-300" : "text-blue-300";
  };

  const getRouteIcon = (route) => {
    return route.includes("BUP →") ? "→" : "←";
  };

  const getOccupancyColor = (passengers, capacity) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return "text-red-300";
    if (percentage >= 70) return "text-yellow-300";
    return "text-green-300";
  };

  return (
    <div className="hover:shadow-3xl h-auto rounded-2xl border border-white/40 bg-black/40 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PiBusDuotone className="h-5 w-5 text-orange-200 drop-shadow-lg" />
          <h2 className="text-base font-semibold text-white drop-shadow-lg">
            Upcoming Buses
          </h2>
        </div>
        <button
          onClick={() => navigate("/passenger/buses")}
          className="group flex items-center gap-1 rounded-lg border border-white/40 bg-white/25 px-3 py-1 text-xs font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/35 hover:shadow-2xl"
        >
          <span>View All</span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </button>
      </div>

      <div className="h-64 space-y-3 overflow-y-auto">
        {upcomingBuses.map((bus) => (
          <div
            key={bus.id}
            className="rounded-lg border border-white/30 bg-white/10 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:shadow-lg"
          >
            {/* Bus Header */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-bold drop-shadow-lg ${getRouteColor(bus.route)}`}
                >
                  {getRouteIcon(bus.route)}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white drop-shadow-lg">
                    {bus.busNo}
                  </h3>
                  <p className="text-xs text-gray-200 drop-shadow">
                    {bus.route}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full border px-2 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
                  bus.status,
                )}`}
              >
                {bus.status}
              </span>
            </div>

            {/* Bus Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-200">
                  <PiClockDuotone className="h-3 w-3 drop-shadow" />
                  <span className="drop-shadow">{bus.departureTime}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-200">
                  <PiMapPinDuotone className="h-3 w-3 drop-shadow" />
                  <span className="drop-shadow">{bus.eta}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-200">
                  <span className="drop-shadow">
                    From: {bus.departureLocation}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PiUsersDuotone className="h-3 w-3 text-purple-200" />
                  <span
                    className={`font-medium drop-shadow ${getOccupancyColor(
                      bus.estimatedPassengers,
                      bus.capacity,
                    )}`}
                  >
                    {bus.estimatedPassengers}/{bus.capacity}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Until Departure */}
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-300">
                <span className="drop-shadow">Departure in</span>
                <span className="font-medium text-white drop-shadow">
                  {bus.timeUntilDeparture}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                <div
                  className={`h-1.5 rounded-full shadow-lg ${
                    bus.status === "on-time"
                      ? "bg-gradient-to-r from-green-400 to-blue-400"
                      : "bg-gradient-to-r from-blue-400 to-purple-400"
                  }`}
                  style={{
                    width:
                      bus.id === 1
                        ? "85%"
                        : bus.id === 2
                          ? "75%"
                          : bus.id === 3
                            ? "25%"
                            : "50%",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 rounded-lg border border-orange-300/50 bg-orange-500/20 p-2 backdrop-blur-md">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-orange-200 drop-shadow-lg">
            Next Bus
          </span>
          <span className="text-orange-300 drop-shadow">
            {upcomingBuses[0]?.busNo} in {upcomingBuses[0]?.timeUntilDeparture}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingBuses;
