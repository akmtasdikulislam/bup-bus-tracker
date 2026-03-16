import { useState } from "react";
import {
  PiClockDuotone,
  PiMapPinDuotone,
  PiNavigationArrowDuotone,
} from "react-icons/pi";
import MapView from "../../common/MapView";

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
        <div className="lg:col-span-2">
          <MapView height="320px" containerClass="rounded-xl overflow-hidden border border-white/40" />
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
