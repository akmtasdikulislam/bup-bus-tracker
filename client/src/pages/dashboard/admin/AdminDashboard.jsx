import {
  PiBusDuotone,
  PiChartBarDuotone,
  PiLineSegmentsDuotone,
  PiShieldDuotone,
  PiUserCircleDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import AdminStats from "../../../components/dashboard/admin/AdminStats";
import QuickActions from "../../../components/dashboard/admin/QuickActions";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    // Handle notification click
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
  };

  const handleLogoutClick = () => {
    navigate("/");
  };

  // Admin stats data
  const adminStats = {
    totalPassengers: 2456,
    totalDrivers: 45,
    totalBuses: 12,
    totalRoutes: 8,
    totalModerators: 6,
    activeTrips: 23,
    todayRevenue: "৳45,678",
    monthlyRevenue: "৳1,234,567",
  };

  // Quick actions for admin
  const quickActions = [
    {
      id: 1,
      title: "Manage Passengers",
      description: "View, edit, and manage passenger accounts",
      icon: PiUsersDuotone,
      color: "from-blue-500/20 to-blue-600/20",
      hoverColor: "hover:from-blue-500/30 hover:to-blue-600/30",
      iconBg: "bg-blue-500/30",
      iconColor: "text-blue-200",
      onClick: () => navigate("/admin/passengers"),
    },
    {
      id: 2,
      title: "Manage Drivers",
      description: "View, edit, add, and remove drivers",
      icon: PiUserCircleDuotone,
      color: "from-green-500/20 to-green-600/20",
      hoverColor: "hover:from-green-500/30 hover:to-green-600/30",
      iconBg: "bg-green-500/30",
      iconColor: "text-green-200",
      onClick: () => navigate("/admin/drivers"),
    },
    {
      id: 3,
      title: "Manage Buses",
      description: "View, edit, add, and remove buses",
      icon: PiBusDuotone,
      color: "from-orange-500/20 to-orange-600/20",
      hoverColor: "hover:from-orange-500/30 hover:to-orange-600/30",
      iconBg: "bg-orange-500/30",
      iconColor: "text-orange-200",
      onClick: () => navigate("/admin/buses"),
    },
    {
      id: 4,
      title: "Manage Routes",
      description: "View, edit, add, and remove routes",
      icon: PiLineSegmentsDuotone,
      color: "from-purple-500/20 to-purple-600/20",
      hoverColor: "hover:from-purple-500/30 hover:to-purple-600/30",
      iconBg: "bg-purple-500/30",
      iconColor: "text-purple-200",
      onClick: () => navigate("/admin/routes"),
    },
    {
      id: 5,
      title: "Manage Moderators",
      description: "Add and manage moderator accounts",
      icon: PiShieldDuotone,
      color: "from-red-500/20 to-red-600/20",
      hoverColor: "hover:from-red-500/30 hover:to-red-600/30",
      iconBg: "bg-red-500/30",
      iconColor: "text-red-200",
      onClick: () => navigate("/admin/moderators"),
    },
    {
      id: 6,
      title: "Analytics",
      description: "View system analytics and reports",
      icon: PiChartBarDuotone,
      color: "from-teal-500/20 to-teal-600/20",
      hoverColor: "hover:from-teal-500/30 hover:to-teal-600/30",
      iconBg: "bg-teal-500/30",
      iconColor: "text-teal-200",
      onClick: () => navigate("/admin/analytics"),
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

      {/* Header with Enhanced Glassomorphism */}
      <Header
        userType="admin"
        pageTitle="Dashboard"
        notificationCount={5}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
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
                Welcome to Admin Dashboard
              </h2>
              <p className="text-sm text-gray-300 drop-shadow">
                Manage all aspects of the BUP Bus Tracker system
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <AdminStats stats={adminStats} />

          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

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
                      New passenger registered
                    </p>
                    <p className="text-xs text-gray-300">
                      আহমেদ রহমান - ID: BCSE-25-156
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">2 min ago</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Bus route updated</p>
                    <p className="text-xs text-gray-300">
                      BUP ↔ Savar - Schedule modified
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">15 min ago</p>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">Driver added</p>
                    <p className="text-xs text-gray-300">
                      মোঃ করিম উদ্দিন - License: DL-45678
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
