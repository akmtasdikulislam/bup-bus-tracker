import { useState } from "react";
import {
  PiClockDuotone,
  PiMapPinDuotone,
  PiNavigationArrowDuotone,
} from "react-icons/pi";

const RouteMap = () => {
  const [selectedStop, setSelectedStop] = useState(null);

  const busStops = [
    {
      id: 1,
      name: "BUP Main Gate",
      time: "09:30",
      status: "completed",
      coordinates: { lat: 23.8103, lng: 90.4125 },
    },
    {
      id: 2,
      name: "Mirpur-10",
      time: "09:35",
      status: "completed",
      coordinates: { lat: 23.8069, lng: 90.4125 },
    },
    {
      id: 3,
      name: "Mirpur-11",
      time: "09:40",
      status: "completed",
      coordinates: { lat: 23.8036, lng: 90.4125 },
    },
    {
      id: 4,
      name: "Kazipara",
      time: "09:45",
      status: "current",
      coordinates: { lat: 23.8003, lng: 90.4125 },
    },
    {
      id: 5,
      name: "Shewrapara",
      time: "09:50",
      status: "upcoming",
      coordinates: { lat: 23.7969, lng: 90.4125 },
    },
    {
      id: 6,
      name: "Hemayetpur",
      time: "09:58",
      status: "upcoming",
      coordinates: { lat: 23.7936, lng: 90.4125 },
    },
    {
      id: 7,
      name: "Aminbazar",
      time: "10:05",
      status: "upcoming",
      coordinates: { lat: 23.7903, lng: 90.4125 },
    },
    {
      id: 8,
      name: "Savar Bus Stand",
      time: "10:15",
      status: "upcoming",
      coordinates: { lat: 23.7869, lng: 90.4125 },
    },
  ];

  const getStopStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 shadow-green-500/50";
      case "current":
        return "bg-blue-500 animate-pulse shadow-blue-500/50";
      case "upcoming":
        return "bg-white/40 shadow-white/30";
      default:
        return "bg-white/40 shadow-white/30";
    }
  };

  const getStopStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓";
      case "current":
        return "🚌";
      case "upcoming":
        return "○";
      default:
        return "○";
    }
  };

  return (
    <div className="hover:shadow-3xl rounded-2xl border border-white/40 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center gap-3">
        <PiMapPinDuotone className="h-6 w-6 text-green-200 drop-shadow-lg" />
        <h2 className="text-lg font-semibold text-white drop-shadow-lg">
          Route Map & Stops
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        { }
        <div className="lg:col-span-2">
          <div className="relative h-80 overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-green-500/25 via-blue-500/25 to-purple-500/25 backdrop-blur-md">
            { }
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/15 via-blue-400/15 to-purple-400/15" />

            { }
            <div className="absolute top-10 left-10 h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-green-400/25 to-blue-400/25 blur-lg" />
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
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path
                d="M 50 50 Q 150 100 250 150 T 350 250"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="10,5"
                className="animate-pulse drop-shadow-lg"
              />
            </svg>

            { }
            {busStops.map((stop, index) => (
              <div
                key={stop.id}
                className={`absolute h-4 w-4 cursor-pointer rounded-full border-2 border-white shadow-lg transition-all duration-300 hover:scale-125 ${getStopStatusColor(
                  stop.status,
                )}`}
                style={{
                  left: `${10 + (index * 80) / busStops.length}%`,
                  top: `${20 + (index % 2) * 30}%`,
                }}
                onClick={() => setSelectedStop(stop)}
                title={stop.name}
              />
            ))}

            { }
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full border border-white/40 bg-red-500/90 text-white shadow-xl backdrop-blur-sm">
                <PiNavigationArrowDuotone className="h-4 w-4 drop-shadow-lg" />
              </div>
            </div>

            { }
            <div className="absolute bottom-4 left-4 rounded-xl border border-white/40 bg-black/50 px-3 py-2 shadow-lg backdrop-blur-md">
              <p className="text-xs font-semibold text-white drop-shadow-lg">
                BUP → Savar Route
              </p>
              <p className="text-xs text-green-200 drop-shadow">
                Live Tracking Active
              </p>
            </div>
          </div>
        </div>

        { }
        <div className="lg:col-span-1">
          <div className="h-80 overflow-y-auto rounded-xl border border-white/40 bg-black/30 p-4 backdrop-blur-md">
            <h3 className="mb-4 text-sm font-semibold text-white drop-shadow-lg">
              Bus Stops
            </h3>
            <div className="space-y-3">
              {busStops.map((stop, index) => (
                <div
                  key={stop.id}
                  className={`cursor-pointer rounded-xl border p-4 backdrop-blur-md transition-all duration-300 hover:shadow-lg ${
                    stop.status === "current"
                      ? "border-blue-300/60 bg-blue-500/40 shadow-blue-500/30"
                      : stop.status === "completed"
                        ? "border-green-300/60 bg-green-500/40 shadow-green-500/30"
                        : "border-white/40 bg-white/25 hover:bg-white/35"
                  } ${selectedStop?.id === stop.id ? "ring-2 ring-blue-400/60" : ""}`}
                  onClick={() => setSelectedStop(stop)}
                >
                  <div className="flex items-center gap-4">
                    { }
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg ${getStopStatusColor(
                        stop.status,
                      )}`}
                    >
                      {getStopStatusIcon(stop.status)}
                    </div>

                    { }
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white drop-shadow-lg">
                        {stop.name}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <PiClockDuotone className="h-3 w-3 flex-shrink-0 text-gray-100 drop-shadow" />
                        <span className="text-xs font-medium text-gray-100 drop-shadow">
                          {stop.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;
