import { useEffect, useState } from "react";
import {
  PiBatteryHighDuotone,
  PiCellSignalFullDuotone,
  PiCheckCircleDuotone,
  PiMapPinDuotone,
  PiPlayDuotone,
  PiStopDuotone,
  PiWarningDuotone,
  PiWifiHighDuotone,
} from "react-icons/pi";

const LocationStreaming = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingDuration, setStreamingDuration] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("excellent");
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 23.7986,
    lng: 90.4125,
    accuracy: 5,
  });

  useEffect(() => {
    let interval;
    if (isStreaming) {
      interval = setInterval(() => {
        setStreamingDuration((prev) => prev + 1);
        setLastUpdate(new Date());
      }, 1000);
    } else {
      setStreamingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  const handleToggleStreaming = () => {
    if (isStreaming) {
       
      setIsStreaming(false);
      setStreamingDuration(0);
      setLastUpdate(null);
    } else {
       
      setIsStreaming(true);
      setLastUpdate(new Date());
       
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              accuracy: position.coords.accuracy,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          },
        );
      }
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "excellent":
        return (
          <PiWifiHighDuotone className="h-4 w-4 text-green-300 drop-shadow" />
        );
      case "good":
        return (
          <PiCellSignalFullDuotone className="h-4 w-4 text-yellow-300 drop-shadow" />
        );
      case "poor":
        return (
          <PiWarningDuotone className="h-4 w-4 text-red-300 drop-shadow" />
        );
      default:
        return (
          <PiWifiHighDuotone className="h-4 w-4 text-green-300 drop-shadow" />
        );
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel > 50) return "text-green-300";
    if (batteryLevel > 20) return "text-yellow-300";
    return "text-red-300";
  };

  return (
    <div className="hover:shadow-3xl flex h-full min-h-[664px] flex-col rounded-2xl border border-white/40 bg-black/40 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      { }
      <div className="flex-shrink-0 p-4 pb-3">
        <div className="flex items-center gap-3">
          <PiMapPinDuotone className="h-5 w-5 text-blue-200 drop-shadow-lg" />
          <h2 className="text-base font-semibold text-white drop-shadow-lg">
            Location Streaming
          </h2>
          {isStreaming && (
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
              <span className="text-xs font-medium text-red-300 drop-shadow">
                LIVE
              </span>
            </div>
          )}
        </div>
      </div>

      { }
      <div className="flex flex-1 flex-col overflow-hidden px-4">
        <div className="flex flex-1 flex-col justify-between space-y-4">
          { }
          <div className="rounded-xl border border-white/40 bg-white/20 p-4 backdrop-blur-md">
            <div className="mb-3 text-center">
              <button
                onClick={handleToggleStreaming}
                className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-lg transition-all duration-300 hover:scale-110 ${
                  isStreaming
                    ? "border-red-400/60 bg-red-500/40 hover:bg-red-500/60"
                    : "border-green-400/60 bg-green-500/40 hover:bg-green-500/60"
                }`}
              >
                {isStreaming ? (
                  <PiStopDuotone className="h-8 w-8 text-white drop-shadow-lg" />
                ) : (
                  <PiPlayDuotone className="h-8 w-8 text-white drop-shadow-lg" />
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm font-semibold text-white drop-shadow-lg">
                {isStreaming ? "Stop Streaming" : "Start Streaming"}
              </p>
              <p className="text-xs text-gray-200 drop-shadow">
                {isStreaming
                  ? "Your location is being shared live"
                  : "Share your location with passengers"}
              </p>
            </div>
          </div>

          { }
          <div className="flex flex-1 flex-col justify-center space-y-4">
            { }
            {isStreaming && (
              <div className="rounded-xl border border-green-300/60 bg-green-500/30 p-4 backdrop-blur-md">
                <div className="mb-3 flex items-center gap-2">
                  <PiCheckCircleDuotone className="h-5 w-5 text-green-200 drop-shadow" />
                  <h3 className="text-sm font-semibold text-green-100 drop-shadow-lg">
                    Streaming Active
                  </h3>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-200 drop-shadow">
                      Duration:
                    </span>
                    <span className="font-semibold text-white drop-shadow-lg">
                      {formatDuration(streamingDuration)}
                    </span>
                  </div>

                  {lastUpdate && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-200 drop-shadow">
                        Last Update:
                      </span>
                      <span className="font-semibold text-white drop-shadow-lg">
                        {lastUpdate.toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            { }
            <div className="rounded-xl border border-white/40 bg-white/20 p-4 backdrop-blur-md">
              <h3 className="mb-3 text-sm font-semibold text-white drop-shadow-lg">
                Current Location
              </h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200 drop-shadow">Latitude:</span>
                  <span className="font-mono text-white drop-shadow-lg">
                    {currentLocation.lat.toFixed(6)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200 drop-shadow">Longitude:</span>
                  <span className="font-mono text-white drop-shadow-lg">
                    {currentLocation.lng.toFixed(6)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-200 drop-shadow">Accuracy:</span>
                  <span className="font-semibold text-white drop-shadow-lg">
                    ±{currentLocation.accuracy}m
                  </span>
                </div>
              </div>
            </div>

            { }
            <div className="rounded-xl border border-white/40 bg-white/20 p-4 backdrop-blur-md">
              <h3 className="mb-3 text-sm font-semibold text-white drop-shadow-lg">
                System Status
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getConnectionIcon()}
                    <span className="text-xs text-gray-200 drop-shadow">
                      Connection
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white capitalize drop-shadow-lg">
                    {connectionStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PiBatteryHighDuotone
                      className={`h-4 w-4 drop-shadow ${getBatteryColor()}`}
                    />
                    <span className="text-xs text-gray-200 drop-shadow">
                      Battery
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white drop-shadow-lg">
                    {batteryLevel}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PiMapPinDuotone className="h-4 w-4 text-blue-300 drop-shadow" />
                    <span className="text-xs text-gray-200 drop-shadow">
                      GPS Signal
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-green-200 drop-shadow-lg">
                    Strong
                  </span>
                </div>
              </div>
            </div>

            { }
            <div className="rounded-xl border border-white/40 bg-white/20 p-4 backdrop-blur-md">
              <h3 className="mb-3 text-sm font-semibold text-white drop-shadow-lg">
                Quick Actions
              </h3>

              <div className="space-y-2">
                <button className="w-full rounded-lg border border-blue-400/30 bg-blue-500/20 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-blue-500/30">
                  Update Current Location
                </button>

                <button className="w-full rounded-lg border border-purple-400/30 bg-purple-500/20 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-purple-500/30">
                  Send Emergency Alert
                </button>

                <button className="w-full rounded-lg border border-orange-400/30 bg-orange-500/20 px-3 py-2 text-xs font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-orange-500/30">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      { }
      <div className="flex-shrink-0 p-4 pt-3">
        <div className="rounded-lg border border-blue-300/60 bg-blue-500/30 p-2 backdrop-blur-md">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-blue-100 drop-shadow-lg">
              {isStreaming ? "Passengers Tracking" : "Ready to Stream"}
            </span>
            <span className="font-medium text-blue-200 drop-shadow">
              {isStreaming ? "Live" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStreaming;
