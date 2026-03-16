import {
  PiCalendarDuotone,
  PiClockDuotone,
  PiMapPinDuotone,
  PiUsersDuotone,
} from "react-icons/pi";

const UpcomingTrips = () => {
  // Reduced trips data to fit properly
  const upcomingTrips = [
    {
      id: 1,
      route: "Savar to BUP",
      departureTime: "11:30 AM",
      arrivalTime: "12:15 PM",
      date: "Today",
      estimatedPassengers: 28,
      status: "scheduled",
      stops: 8,
    },
    {
      id: 2,
      route: "BUP to Savar",
      departureTime: "01:45 PM",
      arrivalTime: "02:30 PM",
      date: "Today",
      estimatedPassengers: 35,
      status: "scheduled",
      stops: 8,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/40 text-blue-100 border-blue-300/60";
      case "in-progress":
        return "bg-green-500/40 text-green-100 border-green-300/60";
      case "delayed":
        return "bg-yellow-500/40 text-yellow-100 border-yellow-300/60";
      case "cancelled":
        return "bg-red-500/40 text-red-100 border-red-300/60";
      default:
        return "bg-gray-500/40 text-gray-100 border-gray-300/60";
    }
  };

  const getRouteDirection = (route) => {
    return route.includes("BUP to") ? "→" : "←";
  };

  const getRouteColor = (route) => {
    return route.includes("BUP to") ? "text-green-200" : "text-blue-200";
  };

  return (
    <div className="hover:shadow-3xl h-full rounded-2xl border border-white/40 bg-black/40 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="flex h-full flex-col p-4">
        {/* Header - Compact */}
        <div className="mb-3 flex items-center gap-2">
          <PiCalendarDuotone className="h-5 w-5 text-indigo-200 drop-shadow-lg" />
          <h2 className="text-base font-semibold text-white drop-shadow-lg">
            Upcoming Trips
          </h2>
        </div>

        {/* Content - Properly sized */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Trips List - Scrollable if needed */}
          <div className="flex-1 space-y-2 overflow-y-auto">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="rounded-lg border border-white/40 bg-white/20 p-3 backdrop-blur-md transition-all duration-300 hover:bg-white/30"
              >
                {/* Trip Header - Compact */}
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold drop-shadow-lg ${getRouteColor(trip.route)}`}
                    >
                      {getRouteDirection(trip.route)}
                    </span>
                    <h3 className="truncate text-sm font-semibold text-white drop-shadow-lg">
                      {trip.route}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-xs font-medium backdrop-blur-md ${getStatusColor(
                      trip.status,
                    )}`}
                  >
                    {trip.status}
                  </span>
                </div>

                {/* Trip Details - Compact grid */}
                <div className="mb-2 grid grid-cols-2 gap-1 text-xs">
                  <div className="flex items-center gap-1 text-gray-100">
                    <PiCalendarDuotone className="h-3 w-3 flex-shrink-0 drop-shadow-lg" />
                    <span className="truncate font-medium drop-shadow">
                      {trip.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-100">
                    <PiMapPinDuotone className="h-3 w-3 flex-shrink-0 drop-shadow-lg" />
                    <span className="font-medium drop-shadow">
                      {trip.stops} stops
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-100">
                    <PiClockDuotone className="h-3 w-3 flex-shrink-0 drop-shadow-lg" />
                    <span className="truncate font-medium drop-shadow">
                      {trip.departureTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-100">
                    <PiUsersDuotone className="h-3 w-3 flex-shrink-0 drop-shadow-lg" />
                    <span className="font-medium drop-shadow">
                      ~{trip.estimatedPassengers}
                    </span>
                  </div>
                </div>

                {/* Progress Bar - Compact */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-200">
                    <span className="drop-shadow">Until departure</span>
                    <span className="drop-shadow">
                      {trip.id === 1 ? "2h 15m" : "4h 30m"}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <div
                      className="h-1 rounded-full bg-gradient-to-r from-blue-400 to-green-400 shadow-lg"
                      style={{
                        width: trip.id === 1 ? "75%" : "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary - Fixed at bottom */}
          <div className="mt-2 rounded-lg border border-indigo-300/60 bg-indigo-500/30 p-2 backdrop-blur-md">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-indigo-100 drop-shadow-lg">
                Today's Trips
              </span>
              <span className="font-medium text-indigo-200 drop-shadow">
                {upcomingTrips.filter((trip) => trip.date === "Today").length}{" "}
                remaining
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTrips;
