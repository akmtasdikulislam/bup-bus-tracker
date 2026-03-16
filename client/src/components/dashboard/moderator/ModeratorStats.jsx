import {
  PiBusDuotone,
  PiLineSegmentsDuotone,
  PiCheckCircleDuotone,
  PiWarningCircleDuotone,
  PiClockDuotone,
  PiXCircleDuotone,
  PiCalendarDuotone,
  PiChartBarDuotone,
} from "react-icons/pi";

const ModeratorStats = ({ stats }) => {
  const statsData = [
    {
      title: "Total Buses",
      value: stats.totalBuses,
      icon: PiBusDuotone,
      color: "from-orange-500/20 to-orange-600/20",
      iconBg: "bg-orange-500/30",
      iconColor: "text-orange-200",
      description: "All buses in system",
    },
    {
      title: "Total Routes",
      value: stats.totalRoutes,
      icon: PiLineSegmentsDuotone,
      color: "from-purple-500/20 to-purple-600/20",
      iconBg: "bg-purple-500/30",
      iconColor: "text-purple-200",
      description: "All routes configured",
    },
    {
      title: "Active Buses",
      value: stats.activeBuses,
      icon: PiCheckCircleDuotone,
      color: "from-green-500/20 to-green-600/20",
      iconBg: "bg-green-500/30",
      iconColor: "text-green-200",
      description: "Currently operational",
    },
    {
      title: "Active Routes",
      value: stats.activeRoutes,
      icon: PiCheckCircleDuotone,
      color: "from-blue-500/20 to-blue-600/20",
      iconBg: "bg-blue-500/30",
      iconColor: "text-blue-200",
      description: "Currently running",
    },
    {
      title: "Buses in Maintenance",
      value: stats.busesInMaintenance,
      icon: PiWarningCircleDuotone,
      color: "from-yellow-500/20 to-yellow-600/20",
      iconBg: "bg-yellow-500/30",
      iconColor: "text-yellow-200",
      description: "Under maintenance",
    },
    {
      title: "Inactive Routes",
      value: stats.inactiveRoutes,
      icon: PiXCircleDuotone,
      color: "from-red-500/20 to-red-600/20",
      iconBg: "bg-red-500/30",
      iconColor: "text-red-200",
      description: "Not currently active",
    },
    {
      title: "Today's Trips",
      value: stats.todayTrips,
      icon: PiCalendarDuotone,
      color: "from-teal-500/20 to-teal-600/20",
      iconBg: "bg-teal-500/30",
      iconColor: "text-teal-200",
      description: "Trips completed today",
    },
    {
      title: "This Week's Trips",
      value: stats.thisWeekTrips,
      icon: PiChartBarDuotone,
      color: "from-indigo-500/20 to-indigo-600/20",
      iconBg: "bg-indigo-500/30",
      iconColor: "text-indigo-200",
      description: "Weekly trip count",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className={`group relative rounded-xl border border-white/30 bg-gradient-to-r ${stat.color} p-6 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`mb-3 inline-flex rounded-lg ${stat.iconBg} p-2`}>
                <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
              </div>
              <h3 className="text-sm font-medium text-white/90">{stat.title}</h3>
              <p className="text-2xl font-bold text-white drop-shadow-lg">
                {stat.value}
              </p>
              <p className="text-xs text-gray-300 drop-shadow">
                {stat.description}
              </p>
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      ))}
    </div>
  );
};

export default ModeratorStats;
