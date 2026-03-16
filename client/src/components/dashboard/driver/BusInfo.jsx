import { PiBusDuotone, PiClockDuotone, PiMapPinDuotone } from "react-icons/pi";

const BusInfo = () => {
  // Placeholder bus data
  const busData = {
    busNo: "BUP-001",
    route: "BUP ↔ Savar",
    departureTime: "09:30 AM",
    nextStop: "Hemayetpur",
    distanceToNext: "2.3 km",
    status: "On Route",
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Route":
        return "bg-green-500/30 text-green-200 border-green-300/50";
      case "At Stop":
        return "bg-blue-500/30 text-blue-200 border-blue-300/50";
      case "Maintenance":
        return "bg-red-500/30 text-red-200 border-red-300/50";
      default:
        return "bg-gray-500/30 text-gray-200 border-gray-300/50";
    }
  };

  return (
    <div className="hover:shadow-3xl rounded-2xl border border-white/40 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PiBusDuotone className="h-6 w-6 text-blue-300 drop-shadow" />
          <h2 className="text-lg font-semibold text-white drop-shadow-lg">
            Bus Information
          </h2>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${getStatusColor(
            busData.status,
          )}`}
        >
          {busData.status}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Bus Number */}
        <div className="flex h-16 items-center gap-3 rounded-xl border border-blue-300/30 bg-blue-500/20 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-blue-500/30">
          <PiBusDuotone className="h-5 w-5 flex-shrink-0 text-blue-300 drop-shadow" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-blue-200 drop-shadow">Bus Number</p>
            <p className="text-lg font-bold text-white drop-shadow-lg">
              {busData.busNo}
            </p>
          </div>
        </div>
        {/* Route */}
        <div className="flex h-16 items-center gap-3 rounded-xl border border-green-300/30 bg-green-500/20 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-green-500/30">
          <PiMapPinDuotone className="h-5 w-5 flex-shrink-0 text-green-300 drop-shadow" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-green-200 drop-shadow">Route</p>
            <p className="truncate text-sm font-medium text-white drop-shadow">
              {busData.route}
            </p>
          </div>
        </div>
        {/* Departure Time */}
        <div className="flex h-16 items-center gap-3 rounded-xl border border-orange-300/30 bg-orange-500/20 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-orange-500/30">
          <PiClockDuotone className="h-5 w-5 flex-shrink-0 text-orange-300 drop-shadow" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-orange-200 drop-shadow">Departure</p>
            <p className="text-sm font-medium text-white drop-shadow">
              {busData.departureTime}
            </p>
          </div>
        </div>
        {/* Next Stop */}
        <div className="flex h-16 items-center gap-3 rounded-xl border border-teal-300/30 bg-teal-500/20 p-3 backdrop-blur-sm transition-all duration-200 hover:bg-teal-500/30">
          <PiMapPinDuotone className="h-5 w-5 flex-shrink-0 text-teal-300 drop-shadow" />
          <div className="min-w-0 flex-1">
            <p className="text-xs text-teal-200 drop-shadow">Next Stop</p>
            <p className="truncate text-sm font-medium text-white drop-shadow">
              {busData.nextStop} ({busData.distanceToNext})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusInfo;
