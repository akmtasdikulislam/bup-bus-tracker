import {
  PiBusDuotone,
  PiChartBarDuotone,
  PiLineSegmentsDuotone,
  PiPlusBold,
  PiShieldCheckDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import ModeratorQuickActions from "../../../components/dashboard/moderator/ModeratorQuickActions";
import ModeratorStats from "../../../components/dashboard/moderator/ModeratorStats";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const ModeratorDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("/moderator/profile");
  };

  const handleSettings = () => {
    navigate("/moderator/settings");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  // Moderator stats data
  const moderatorStats = {
    totalBuses: 12,
    totalRoutes: 8,
    activeBuses: 10,
    activeRoutes: 6,
    busesInMaintenance: 2,
    inactiveRoutes: 2,
    todayTrips: 45,
    thisWeekTrips: 312,
  };

  // Quick actions for moderator
  const quickActions = [
    {
      id: 1,
      title: "Manage Buses",
      description: "View, edit, add, and remove buses",
      icon: PiBusDuotone,
      color: "from-orange-500/20 to-orange-600/20",
      hoverColor: "hover:from-orange-500/30 hover:to-orange-600/30",
      iconBg: "bg-orange-500/30",
      iconColor: "text-orange-200",
      onClick: () => navigate("/moderator/buses"),
    },
    {
      id: 2,
      title: "Manage Routes",
      description: "View, edit, add, and remove routes",
      icon: PiLineSegmentsDuotone,
      color: "from-purple-500/20 to-purple-600/20",
      hoverColor: "hover:from-purple-500/30 hover:to-purple-600/30",
      iconBg: "bg-purple-500/30",
      iconColor: "text-purple-200",
      onClick: () => navigate("/moderator/routes"),
    },
    {
      id: 3,
      title: "Add New Bus",
      description: "Register a new bus in the system",
      icon: PiPlusBold,
      color: "from-green-500/20 to-green-600/20",
      hoverColor: "hover:from-green-500/30 hover:to-green-600/30",
      iconBg: "bg-green-500/30",
      iconColor: "text-green-200",
      onClick: () => navigate("/moderator/buses?action=add"),
    },
    {
      id: 4,
      title: "Add New Route",
      description: "Create a new route for the system",
      icon: PiPlusBold,
      color: "from-blue-500/20 to-blue-600/20",
      hoverColor: "hover:from-blue-500/30 hover:to-blue-600/30",
      iconBg: "bg-blue-500/30",
      iconColor: "text-blue-200",
      onClick: () => navigate("/moderator/routes?action=add"),
    },
    {
      id: 5,
      title: "Analytics",
      description: "View transport analytics and reports",
      icon: PiChartBarDuotone,
      color: "from-teal-500/20 to-teal-600/20",
      hoverColor: "hover:from-teal-500/30 hover:to-teal-600/30",
      iconBg: "bg-teal-500/30",
      iconColor: "text-teal-200",
      onClick: () => navigate("/moderator/analytics"),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background with Glassomorphism */}
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      {/* Header */}
      <Header
        userType="moderator"
        pageTitle="Dashboard"
        notificationCount={2}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfile}
        onSettingsClick={handleSettings}
        onLogoutClick={handleLogout}
      />

      {/* Main Content */}
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8`}
      >
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                Welcome to Moderator Dashboard
              </h2>
              <p className="text-sm text-gray-300 drop-shadow">
                Manage buses and routes for the BUP Bus Tracker system
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <ModeratorStats stats={moderatorStats} />

          {/* Quick Actions */}
          <ModeratorQuickActions actions={quickActions} />

          {/* Recent Activity */}
          <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">
                      Bus BUP-007 added to system
                    </p>
                    <p className="text-xs text-gray-300">
                      Ashok Leyland Viking - 45 seats
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">30 min ago</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Route schedule updated</p>
                    <p className="text-xs text-gray-300">
                      ঢাকা - সাভার - New morning schedule added
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">
                      Bus maintenance completed
                    </p>
                    <p className="text-xs text-gray-300">
                      BUP-003 - Regular maintenance service
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">New route created</p>
                    <p className="text-xs text-gray-300">
                      ঢাকা - বনানী - BUP Campus route
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModeratorDashboard;
