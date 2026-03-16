import { useState } from "react";
import {
  PiCalendarDuotone,
  PiCheckDuotone,
  PiClockDuotone,
  PiCrownDuotone,
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiPencilDuotone,
  PiPhoneDuotone,
  PiShieldDuotone,
  PiStarDuotone,
  PiXBold,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Header from "../../components/common/Header";
import { GLASS_PRESETS } from "../../utils/glassomorphism";
import { Z_CLASSES } from "../../utils/zIndexLayers";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Profile data
  const [profileData, setProfileData] = useState({
    name: "প্রফেসর ড. আব্দুল হাই",
    nameEn: "Professor Dr. Abdul Hai",
    employeeId: "ADMIN-2024-001",
    email: "admin.hai@bup.edu.bd",
    phone: "+880 1711-123456",
    department: "Administration",
    designation: "System Administrator",
    rank: "Administrator",
    joinDate: "2020-01-01",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    workingHours: "08:00 AM - 08:00 PM",
    permissions: [
      "System Administration",
      "User Management",
      "Content Management",
      "Security Management",
      "Database Administration",
      "Report Generation",
      "System Configuration",
      "Backup Management",
    ],
    stats: {
      totalUsersManaged: 2500,
      totalSystemUptime: "99.9%",
      securityIncidents: 0,
      monthlyActiveUsers: 2456,
      systemBackups: 30,
      criticalAlerts: 2,
    },
  });

  const handleLogout = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/admin/settings");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    // Already on profile page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
    // Show success message
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = () => {
    // Change password logic here
    setShowPasswordChange(false);
    // Show success message
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Background */}
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-red-400/15 to-orange-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-orange-400/15 to-red-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-red-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      {/* Header */}
      <Header
        userType="admin"
        pageTitle="Profile"
        showBackButton={true}
        backButtonPath="/admin"
        notificationCount={5}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onProfilePage={true}
        onSettingsClick={handleSettings}
        onLogoutClick={handleLogout}
      />

      {/* Main Content */}
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8`}
      >
        <div className="space-y-6">
          {/* Profile Header */}
          <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white/30 object-cover shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-white/40 bg-red-500/80 p-2 shadow-xl backdrop-blur-md">
                  <PiCrownDuotone className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {profileData.name}
                </h2>
                <p className="text-lg text-gray-300 drop-shadow">
                  {profileData.nameEn}
                </p>
                <p className="text-sm text-red-200 drop-shadow">
                  {profileData.designation} • {profileData.department}
                </p>
                <p className="text-xs text-gray-400 drop-shadow">
                  Employee ID: {profileData.employeeId}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                  <PiStarDuotone className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-200">
                    Super Administrator
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`rounded-lg px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                >
                  <PiPencilDuotone className="mr-2 inline h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className={`rounded-lg px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {profileData.stats.totalUsersManaged.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">Total Users Managed</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {profileData.stats.totalSystemUptime}
                </div>
                <div className="text-sm text-gray-300">System Uptime</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">
                  {profileData.stats.securityIncidents}
                </div>
                <div className="text-sm text-gray-300">Security Incidents</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {profileData.stats.monthlyActiveUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-300">
                  Monthly Active Users
                </div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">
                  {profileData.stats.systemBackups}
                </div>
                <div className="text-sm text-gray-300">System Backups</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {profileData.stats.criticalAlerts}
                </div>
                <div className="text-sm text-gray-300">Critical Alerts</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Personal Information
                  </h3>
                  {isEditing && (
                    <button
                      onClick={handleSaveProfile}
                      className={`rounded-lg px-3 py-1 text-sm text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                    >
                      <PiCheckDuotone className="mr-1 inline h-3 w-3" />
                      Save
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Full Name (Bengali)
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Full Name (English)
                      </label>
                      <input
                        type="text"
                        name="nameEn"
                        value={profileData.nameEn}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiEnvelopeDuotone className="mr-2 inline h-4 w-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiPhoneDuotone className="mr-2 inline h-4 w-4" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Department
                      </label>
                      <input
                        type="text"
                        name="department"
                        value={profileData.department}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Designation
                      </label>
                      <input
                        type="text"
                        name="designation"
                        value={profileData.designation}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Employee ID
                      </label>
                      <input
                        type="text"
                        value={profileData.employeeId}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiCalendarDuotone className="mr-2 inline h-4 w-4" />
                        Join Date
                      </label>
                      <input
                        type="date"
                        value={profileData.joinDate}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiClockDuotone className="mr-2 inline h-4 w-4" />
                        Working Hours
                      </label>
                      <input
                        type="text"
                        name="workingHours"
                        value={profileData.workingHours}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Admin Rank
                      </label>
                      <input
                        type="text"
                        value={profileData.rank}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions & Access */}
            <div className="space-y-6">
              <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  System Permissions
                </h3>
                <div className="space-y-3">
                  {profileData.permissions.map((permission, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}
                    >
                      <PiShieldDuotone className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Admin Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Account Status
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${GLASS_PRESETS.NOTIFICATION_BADGE}`}
                    >
                      Super Admin
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Last Login</span>
                    <span className="text-xs text-gray-400">
                      Currently online
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Password Last Changed
                    </span>
                    <span className="text-xs text-gray-400">15 days ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">2FA Status</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${GLASS_PRESETS.NOTIFICATION_BADGE}`}
                    >
                      Enabled
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Change Password Modal */}
      {showPasswordChange && (
        <div
          className={`fixed inset-0 ${Z_CLASSES.MODAL} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
        >
          <div
            className={`relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl ${GLASS_PRESETS.MODAL_CONTAINER}`}
          >
            <div
              className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 p-6 ${GLASS_PRESETS.HEADER_CONTAINER}`}
            >
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setShowPasswordChange(false)}
                className={`rounded-lg p-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
              >
                <PiXBold className="h-5 w-5" />
              </button>
            </div>
            <div className={`relative ${Z_CLASSES.MODAL_CONTENT} p-6`}>
              <div className="space-y-4">
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-gray-200">
                    Current Password
                  </label>
                  <input
                    type={showPassword.current ? "text" : "password"}
                    className={`w-full rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("current")}
                    className="absolute top-9 right-3 text-gray-300 hover:text-white"
                  >
                    {showPassword.current ? (
                      <PiEyeSlashDuotone className="h-5 w-5" />
                    ) : (
                      <PiEyeDuotone className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-gray-200">
                    New Password
                  </label>
                  <input
                    type={showPassword.new ? "text" : "password"}
                    className={`w-full rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute top-9 right-3 text-gray-300 hover:text-white"
                  >
                    {showPassword.new ? (
                      <PiEyeSlashDuotone className="h-5 w-5" />
                    ) : (
                      <PiEyeDuotone className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-gray-200">
                    Confirm New Password
                  </label>
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    className={`w-full rounded-lg px-3 py-2 pr-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute top-9 right-3 text-gray-300 hover:text-white"
                  >
                    {showPassword.confirm ? (
                      <PiEyeSlashDuotone className="h-5 w-5" />
                    ) : (
                      <PiEyeDuotone className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div
                  className={`rounded-lg p-3 ${GLASS_PRESETS.NOTIFICATION_BADGE}`}
                >
                  <p className="text-xs text-orange-200">
                    <PiShieldDuotone className="mr-1 inline h-3 w-3" />
                    Admin password changes require additional verification and
                    will be logged for security audit.
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowPasswordChange(false)}
                    className={`rounded-lg px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className={`rounded-lg px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
