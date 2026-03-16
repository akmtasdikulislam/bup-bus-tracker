import { useState } from "react";
import {
  PiCalendarDuotone,
  PiCheckDuotone,
  PiClockDuotone,
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiPencilDuotone,
  PiPhoneDuotone,
  PiShieldCheckDuotone,
  PiXBold,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const ModeratorProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileData, setProfileData] = useState({
    name: "মোহাম্মদ রহিম উদ্দিন",
    nameEn: "Mohammad Rahim Uddin",
    employeeId: "MOD-2024-001",
    email: "rahim.uddin@bup.edu.bd",
    phone: "+880 1712-345678",
    department: "Transport Management",
    designation: "Transport Moderator",
    joinDate: "2024-01-15",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    workingHours: "09:00 AM - 06:00 PM",
    permissions: [
      "Bus Management",
      "Route Management",
      "Driver Assignment",
      "System Monitoring",
      "Report Generation",
    ],
    stats: {
      totalBusesManaged: 12,
      totalRoutesManaged: 8,
      monthlyTripsSupervised: 342,
      systemUptime: "99.8%",
    },
  });

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
     
  };

  const handleSettingsClick = () => {
    navigate("/moderator/settings");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
     
    setIsEditing(false);
     
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = () => {
     
    setShowPasswordChange(false);
     
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      { }
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        { }
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      { }
      <Header
        userType="moderator"
        pageTitle="Profile"
        showBackButton={true}
        backButtonPath="/moderator"
        notificationCount={2}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onProfilePage={true}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
      />

      { }
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8`}
      >
        <div className="space-y-6">
          { }
          <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="h-32 w-32 rounded-full border-4 border-white/30 object-cover shadow-xl"
                />
                <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-white/40 bg-green-500/80 p-2 shadow-xl backdrop-blur-md">
                  <PiShieldCheckDuotone className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {profileData.name}
                </h2>
                <p className="text-lg text-gray-300 drop-shadow">
                  {profileData.nameEn}
                </p>
                <p className="text-sm text-purple-200 drop-shadow">
                  {profileData.designation} • {profileData.department}
                </p>
                <p className="text-xs text-gray-400 drop-shadow">
                  Employee ID: {profileData.employeeId}
                </p>
              </div>
              <div className="flex items-center gap-2">
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

          { }
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {profileData.stats.totalBusesManaged}
                </div>
                <div className="text-sm text-gray-300">Buses Managed</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {profileData.stats.totalRoutesManaged}
                </div>
                <div className="text-sm text-gray-300">Routes Managed</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {profileData.stats.monthlyTripsSupervised}
                </div>
                <div className="text-sm text-gray-300">Monthly Trips</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">
                  {profileData.stats.systemUptime}
                </div>
                <div className="text-sm text-gray-300">System Uptime</div>
              </div>
            </div>
          </div>

          { }
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            { }
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
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
                        className={`w-full px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                  </div>

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
                      className={`w-full px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                    />
                  </div>
                </div>
              </div>
            </div>

            { }
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
                      <PiShieldCheckDuotone className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Account Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Account Status
                    </span>
                    <span
                      className={`rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200 backdrop-blur-sm`}
                    >
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Last Login</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Password Last Changed
                    </span>
                    <span className="text-xs text-gray-400">30 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      { }
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

export default ModeratorProfile;
