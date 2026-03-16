import { useEffect, useState } from "react";
import {
  PiBellDuotone,
  PiCarDuotone,
  PiClockDuotone,
  PiDevicesDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiMapPinDuotone,
  PiPaletteDuotone,
  PiShieldDuotone,
  PiSpeakerHighDuotone,
  PiUserCircleDuotone,
  PiWarningDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Header from "../../components/common/Header";
import { Z_CLASSES } from "../../utils/zIndexLayers";

const DriverSettings = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  // Settings states
  const [settings, setSettings] = useState({
    // Profile Settings
    defaultView: "dashboard",

    // Notification Settings
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: true,
    tripNotifications: true,
    passengerNotifications: true,
    routeUpdateNotifications: true,
    emergencyNotifications: true,
    trafficNotifications: true,

    // Privacy Settings
    showOnlineStatus: true,
    shareLocationData: true,
    allowPassengerRating: true,
    sharePerformanceData: false,

    // Display Settings
    darkMode: false,
    language: "bn",
    timeFormat: "24h",
    dateFormat: "dd/mm/yyyy",
    mapStyle: "default",
    autoRefresh: 15,
    showTrafficInfo: true,

    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttemptLimit: 5,

    // Driver Settings
    autoAcceptTrips: false,
    breakReminders: true,
    fuelReminders: true,
    maintenanceReminders: true,
    speedLimitWarnings: true,

    // Sound & Alerts
    soundEnabled: true,
    vibrationEnabled: true,
    voiceGuidance: true,
    navigationSound: true,
    alertVolume: 70,

    // Accessibility Settings
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    voiceAssistant: false,
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

  const handleLogout = () => {
    navigate("/");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
    { id: "driver", title: "Driver", icon: PiCarDuotone },
    { id: "sounds", title: "Sound & Alerts", icon: PiSpeakerHighDuotone },
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

  const mapStyleOptions = [
    { id: "default", name: "Default" },
    { id: "satellite", name: "Satellite" },
    { id: "hybrid", name: "Hybrid" },
    { id: "terrain", name: "Terrain" },
  ];

  const autoRefreshOptions = [
    { id: 5, name: "5 seconds" },
    { id: 10, name: "10 seconds" },
    { id: 15, name: "15 seconds" },
    { id: 30, name: "30 seconds" },
    { id: 60, name: "1 minute" },
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
              <option value="trips" className="bg-gray-800 text-white">
                Trips
              </option>
              <option value="routes" className="bg-gray-800 text-white">
                Routes
              </option>
              <option value="profile" className="bg-gray-800 text-white">
                Profile
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
              Driver password changes are logged for security audit.
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
          Driver Alert Types
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Trip Notifications</p>
              <p className="text-sm text-gray-300">
                New trip assignments and updates
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("tripNotifications", !settings.tripNotifications)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.tripNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.tripNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Passenger Notifications</p>
              <p className="text-sm text-gray-300">
                Passenger requests and messages
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "passengerNotifications",
                  !settings.passengerNotifications,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.passengerNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.passengerNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Route Update Notifications</p>
              <p className="text-sm text-gray-300">
                Route changes and traffic updates
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "routeUpdateNotifications",
                  !settings.routeUpdateNotifications,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.routeUpdateNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.routeUpdateNotifications
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Emergency Notifications</p>
              <p className="text-sm text-gray-300">
                Emergency alerts and critical updates
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "emergencyNotifications",
                  !settings.emergencyNotifications,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.emergencyNotifications
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emergencyNotifications
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
                Show when you are online to passengers
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
              <p className="text-white">Share Location Data</p>
              <p className="text-sm text-gray-300">
                Share your location with passengers during trips
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("shareLocationData", !settings.shareLocationData)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.shareLocationData
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.shareLocationData ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Allow Passenger Rating</p>
              <p className="text-sm text-gray-300">
                Allow passengers to rate your performance
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "allowPassengerRating",
                  !settings.allowPassengerRating,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.allowPassengerRating
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.allowPassengerRating
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
              <PiMapPinDuotone className="mr-2 inline h-4 w-4" />
              Map Style
            </label>
            <select
              value={settings.mapStyle}
              onChange={(e) => updateSetting("mapStyle", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {mapStyleOptions.map((style) => (
                <option
                  key={style.id}
                  value={style.id}
                  className="bg-gray-800 text-white"
                >
                  {style.name}
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
              <p className="text-white">Show Traffic Information</p>
              <p className="text-sm text-gray-300">
                Display real-time traffic data on maps
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showTrafficInfo", !settings.showTrafficInfo)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showTrafficInfo ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showTrafficInfo ? "translate-x-6" : "translate-x-1"
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
                Enhanced security with 2FA
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
        </div>
      </div>
    </div>
  );

  const renderDriverSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Driver Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Auto Accept Trips</p>
              <p className="text-sm text-gray-300">
                Automatically accept assigned trips
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("autoAcceptTrips", !settings.autoAcceptTrips)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.autoAcceptTrips ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoAcceptTrips ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Break Reminders</p>
              <p className="text-sm text-gray-300">
                Remind to take breaks during long trips
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("breakReminders", !settings.breakReminders)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.breakReminders ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.breakReminders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Fuel Reminders</p>
              <p className="text-sm text-gray-300">
                Remind about fuel level and refueling
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("fuelReminders", !settings.fuelReminders)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.fuelReminders ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.fuelReminders ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Maintenance Reminders</p>
              <p className="text-sm text-gray-300">
                Remind about vehicle maintenance
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "maintenanceReminders",
                  !settings.maintenanceReminders,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.maintenanceReminders
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceReminders
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Speed Limit Warnings</p>
              <p className="text-sm text-gray-300">
                Warn when exceeding speed limits
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting(
                  "speedLimitWarnings",
                  !settings.speedLimitWarnings,
                )
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.speedLimitWarnings
                  ? "bg-green-500/60"
                  : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.speedLimitWarnings
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

  const renderSoundsSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Sound & Alert Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Sound Enabled</p>
              <p className="text-sm text-gray-300">
                Enable sound for notifications and alerts
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("soundEnabled", !settings.soundEnabled)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.soundEnabled ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.soundEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Vibration Enabled</p>
              <p className="text-sm text-gray-300">
                Enable vibration for notifications
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("vibrationEnabled", !settings.vibrationEnabled)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.vibrationEnabled ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.vibrationEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Voice Guidance</p>
              <p className="text-sm text-gray-300">
                Enable voice guidance for navigation
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("voiceGuidance", !settings.voiceGuidance)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.voiceGuidance ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.voiceGuidance ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Alert Volume: {settings.alertVolume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.alertVolume}
              onChange={(e) =>
                updateSetting("alertVolume", parseInt(e.target.value))
              }
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-700"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessibilitySection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Accessibility Settings
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
                Increase text size for better readability
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
                Reduce animations and transitions
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
              <p className="text-white">Voice Assistant</p>
              <p className="text-sm text-gray-300">
                Enable voice assistant support
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("voiceAssistant", !settings.voiceAssistant)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.voiceAssistant ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.voiceAssistant ? "translate-x-6" : "translate-x-1"
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
          Active Driver Sessions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Current Session</p>
              <p className="text-sm text-gray-300">
                Android • Chrome • Active now
              </p>
            </div>
            <span className="rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200 backdrop-blur-sm">
              Current
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/10 p-4">
            <div>
              <p className="text-white">Mobile App</p>
              <p className="text-sm text-gray-300">
                iOS • Safari • 2 hours ago
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
      case "driver":
        return renderDriverSection();
      case "sounds":
        return renderSoundsSection();
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
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-green-400/15 blur-xl delay-2000" />
      </div>

      {/* Header */}
      <Header
        userType="driver"
        pageTitle="Profile"
        showBackButton={true}
        backButtonPath="/driver/dashboard"
        notificationCount={3}
        onLogoutClick={handleLogout}
        onNotificationClick={toggleNotifications}
        onSettingsPage={true}
      />

      {/* Main Content */}
      <main
        className={`relative ${Z_CLASSES.CONTENT} mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8`}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-semibold text-white">
                Settings
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? "border border-white/40 bg-white/20 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <section.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default DriverSettings;
