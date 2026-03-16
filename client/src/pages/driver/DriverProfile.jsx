import { useState } from "react";
import {
  PiCalendarDuotone,
  PiCameraDuotone,
  PiCheckDuotone,
  PiClockDuotone,
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiPencilDuotone,
  PiPhoneDuotone,
  PiShieldDuotone,
  PiStarDuotone,
  PiUserCircleDuotone,
  PiXBold,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Header from "../../components/common/Header";
import { GLASS_PRESETS } from "../../utils/glassomorphism";
import { Z_CLASSES } from "../../utils/zIndexLayers";

const DriverProfile = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Driver data (in a real app, this would come from an API)
  const [profileData, setProfileData] = useState({
    name: "মোহাম্মদ রহিম উদ্দিন",
    nameEn: "Mohammad Rahim Uddin",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    licenseNo: "DL-1234567890",
    idNo: "1234567890123",
    phone: "+880 1712-345678",
    email: "rahim.driver@bup.edu.bd",
    address: "Mirpur-10, Dhaka-1216",
    experience: "8 years",
    rating: 4.8,
    totalTrips: 1247,
    joinDate: "2016-03-15",
    emergencyContact: "+880 1555-123456",
    bloodGroup: "B+",
    dateOfBirth: "1985-05-12",
    designation: "Professional Driver",
    workingHours: "06:00 AM - 08:00 PM",
    busAssigned: "BUP-BUS-001",
    stats: {
      totalTrips: 1247,
      totalDistance: "45,678 km",
      averageRating: 4.8,
      onTimePercentage: 96.5,
      fuelEfficiency: "12.5 km/l",
      safetyScore: 98,
    },
  });

  const handleLogout = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate("/driver/settings");
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
    // Show success message
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChangePassword = () => {
    setShowPasswordChange(false);
    // Show success message
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({ ...prev, photo: e.target.result }));
      };
      reader.readAsDataURL(file);
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
        backButtonPath="/driver"
        notificationCount={3}
        onLogoutClick={handleLogout}
        onNotificationClick={toggleNotifications}
        onSettingsClick={handleSettings}
        onProfilePage={true}
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
                <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-white/40 bg-green-500/80 p-2 shadow-xl backdrop-blur-md">
                  <PiUserCircleDuotone className="h-4 w-4 text-white" />
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:opacity-100">
                    <PiCameraDuotone className="h-8 w-8" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {profileData.name}
                </h2>
                <p className="text-lg text-gray-300 drop-shadow">
                  {profileData.nameEn}
                </p>
                <p className="text-sm text-red-200 drop-shadow">
                  {profileData.designation} • Bus: {profileData.busAssigned}
                </p>
                <p className="text-xs text-gray-400 drop-shadow">
                  License: {profileData.licenseNo}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                  <PiStarDuotone className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-medium text-yellow-200">
                    {profileData.rating} Rating • {profileData.experience}{" "}
                    Experience
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-blue-500/35"
                >
                  <PiPencilDuotone className="mr-2 inline h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
                <button
                  onClick={() => setShowPasswordChange(true)}
                  className="rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Driver Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {profileData.stats.totalTrips}
                </div>
                <div className="text-sm text-gray-300">Total Trips</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">
                  {profileData.stats.totalDistance}
                </div>
                <div className="text-sm text-gray-300">Total Distance</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {profileData.stats.averageRating}
                </div>
                <div className="text-sm text-gray-300">Average Rating</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">
                  {profileData.stats.onTimePercentage}%
                </div>
                <div className="text-sm text-gray-300">On-Time Performance</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-400">
                  {profileData.stats.fuelEfficiency}
                </div>
                <div className="text-sm text-gray-300">Fuel Efficiency</div>
              </div>
            </div>
            <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">
                  {profileData.stats.safetyScore}
                </div>
                <div className="text-sm text-gray-300">Safety Score</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Personal Information */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Personal Information
                  </h3>
                  {isEditing && (
                    <button
                      onClick={handleSaveProfile}
                      className="rounded-lg border border-white/40 bg-green-500/25 px-3 py-1 text-sm text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-green-500/35"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiMapPinDuotone className="mr-2 inline h-4 w-4" />
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Emergency Contact
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact"
                        value={profileData.emergencyContact}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiIdentificationCardDuotone className="mr-2 inline h-4 w-4" />
                        License Number
                      </label>
                      <input
                        type="text"
                        value={profileData.licenseNo}
                        disabled
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 opacity-50 backdrop-blur-md"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 opacity-50 backdrop-blur-md"
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
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Blood Group
                      </label>
                      <input
                        type="text"
                        name="bloodGroup"
                        value={profileData.bloodGroup}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Status & Info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Driver Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Account Status
                    </span>
                    <span className="rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      License Status
                    </span>
                    <span className="rounded-full border border-green-300/50 bg-green-500/30 px-3 py-1 text-xs font-medium text-green-200">
                      Valid
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Last Trip</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Next Trip</span>
                    <span className="text-xs text-gray-400">
                      Tomorrow 8:00 AM
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Professional Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-3">
                    <PiShieldDuotone className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white">
                      Professional Driver
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-3">
                    <PiUserCircleDuotone className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-white">
                      {profileData.experience} Experience
                    </span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-white/20 bg-white/10 p-3">
                    <PiStarDuotone className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-white">
                      Rating: {profileData.rating}/5
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
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-white/30 bg-black/80 backdrop-blur-xl">
            <div
              className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 bg-black/90 p-6`}
            >
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setShowPasswordChange(false)}
                className="rounded-lg border border-white/40 bg-white/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
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
                    <PiShieldDuotone className="mr-1 inline h-3 w-3" />
                    Driver password changes are logged for security audit.
                  </p>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowPasswordChange(false)}
                    className="rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-green-500/35"
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

export default DriverProfile;
