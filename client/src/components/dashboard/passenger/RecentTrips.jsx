import { PiMapPinDuotone } from "react-icons/pi";

const RecentTrips = ({ passengerData }) => {
  return (
    <div className="hover:shadow-3xl rounded-2xl border border-white/40 bg-black/40 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center gap-2">
        <PiMapPinDuotone className="h-5 w-5 text-indigo-200 drop-shadow-lg" />
        <h3 className="text-base font-semibold text-white drop-shadow-lg">
          Recent Trips
        </h3>
      </div>

      <div className="space-y-2">
        {passengerData?.recentTrips?.map((trip) => (
          <div
            key={trip.id}
            className="rounded-lg border border-white/30 bg-white/10 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {trip.route}
                </p>
                <p className="text-xs text-gray-200 drop-shadow">
                  {trip.date} • {trip.time}
                </p>
              </div>
              <span className="rounded-full border border-white/30 bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {trip.busNo}
              </span>
            </div>
          </div>
        )) || (
          <p className="text-center text-sm text-gray-300">No recent trips</p>
        )}
      </div>
    </div>
  );
};

export default RecentTrips;
