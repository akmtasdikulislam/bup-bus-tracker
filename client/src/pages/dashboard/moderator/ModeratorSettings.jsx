import { useEffect, useState } from "react";
import {
  PiBellDuotone,
  PiClockDuotone,
  PiDevicesDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiMonitorDuotone,
  PiPaletteDuotone,
  PiShieldDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const ModeratorSettings = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  // Settings states
  const [settings, setSettings] = useState({
    // Profile Settings
    defaultView: "dashboard",

    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    busStatusAlerts: true,
    routeUpdates: true,
    maintenanceAlerts: true,
    systemAlerts: true,
    emergencyAlerts: true,

    // Privacy Settings
    showOnlineStatus: true,
    shareActivityData: true,
    allowSystemMonitoring: true,

    // Display Settings
    darkMode: false,
    language: "bn",
    timeFormat: "24h",
    dateFormat: "dd/mm/yyyy",
    autoRefresh: 30,
    showDetailedStats: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordExpiry: 90,

    // System Settings
    autoAssignments: true,
    systemBackups: true,
    debugMode: false,
    developerMode: false,

    // Accessibility Settings
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    screenReader: false,
  });

  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    navigate("/moderator/profile");
  };

  const handleSettingsClick = () => {
    // Already on settings page
  };

  const handleLogout = () => {
    navigate("/");
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const sections = [
    { id: "profile", title: "Profile", icon: PiUserCircleDuotone },
    { id: "notifications", title: "Notifications", icon: PiBellDuotone },
    { id: "privacy", title: "Privacy", icon: PiShieldDuotone },
    { id: "display", title: "Display", icon: PiPaletteDuotone },
    { id: "security", title: "Security", icon: PiLockDuotone },
    { id: "system", title: "System", icon: PiMonitorDuotone },
    { id: "accessibility", title: "Accessibility", icon: PiEyeDuotone },
    { id: "devices", title: "Devices", icon: PiDevicesDuotone },
  ];

  const languageOptions = [
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const timeFormatOptions = [
    { id: "12h", name: "12 Hour (AM/PM)" },
    { id: "24h", name: "24 Hour" },
  ];

  const dateFormatOptions = [
    { id: "dd/mm/yyyy", name: "DD/MM/YYYY" },
    { id: "mm/dd/yyyy", name: "MM/DD/YYYY" },
    { id: "yyyy-mm-dd", name: "YYYY-MM-DD" },
  ];

  const autoRefreshOptions = [
    { id: 15, name: "15 seconds" },
    { id: 30, name: "30 seconds" },
    { id: 60, name: "1 minute" },
    { id: 120, name: "2 minutes" },
    { id: 300, name: "5 minutes" },
    { id: 0, name: "Never" },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Profile Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Default View
            </label>
            <select
              value={settings.defaultView}
              onChange={(e) => updateSetting("defaultView", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              <option value="dashboard" className="bg-gray-800 text-white">
                Dashboard
              </option>
              <option value="buses" className="bg-gray-800 text-white">
                Buses Management
              </option>
              <option value="routes" className="bg-gray-800 text-white">
                Routes Management
              </option>
              <option value="analytics" className="bg-gray-800 text-white">
                Analytics
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Change Password
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Current Password
            </label>
            <input
              type={showPassword.current ? "text" : "password"}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
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
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
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
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 pr-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
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
          <button className="rounded-lg border border-white/40 bg-green-500/60 px-4 py-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/80 hover:shadow-2xl">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Push Notifications</p>
              <p className="text-sm text-gray-300">
                Receive notifications on your device
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("pushNotifications", !settings.pushNotifications)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.pushNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Email Notifications</p>
              <p className="text-sm text-gray-300">Receive updates via email</p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "emailNotifications",
                  !settings.emailNotifications,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.emailNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">SMS Notifications</p>
              <p className="text-sm text-gray-300">Receive SMS alerts</p>
            </div>
            <button
              onClick={() =>
                updateSetting("smsNotifications", !settings.smsNotifications)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.smsNotifications ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">Alert Types</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Bus Status Alerts</p>
              <p className="text-sm text-gray-300">
                Get notified about bus status changes
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("busStatusAlerts", !settings.busStatusAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.busStatusAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.busStatusAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Route Updates</p>
              <p className="text-sm text-gray-300">
                Updates about route changes
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("routeUpdates", !settings.routeUpdates)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.routeUpdates ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.routeUpdates ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Maintenance Alerts</p>
              <p className="text-sm text-gray-300">
                Bus maintenance notifications
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("maintenanceAlerts", !settings.maintenanceAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.maintenanceAlerts
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">System Alerts</p>
              <p className="text-sm text-gray-300">System status and updates</p>
            </div>
            <button
              onClick={() =>
                updateSetting("systemAlerts", !settings.systemAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.systemAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.systemAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Emergency Alerts</p>
              <p className="text-sm text-gray-300">
                Critical emergency notifications
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("emergencyAlerts", !settings.emergencyAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.emergencyAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emergencyAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show Online Status</p>
              <p className="text-sm text-gray-300">
                Show when you are online to other moderators
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showOnlineStatus", !settings.showOnlineStatus)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showOnlineStatus ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showOnlineStatus ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Share Activity Data</p>
              <p className="text-sm text-gray-300">
                Share activity data for system improvement
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("shareActivityData", !settings.shareActivityData)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.shareActivityData
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.shareActivityData ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Allow System Monitoring</p>
              <p className="text-sm text-gray-300">
                Allow system to monitor your activity
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "allowSystemMonitoring",
                  !settings.allowSystemMonitoring,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.allowSystemMonitoring
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.allowSystemMonitoring
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDisplaySection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Display Preferences
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Dark Mode</p>
              <p className="text-sm text-gray-300">
                Switch between light and dark themes
              </p>
            </div>
            <button
              onClick={() => updateSetting("darkMode", !settings.darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.darkMode ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {languageOptions.map((lang) => (
                <option
                  key={lang.code}
                  value={lang.code}
                  className="bg-gray-800 text-white"
                >
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              <PiClockDuotone className="mr-2 inline h-4 w-4" />
              Time Format
            </label>
            <select
              value={settings.timeFormat}
              onChange={(e) => updateSetting("timeFormat", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {timeFormatOptions.map((format) => (
                <option
                  key={format.id}
                  value={format.id}
                  className="bg-gray-800 text-white"
                >
                  {format.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Date Format
            </label>
            <select
              value={settings.dateFormat}
              onChange={(e) => updateSetting("dateFormat", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {dateFormatOptions.map((format) => (
                <option
                  key={format.id}
                  value={format.id}
                  className="bg-gray-800 text-white"
                >
                  {format.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Auto Refresh
            </label>
            <select
              value={settings.autoRefresh}
              onChange={(e) =>
                updateSetting("autoRefresh", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {autoRefreshOptions.map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  className="bg-gray-800 text-white"
                >
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show Detailed Statistics</p>
              <p className="text-sm text-gray-300">
                Display advanced statistics and analytics
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showDetailedStats", !settings.showDetailedStats)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showDetailedStats
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showDetailedStats ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Security Settings
        </h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Two-Factor Authentication</p>
              <p className="text-sm text-gray-300">
                Add an extra layer of security
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("twoFactorAuth", !settings.twoFactorAuth)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.twoFactorAuth ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactorAuth ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Session Timeout (minutes)
            </label>
            <select
              value={settings.sessionTimeout}
              onChange={(e) =>
                updateSetting("sessionTimeout", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              <option value={15} className="bg-gray-800 text-white">
                15 minutes
              </option>
              <option value={30} className="bg-gray-800 text-white">
                30 minutes
              </option>
              <option value={60} className="bg-gray-800 text-white">
                1 hour
              </option>
              <option value={120} className="bg-gray-800 text-white">
                2 hours
              </option>
              <option value={240} className="bg-gray-800 text-white">
                4 hours
              </option>
              <option value={0} className="bg-gray-800 text-white">
                Never
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Password Expiry (days)
            </label>
            <select
              value={settings.passwordExpiry}
              onChange={(e) =>
                updateSetting("passwordExpiry", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              <option value={30} className="bg-gray-800 text-white">
                30 days
              </option>
              <option value={60} className="bg-gray-800 text-white">
                60 days
              </option>
              <option value={90} className="bg-gray-800 text-white">
                90 days
              </option>
              <option value={180} className="bg-gray-800 text-white">
                180 days
              </option>
              <option value={365} className="bg-gray-800 text-white">
                1 year
              </option>
              <option value={0} className="bg-gray-800 text-white">
                Never
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Active Sessions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Current Device</p>
              <p className="text-sm text-gray-300">
                Windows PC • Chrome • Active now
              </p>
            </div>
            <span className="rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200 backdrop-blur-sm">
              Current
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Mobile Device</p>
              <p className="text-sm text-gray-300">
                Android • Chrome • 2 hours ago
              </p>
            </div>
            <button className="rounded-full border border-red-300/50 bg-red-500/30 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm transition-all duration-300 hover:bg-red-500/50">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          System Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Auto Assignments</p>
              <p className="text-sm text-gray-300">
                Automatically assign drivers to buses
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("autoAssignments", !settings.autoAssignments)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.autoAssignments ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoAssignments ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">System Backups</p>
              <p className="text-sm text-gray-300">
                Enable automatic system backups
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("systemBackups", !settings.systemBackups)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.systemBackups ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.systemBackups ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Debug Mode</p>
              <p className="text-sm text-gray-300">
                Enable debug mode for troubleshooting
              </p>
            </div>
            <button
              onClick={() => updateSetting("debugMode", !settings.debugMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.debugMode ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.debugMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Developer Mode</p>
              <p className="text-sm text-gray-300">
                Enable developer tools and features
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("developerMode", !settings.developerMode)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.developerMode ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.developerMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Accessibility Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">High Contrast</p>
              <p className="text-sm text-gray-300">
                Increase contrast for better visibility
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("highContrast", !settings.highContrast)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.highContrast ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Large Text</p>
              <p className="text-sm text-gray-300">
                Increase font size for better readability
              </p>
            </div>
            <button
              onClick={() => updateSetting("largeText", !settings.largeText)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.largeText ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.largeText ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Reduce Motion</p>
              <p className="text-sm text-gray-300">
                Minimize animations and transitions
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("reduceMotion", !settings.reduceMotion)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.reduceMotion ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.reduceMotion ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Screen Reader Support</p>
              <p className="text-sm text-gray-300">
                Enable screen reader compatibility
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("screenReader", !settings.screenReader)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.screenReader ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.screenReader ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDevicesSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Trusted Devices
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-500 p-2">
                <PiDevicesDuotone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white">Current Device</p>
                <p className="text-sm text-gray-300">
                  Windows PC • Added today
                </p>
              </div>
            </div>
            <span className="rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200 backdrop-blur-sm">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-500 p-2">
                <PiDevicesDuotone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white">Mobile Device</p>
                <p className="text-sm text-gray-300">
                  Android • Added 3 days ago
                </p>
              </div>
            </div>
            <button className="rounded-full border border-red-300/50 bg-red-500/30 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm transition-all duration-300 hover:bg-red-500/50">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "privacy":
        return renderPrivacySection();
      case "display":
        return renderDisplaySection();
      case "security":
        return renderSecuritySection();
      case "system":
        return renderSystemSection();
      case "accessibility":
        return renderAccessibilitySection();
      case "devices":
        return renderDevicesSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0 ${Z_CLASSES.BACKGROUND}`}>
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Header */}
      <Header
        userType="moderator"
        pageTitle="Settings"
        showBackButton={true}
        backButtonPath="/moderator"
        showDateTime={true}
        showNotifications={true}
        showProfile={true}
        showSettings={true}
        showLogout={true}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
        notificationCount={2}
        position="relative"
        className="border-b border-white/30 bg-black/30 shadow-xl backdrop-blur-xl"
        onSettingsPage={true}
      />

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Settings
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-300 ${
                        activeSection === section.id
                          ? "border border-white/40 bg-white/20 text-white"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">{renderContent()}</div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button className="rounded-lg border border-white/40 bg-purple-500/25 px-6 py-3 font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-purple-500/35 hover:shadow-2xl">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModeratorSettings;
