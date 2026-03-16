import { useEffect, useState } from "react";
import {
  PiBellDuotone,
  PiDevicesDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiMapPinDuotone,
  PiPaletteDuotone,
  PiShieldDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const PassengerSettings = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  const [settings, setSettings] = useState({
     
    favouriteRoute: "BUP ↔ Savar",

    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    busArrivalAlerts: true,
    routeUpdates: true,
    maintenanceAlerts: false,

    shareLocation: true,
    publicProfile: false,
    showTripHistory: true,
    dataCollection: true,

    darkMode: false,
    language: "bn",
    mapStyle: "standard",
    showBusNumbers: true,
    showDriverInfo: true,

    twoFactorAuth: false,
    biometricLogin: false,
    autoLogout: 30,

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
    navigate("/passenger/profile");
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
    { id: "accessibility", title: "Accessibility", icon: PiEyeDuotone },
    { id: "devices", title: "Devices", icon: PiDevicesDuotone },
  ];

  const languageOptions = [
    { code: "bn", name: "বাংলা", flag: "🇧🇩" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const mapStyleOptions = [
    { id: "standard", name: "Standard" },
    { id: "satellite", name: "Satellite" },
    { id: "terrain", name: "Terrain" },
    { id: "hybrid", name: "Hybrid" },
  ];

  const routeOptions = [
    {
      id: "BUP ↔ Savar",
      name: "BUP ↔ Savar",
      description: "Main campus to Savar and back",
    },
    {
      id: "BUP ↔ Mirpur",
      name: "BUP ↔ Mirpur",
      description: "Main campus to Mirpur and back",
    },
    {
      id: "BUP ↔ Uttara",
      name: "BUP ↔ Uttara",
      description: "Main campus to Uttara and back",
    },
    {
      id: "BUP ↔ Dhanmondi",
      name: "BUP ↔ Dhanmondi",
      description: "Main campus to Dhanmondi and back",
    },
    {
      id: "BUP ↔ Gulshan",
      name: "BUP ↔ Gulshan",
      description: "Main campus to Gulshan and back",
    },
    {
      id: "BUP ↔ Motijheel",
      name: "BUP ↔ Motijheel",
      description: "Main campus to Motijheel and back",
    },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="সারা খান"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              English Name
            </label>
            <input
              type="text"
              defaultValue="Sara Khan"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Student ID
            </label>
            <input
              type="text"
              defaultValue="BCSE-25-001"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
              readOnly
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+880 1712-345678"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              defaultValue="sara.khan@student.bup.edu.bd"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Address
            </label>
            <textarea
              defaultValue="Mirpur-12, Dhaka-1216"
              rows="3"
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Travel Preferences
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              <PiMapPinDuotone className="mr-2 inline h-4 w-4" />
              Favourite Route
            </label>
            <select
              value={settings.favouriteRoute}
              onChange={(e) => updateSetting("favouriteRoute", e.target.value)}
              className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
            >
              {routeOptions.map((route) => (
                <option
                  key={route.id}
                  value={route.id}
                  className="bg-gray-800 text-white"
                >
                  {route.name}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-300">
              {
                routeOptions.find((r) => r.id === settings.favouriteRoute)
                  ?.description
              }
            </p>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/10 p-4">
            <h4 className="mb-2 text-sm font-medium text-white">
              Current Selection
            </h4>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <PiMapPinDuotone className="h-4 w-4 text-blue-400" />
              <span>{settings.favouriteRoute}</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              This route will be prioritized in notifications and quick access
            </p>
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
                settings.pushNotifications ? "bg-green-500/60" : "bg-gray-500/60"
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
                settings.emailNotifications ? "bg-green-500/60" : "bg-gray-500/60"
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
              <p className="text-white">Bus Arrival Alerts</p>
              <p className="text-sm text-gray-300">
                Get notified when your bus is arriving
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("busArrivalAlerts", !settings.busArrivalAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.busArrivalAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.busArrivalAlerts ? "translate-x-6" : "translate-x-1"
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
                Service maintenance notifications
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("maintenanceAlerts", !settings.maintenanceAlerts)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.maintenanceAlerts ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenanceAlerts ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Route-Specific Notifications
        </h3>
        <div className="space-y-4">
          <div className="rounded-lg border border-blue-400/30 bg-blue-500/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <PiMapPinDuotone className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">
                Favourite Route: {settings.favouriteRoute}
              </span>
            </div>
            <p className="mb-3 text-xs text-gray-300">
              Get priority notifications for your favourite route
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Priority Alerts</p>
                  <p className="text-xs text-gray-400">
                    Get alerts 5 minutes earlier for this route
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-green-500/60">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-white">Delay Notifications</p>
                  <p className="text-xs text-gray-400">
                    Instant alerts for delays on this route
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-green-500/60">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white" />
                </button>
              </div>
            </div>
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
              <p className="text-white">Share Location</p>
              <p className="text-sm text-gray-300">
                Allow location sharing for better service
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("shareLocation", !settings.shareLocation)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.shareLocation ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.shareLocation ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Public Profile</p>
              <p className="text-sm text-gray-300">
                Make your profile visible to others
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("publicProfile", !settings.publicProfile)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.publicProfile ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.publicProfile ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show Trip History</p>
              <p className="text-sm text-gray-300">
                Display your trip history on profile
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showTripHistory", !settings.showTripHistory)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showTripHistory ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showTripHistory ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Data Collection</p>
              <p className="text-sm text-gray-300">
                Allow anonymous data collection for service improvement
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("dataCollection", !settings.dataCollection)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.dataCollection ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.dataCollection ? "translate-x-6" : "translate-x-1"
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

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show Bus Numbers</p>
              <p className="text-sm text-gray-300">
                Display bus numbers on map
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showBusNumbers", !settings.showBusNumbers)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showBusNumbers ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showBusNumbers ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Show Driver Information</p>
              <p className="text-sm text-gray-300">
                Display driver details in bus info
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("showDriverInfo", !settings.showDriverInfo)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.showDriverInfo ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.showDriverInfo ? "translate-x-6" : "translate-x-1"
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

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Biometric Login</p>
              <p className="text-sm text-gray-300">
                Use fingerprint or face ID
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting("biometricLogin", !settings.biometricLogin)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                settings.biometricLogin ? "bg-green-500/60" : "bg-gray-500/60"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.biometricLogin ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-200">
              Auto Logout (minutes)
            </label>
            <select
              value={settings.autoLogout}
              onChange={(e) =>
                updateSetting("autoLogout", parseInt(e.target.value))
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
                iPhone • Safari • 2 hours ago
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
              <div className="rounded-full bg-blue-500 p-2">
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
                <p className="text-white">iPhone 14</p>
                <p className="text-sm text-gray-300">
                  Mobile • Added 3 days ago
                </p>
              </div>
            </div>
            <button className="rounded-full border border-red-300/50 bg-red-500/30 px-3 py-1 text-xs font-medium text-red-200 backdrop-blur-sm transition-all duration-300 hover:bg-red-500/50">
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Device Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Remember this device</p>
              <p className="text-sm text-gray-300">
                Skip 2FA on this device for 30 days
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-green-500/60">
              <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">Sync settings across devices</p>
              <p className="text-sm text-gray-300">
                Keep preferences synchronized
              </p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl bg-green-500/60">
              <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white" />
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
      </div>

      { }
      <Header
        userType="passenger"
        pageTitle="Settings"
        showBackButton={true}
        backButtonPath="/passenger"
        showDateTime={true}
        showNotifications={true}
        showProfile={true}
        showSettings={false}
        showLogout={true}
        onNotificationClick={() => setShowNotifications(!showNotifications)}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
        position="relative"
        className="border-b border-white/30 bg-black/30 shadow-xl backdrop-blur-xl"
        customActions={
          <button
            onClick={() => console.log("Settings saved")}
            className="rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35"
          >
            Save Settings
          </button>
        }
      />

      { }
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          { }
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

          { }
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {renderContent()}
            </div>

            { }
            <div className="mt-6 flex justify-end">
              <button className="rounded-lg border border-white/40 bg-green-500/25 px-6 py-3 font-medium text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35 hover:shadow-2xl">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PassengerSettings;
