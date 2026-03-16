import { useState } from "react";
import {
  PiMapPinDuotone,
  PiNavigationArrowDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import MapView from "../../common/MapView";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const LiveBusMap = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState("all");

  const liveBuses = [
    {
      id: 1,
      busNo: "BUP-001",
      route: "BUP → Savar",
      currentLocation: "Kazipara",
      nextStop: "Shewrapara",
      eta: "5 min",
      passengers: 32,
      capacity: 45,
      status: "on-route",
      coordinates: { lat: 23.8003, lng: 90.4125 },
    },
    {
      id: 2,
      busNo: "BUP-002",
      route: "Savar → BUP",
      currentLocation: "Aminbazar",
      nextStop: "Hemayetpur",
      eta: "3 min",
      passengers: 28,
      capacity: 45,
      status: "on-route",
      coordinates: { lat: 23.7903, lng: 90.4125 },
    },
    {
      id: 3,
      busNo: "BUP-003",
      route: "BUP → Savar",
      currentLocation: "BUP Main Gate",
      nextStop: "Mirpur-10",
      eta: "Loading",
      passengers: 15,
      capacity: 45,
      status: "boarding",
      coordinates: { lat: 23.8103, lng: 90.4125 },
    },
  ];

  const busStops = [
    {
      id: 1,
      name: "BUP Main Gate",
      coordinates: { lat: 23.8103, lng: 90.4125 },
    },
    { id: 2, name: "Mirpur-10", coordinates: { lat: 23.8069, lng: 90.4125 } },
    { id: 3, name: "Mirpur-11", coordinates: { lat: 23.8036, lng: 90.4125 } },
    { id: 4, name: "Kazipara", coordinates: { lat: 23.8003, lng: 90.4125 } },
    { id: 5, name: "Shewrapara", coordinates: { lat: 23.7969, lng: 90.4125 } },
    { id: 6, name: "Hemayetpur", coordinates: { lat: 23.7936, lng: 90.4125 } },
    { id: 7, name: "Aminbazar", coordinates: { lat: 23.7903, lng: 90.4125 } },
    {
      id: 8,
      name: "Savar Bus Stand",
      coordinates: { lat: 23.7869, lng: 90.4125 },
    },
  ];

  const getBusStatusColor = (status) => {
    switch (status) {
      case "on-route":
        return "bg-green-500 shadow-green-500/50";
      case "boarding":
        return "bg-blue-500 animate-pulse shadow-blue-500/50";
      case "maintenance":
        return "bg-red-500 shadow-red-500/50";
      default:
        return "bg-gray-500 shadow-gray-500/50";
    }
  };

  const getBusIcon = (status) => {
    switch (status) {
      case "on-route":
        return "🚌";
      case "boarding":
        return "🚏";
      case "maintenance":
        return "🔧";
      default:
        return "🚌";
    }
  };

  const getOccupancyColor = (passengers, capacity) => {
    const percentage = (passengers / capacity) * 100;
    if (percentage >= 90) return "text-red-300";
    if (percentage >= 70) return "text-yellow-300";
    return "text-green-300";
  };

  const filteredBuses = liveBuses.filter((bus) => {
    if (selectedRoute === "all") return true;
    return bus.route.includes(selectedRoute);
  });

  return (
    <div className={`${GLASS_PRESETS.DASHBOARD_CARD} rounded-2xl p-6`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PiMapPinDuotone className="h-6 w-6 text-green-200 drop-shadow-lg" />
          <h2 className="text-lg font-semibold text-white drop-shadow-lg">
            Live Bus Tracking
          </h2>
        </div>

        { }
        <select
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className={`${GLASS_PRESETS.FORM_INPUT} rounded-lg px-3 py-1 text-sm text-white`}
        >
          <option value="all">All Routes</option>
          <option value="BUP">BUP → Savar</option>
          <option value="Savar">Savar → BUP</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MapView height="384px" containerClass="rounded-xl overflow-hidden border border-white/40" />
        </div>

        { }
        <div className="lg:col-span-1">
          <div className={`${GLASS_PRESETS.DASHBOARD_CARD} h-96 overflow-y-auto rounded-xl p-4`}>
            <h3 className="mb-4 text-sm font-semibold text-white drop-shadow-lg">
              Active Buses ({filteredBuses.length})
            </h3>
            <div className="space-y-3">
              {filteredBuses.map((bus) => (
                <div
                  key={bus.id}
                  className={`cursor-pointer rounded-xl border p-4 backdrop-blur-md transition-all duration-300 hover:shadow-lg ${
                    selectedBus?.id === bus.id
                      ? "border-blue-300/60 bg-blue-500/40 shadow-blue-500/30"
                      : "border-white/40 bg-white/20 hover:bg-white/30"
                  }`}
                  onClick={() => setSelectedBus(bus)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-white shadow-lg ${getBusStatusColor(bus.status)}`}
                      >
                        <span className="text-sm">
                          {getBusIcon(bus.status)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white drop-shadow-lg">
                          {bus.busNo}
                        </p>
                        <p className="text-xs text-gray-200 drop-shadow">
                          {bus.route}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-200 drop-shadow">ETA</p>
                      <p className="text-sm font-medium text-white drop-shadow">
                        {bus.eta}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <PiMapPinDuotone className="h-3 w-3 text-green-200" />
                      <span className="text-gray-200 drop-shadow">
                        At: {bus.currentLocation}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <PiNavigationArrowDuotone className="h-3 w-3 text-blue-200" />
                      <span className="text-gray-200 drop-shadow">
                        Next: {bus.nextStop}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <PiUsersDuotone className="h-3 w-3 text-purple-200" />
                        <span
                          className={`font-medium drop-shadow ${getOccupancyColor(bus.passengers, bus.capacity)}`}
                        >
                          {bus.passengers}/{bus.capacity}
                        </span>
                      </div>
                      <div className="h-1.5 w-16 rounded-full bg-white/20">
                        <div
                          className={`h-1.5 rounded-full ${
                            (bus.passengers / bus.capacity) * 100 >= 90
                              ? "bg-red-400"
                              : (bus.passengers / bus.capacity) * 100 >= 70
                                ? "bg-yellow-400"
                                : "bg-green-400"
                          }`}
                          style={{
                            width: `${(bus.passengers / bus.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      { }
      {selectedBus && (
        <div className="mt-6 rounded-xl border border-blue-300/60 bg-blue-500/30 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-blue-100 drop-shadow-lg">
              Bus Details: {selectedBus.busNo}
            </h4>
            <button
              onClick={() => setSelectedBus(null)}
              className="text-blue-200 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-blue-200 drop-shadow">Route:</span>
              <span className="ml-2 font-medium text-white drop-shadow">
                {selectedBus.route}
              </span>
            </div>
            <div>
              <span className="text-blue-200 drop-shadow">Status:</span>
              <span className="ml-2 font-medium text-white capitalize drop-shadow">
                {selectedBus.status.replace("-", " ")}
              </span>
            </div>
            <div>
              <span className="text-blue-200 drop-shadow">
                Current Location:
              </span>
              <span className="ml-2 font-medium text-white drop-shadow">
                {selectedBus.currentLocation}
              </span>
            </div>
            <div>
              <span className="text-blue-200 drop-shadow">Next Stop:</span>
              <span className="ml-2 font-medium text-white drop-shadow">
                {selectedBus.nextStop}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveBusMap;
