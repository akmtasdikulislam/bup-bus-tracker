import { useEffect, useState } from "react";
import {
  PiBellDuotone,
  PiClockDuotone,
  PiCloudDuotone,
  PiDatabaseDuotone,
  PiDevicesDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiMonitorDuotone,
  PiPaletteDuotone,
  PiShieldDuotone,
  PiUserCircleDuotone,
  PiWarningDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Header from "../../components/common/Header";
import { Z_CLASSES } from "../../utils/zIndexLayers";

const AdminSettings = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(true);

  const [settings, setSettings] = useState({
     
    defaultView: "dashboard",

    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    systemAlerts: true,
    securityAlerts: true,
    userRegistrationAlerts: true,
    performanceAlerts: true,
    backupAlerts: true,
    criticalAlerts: true,

    showOnlineStatus: true,
    shareActivityData: false,
    allowSystemMonitoring: true,
    auditTrail: true,

    darkMode: false,
    language: "bn",
    timeFormat: "24h",
    dateFormat: "dd/mm/yyyy",
    autoRefresh: 15,
    showDetailedStats: true,
    showSystemMetrics: true,

    twoFactorAuth: true,
    sessionTimeout: 30,
    passwordExpiry: 60,
    loginAttemptLimit: 5,
    ipWhitelist: true,

    autoBackups: true,
    maintenanceMode: false,
    debugMode: false,
    developerMode: false,
    systemLogging: true,
    performanceMonitoring: true,

    autoOptimization: true,
    backupRetention: 30,
    queryLogging: true,
    indexOptimization: true,

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
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
     
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
    { id: "database", title: "Database", icon: PiDatabaseDuotone },
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
    { id: 10, name: "10 seconds" },
    { id: 15, name: "15 seconds" },
    { id: 30, name: "30 seconds" },
    { id: 60, name: "1 minute" },
    { id: 120, name: "2 minutes" },
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
              <option value="analytics" className="bg-gray-800 text-white">
                System Analytics
              </option>
              <option value="users" className="bg-gray-800 text-white">
                User Management
              </option>
              <option value="security" className="bg-gray-800 text-white">
                Security Center
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
          <div className="rounded-lg border border-orange-400/30 bg-orange-500/10 p-3">
            <p className="text-xs text-orange-200">
              <PiWarningDuotone className="mr-1 inline h-3 w-3" />
              Admin password changes require 2FA verification and security audit
              logging.
            </p>
          </div>
          <button className="rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35 hover:shadow-2xl">
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
        <h3 className="mb-4 text-lg font-semibold text-white">
          Admin Alert Types
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">System Alerts</p>
              <p className="text-sm text-gray-300">
                System status and maintenance alerts
              </p>
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
              <p className="text-white">Security Alerts</p>
              <p className="text-sm text-gray-300">
                Security incidents and breach attempts
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("securityAlerts", !settings.securityAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.securityAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.securityAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">User Registration Alerts</p>
              <p className="text-sm text-gray-300">
                New user registrations and verifications
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "userRegistrationAlerts",
                  !settings.userRegistrationAlerts,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.userRegistrationAlerts
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.userRegistrationAlerts
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Performance Alerts</p>
              <p className="text-sm text-gray-300">
                System performance and resource usage
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("performanceAlerts", !settings.performanceAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.performanceAlerts
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.performanceAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Backup Alerts</p>
              <p className="text-sm text-gray-300">
                Database backup status and failures
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("backupAlerts", !settings.backupAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.backupAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.backupAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Critical Alerts</p>
              <p className="text-sm text-gray-300">
                Critical system failures and emergencies
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("criticalAlerts", !settings.criticalAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.criticalAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.criticalAlerts ? "translate-x-6" : "translate-x-1"
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
                Show when you are online to other admins
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
                Share admin activity for system analysis
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
                Allow comprehensive system monitoring
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Audit Trail</p>
              <p className="text-sm text-gray-300">
                Enable detailed audit trail logging
              </p>
            </div>
            <button
              onClick={() => updateSetting("auditTrail", !settings.auditTrail)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.auditTrail ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.auditTrail ? "translate-x-6" : "translate-x-1"
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

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show System Metrics</p>
              <p className="text-sm text-gray-300">
                Display real-time system performance metrics
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showSystemMetrics", !settings.showSystemMetrics)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showSystemMetrics
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showSystemMetrics ? "translate-x-6" : "translate-x-1"
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
                Enhanced security with 2FA (Required for Admin)
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
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Login Attempt Limit
            </label>
            <select
              value={settings.loginAttemptLimit}
              onChange={(e) =>
                updateSetting("loginAttemptLimit", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              <option value={3} className="bg-gray-800 text-white">
                3 attempts
              </option>
              <option value={5} className="bg-gray-800 text-white">
                5 attempts
              </option>
              <option value={10} className="bg-gray-800 text-white">
                10 attempts
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">IP Whitelist</p>
              <p className="text-sm text-gray-300">
                Restrict admin access to whitelisted IPs
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("ipWhitelist", !settings.ipWhitelist)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.ipWhitelist ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.ipWhitelist ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Active Admin Sessions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Current Session</p>
              <p className="text-sm text-gray-300">
                Windows PC • Chrome • Active now
              </p>
            </div>
            <span className="rounded-full border border-red-300/50 bg-red-500/30 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm">
              Current
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Mobile Session</p>
              <p className="text-sm text-gray-300">
                iPhone • Safari • 1 hour ago
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
          System Administration
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Auto Backups</p>
              <p className="text-sm text-gray-300">
                Automatically backup system data
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("autoBackups", !settings.autoBackups)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.autoBackups ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoBackups ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Maintenance Mode</p>
              <p className="text-sm text-gray-300">
                Enable system maintenance mode
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("maintenanceMode", !settings.maintenanceMode)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.maintenanceMode ? "bg-orange-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Debug Mode</p>
              <p className="text-sm text-gray-300">
                Enable system debug logging
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
                Enable advanced developer tools
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
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">System Logging</p>
              <p className="text-sm text-gray-300">
                Enable comprehensive system logging
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("systemLogging", !settings.systemLogging)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.systemLogging ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.systemLogging ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Performance Monitoring</p>
              <p className="text-sm text-gray-300">
                Monitor system performance metrics
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "performanceMonitoring",
                  !settings.performanceMonitoring,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.performanceMonitoring
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.performanceMonitoring
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

  const renderDatabaseSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Database Management
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Auto Optimization</p>
              <p className="text-sm text-gray-300">
                Automatically optimize database performance
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("autoOptimization", !settings.autoOptimization)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.autoOptimization ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoOptimization ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              <PiCloudDuotone className="mr-2 inline h-4 w-4" />
              Backup Retention (days)
            </label>
            <select
              value={settings.backupRetention}
              onChange={(e) =>
                updateSetting("backupRetention", parseInt(e.target.value))
              }
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              <option value={7} className="bg-gray-800 text-white">
                7 days
              </option>
              <option value={14} className="bg-gray-800 text-white">
                14 days
              </option>
              <option value={30} className="bg-gray-800 text-white">
                30 days
              </option>
              <option value={90} className="bg-gray-800 text-white">
                90 days
              </option>
              <option value={365} className="bg-gray-800 text-white">
                1 year
              </option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Query Logging</p>
              <p className="text-sm text-gray-300">
                Log database queries for analysis
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("queryLogging", !settings.queryLogging)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.queryLogging ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.queryLogging ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Index Optimization</p>
              <p className="text-sm text-gray-300">
                Automatically optimize database indexes
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("indexOptimization", !settings.indexOptimization)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.indexOptimization
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.indexOptimization ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Database Status
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Database Size</span>
            <span className="text-sm text-white">2.4 GB</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Last Backup</span>
            <span className="text-sm text-white">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Performance Score</span>
            <span className="rounded-full border border-green-300/50 bg-green-500/30 px-2 py-1 text-xs font-medium text-green-200">
              Excellent
            </span>
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
          Trusted Admin Devices
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-red-500 p-2">
                <PiDevicesDuotone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white">Current Device</p>
                <p className="text-sm text-gray-300">
                  Windows PC • Chrome • Added today
                </p>
              </div>
            </div>
            <span className="rounded-full border border-red-300/50 bg-red-500/30 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gray-500 p-2">
                <PiDevicesDuotone className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white">Admin Workstation</p>
                <p className="text-sm text-gray-300">
                  macOS • Safari • Added 1 week ago
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
      case "database":
        return renderDatabaseSection();
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
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-red-400/15 to-orange-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-orange-400/15 to-red-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-red-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      { }
      <Header
        userType="admin"
        pageTitle="Settings"
        showBackButton={true}
        backButtonPath="/admin"
        notificationCount={5}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onSettingsPage={true}
        onLogoutClick={handleLogout}
        currentTime={currentTime}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />

      { }
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8`}
      >
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
          { }
          <aside className="lg:col-span-3 xl:col-span-2">
            <nav className="sticky top-8 space-y-2 rounded-xl border border-white/30 bg-black/30 p-4 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Admin Settings
              </h2>
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-300 ${
                      activeSection === section.id
                        ? "border border-white/40 bg-white/25 text-white shadow-xl backdrop-blur-md"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          { }
          <div className="mt-6 lg:col-span-9 lg:mt-0 xl:col-span-10">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSettings;
