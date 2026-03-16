import {
  PiBusDuotone,
  PiLineSegmentsDuotone,
  PiMapPinDuotone,
  PiShieldDuotone,
  PiUserCircleDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      title: "Total Passengers",
      value: stats.totalPassengers,
      icon: PiUsersDuotone,
      color: "from-blue-500/20 to-blue-600/20",
      iconBg: "bg-blue-500/30",
      iconColor: "text-blue-200",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Total Drivers",
      value: stats.totalDrivers,
      icon: PiUserCircleDuotone,
      color: "from-green-500/20 to-green-600/20",
      iconBg: "bg-green-500/30",
      iconColor: "text-green-200",
      change: "+3%",
      changeType: "increase",
    },
    {
      title: "Total Buses",
      value: stats.totalBuses,
      icon: PiBusDuotone,
      color: "from-orange-500/20 to-orange-600/20",
      iconBg: "bg-orange-500/30",
      iconColor: "text-orange-200",
      change: "0%",
      changeType: "neutral",
    },
    {
      title: "Total Routes",
      value: stats.totalRoutes,
      icon: PiLineSegmentsDuotone,
      color: "from-purple-500/20 to-purple-600/20",
      iconBg: "bg-purple-500/30",
      iconColor: "text-purple-200",
      change: "+1%",
      changeType: "increase",
    },
    {
      title: "Moderators",
      value: stats.totalModerators,
      icon: PiShieldDuotone,
      color: "from-red-500/20 to-red-600/20",
      iconBg: "bg-red-500/30",
      iconColor: "text-red-200",
      change: "0%",
      changeType: "neutral",
    },
    {
      title: "Active Trips",
      value: stats.activeTrips,
      icon: PiMapPinDuotone,
      color: "from-teal-500/20 to-teal-600/20",
      iconBg: "bg-teal-500/30",
      iconColor: "text-teal-200",
      change: "+8%",
      changeType: "increase",
    },
  ];

  return (
    <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
      <h3 className="mb-6 text-lg font-semibold text-white">
        System Statistics
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`group relative rounded-xl bg-gradient-to-r ${stat.color} p-4 ${GLASS_PRESETS.DASHBOARD_CARD}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="mt-1 flex items-center gap-1">
                  <span
                    className={`text-xs ${
                      stat.changeType === "increase"
                        ? "text-green-400"
                        : stat.changeType === "decrease"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-400">vs last month</span>
                </div>
              </div>
              <div className={`rounded-lg ${stat.iconBg} p-3`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStats;
