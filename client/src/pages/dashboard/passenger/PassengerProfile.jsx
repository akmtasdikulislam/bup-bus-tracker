import { useState } from "react";
import {
  PiCalendarDuotone,
  PiCheckDuotone,
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiMapPinDuotone,
  PiPencilDuotone,
  PiPhoneDuotone,
  PiStarDuotone,
  PiUserCircleDuotone,
  PiXBold,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const PassengerProfile = () => {
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
    name: "সারা খান",
    nameEn: "Sara Khan",
    studentId: "BCSE-25-001",
    email: "sara.khan@student.bup.edu.bd",
    phone: "+880 1712-345678",
    department: "Computer Science & Engineering",
    semester: "7th Semester",
    admissionDate: "2021-01-15",
    photo:
      "https://images.unsplash.com/photo-1494790108755-2616b292d36d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    address: "Mirpur-12, Dhaka-1216",
    favouriteRoute: "BUP ↔ Savar",
    preferences: {
      notifications: true,
      locationSharing: true,
      darkMode: false,
    },
    stats: {
      totalTrips: 248,
      favouriteRoute: "BUP ↔ Savar",
      lastTrip: "2 hours ago",
      averageRating: 4.8,
    },
    tripHistory: [
      {
        id: 1,
        date: "2024-01-14",
        route: "BUP ↔ Savar",
        busNo: "BUP-001",
        startTime: "08:00 AM",
        endTime: "08:45 AM",
        rating: 5,
      },
      {
        id: 2,
        date: "2024-01-13",
        route: "BUP ↔ Savar",
        busNo: "BUP-002",
        startTime: "07:30 AM",
        endTime: "08:15 AM",
        rating: 4,
      },
      {
        id: 3,
        date: "2024-01-12",
        route: "BUP ↔ Savar",
        busNo: "BUP-001",
        startTime: "09:00 AM",
        endTime: "09:45 AM",
        rating: 5,
      },
    ],
  });

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  const handleProfileClick = () => {
    // Already on profile page
  };

  const handleSettingsClick = () => {
    navigate("/passenger/settings");
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <PiStarDuotone
        key={index}
        className={`h-4 w-4 ${
          index < rating ? "text-yellow-400" : "text-gray-400"
        }`}
      />
    ));
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
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-purple-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-2000" />
      </div>

      {/* Header */}
      <Header
        userType="passenger"
        pageTitle="Profile"
        showBackButton={true}
        backButtonPath="/passenger"
        notificationCount={1}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogout}
        customActions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
            >
              <PiPencilDuotone className="mr-2 inline h-4 w-4" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={() => setShowPasswordChange(true)}
              className={`px-4 py-2 text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
            >
              Change Password
            </button>
          </div>
        }
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
                <div className="absolute -right-2 -bottom-2 rounded-full border-2 border-white/40 bg-blue-500/80 p-2 shadow-xl backdrop-blur-md">
                  <PiUserCircleDuotone className="h-4 w-4 text-white" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">
                  {profileData.name}
                </h2>
                <p className="text-lg text-gray-300 drop-shadow">
                  {profileData.nameEn}
                </p>
                <p className="text-sm text-blue-200 drop-shadow">
                  {profileData.department} • {profileData.semester}
                </p>
                <p className="text-xs text-gray-400 drop-shadow">
                  Student ID: {profileData.studentId}
                </p>
                <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                  <div className="flex items-center gap-1">
                    {renderStars(profileData.stats.averageRating)}
                  </div>
                  <span className="text-xs font-medium text-yellow-200">
                    {profileData.stats.averageRating}/5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">
                  {profileData.stats.totalTrips}
                </div>
                <div className="text-sm text-gray-300">Total Trips</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">
                  {profileData.stats.favouriteRoute}
                </div>
                <div className="text-sm text-gray-300">Favourite Route</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">
                  {profileData.stats.lastTrip}
                </div>
                <div className="text-sm text-gray-300">Last Trip</div>
              </div>
            </div>
            <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">
                  {profileData.stats.averageRating}
                </div>
                <div className="text-sm text-gray-300">Average Rating</div>
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
                      className={`px-3 py-1 text-sm text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
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
                        Student ID
                      </label>
                      <input
                        type="text"
                        value={profileData.studentId}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Department
                      </label>
                      <input
                        type="text"
                        value={profileData.department}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        Current Semester
                      </label>
                      <input
                        type="text"
                        value={profileData.semester}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-200">
                        <PiCalendarDuotone className="mr-2 inline h-4 w-4" />
                        Admission Date
                      </label>
                      <input
                        type="date"
                        value={profileData.admissionDate}
                        disabled
                        className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-200">
                      <PiMapPinDuotone className="mr-2 inline h-4 w-4" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="3"
                      className={`w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT} disabled:opacity-50`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Trip History & Preferences */}
            <div className="space-y-6">
              <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
                <h3 className="mb-4 text-lg font-semibold text-white">
                  Recent Trips
                </h3>
                <div className="space-y-3">
                  {profileData.tripHistory.map((trip) => (
                    <div
                      key={trip.id}
                      className={`rounded-lg p-3 ${GLASS_PRESETS.DASHBOARD_CARD}`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="text-sm font-medium text-white">
                          {trip.route}
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(trip.rating)}
                        </div>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div>Bus: {trip.busNo}</div>
                        <div>Date: {trip.date}</div>
                        <div>Time: {trip.startTime} - {trip.endTime}</div>
                      </div>
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
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${GLASS_PRESETS.NOTIFICATION_BADGE}`}>
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Last Login</span>
                    <span className="text-xs text-gray-400">Active now</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">
                      Favourite Route
                    </span>
                    <span className="text-xs text-gray-400">
                      {profileData.favouriteRoute}
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
          <div className={`relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl ${GLASS_PRESETS.MODAL_CONTAINER}`}>
            <div
              className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 p-6 ${GLASS_PRESETS.HEADER_CONTAINER}`}
            >
              <h2 className="text-xl font-bold text-white">Change Password</h2>
              <button
                onClick={() => setShowPasswordChange(false)}
                className={`p-2 text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
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
                    className={`px-4 py-2 text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className={`px-4 py-2 text-white rounded-lg ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
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

export default PassengerProfile;
