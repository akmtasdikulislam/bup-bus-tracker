import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiBellDuotone,
  PiGearDuotone,
  PiSignOutDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import Logo from "../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS } from "../../utils/glassomorphism";
import { Z_CLASSES } from "../../utils/zIndexLayers";

const Header = ({
  userType = "admin",  
  pageTitle = "Dashboard",
  showBackButton = false,
  backButtonPath = "/",
  showDateTime = true,
  showNotifications = true,
  showProfile = true,
  onProfilePage = false,
  showSettings = true,
  onSettingsPage = false,
  showLogout = true,
  notificationCount = 0,
  onNotificationClick,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
  className = "",
  position = "relative",  
  customActions = null,  
  customPageTitle = "",  
}) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    if (backButtonPath) {
      navigate(backButtonPath);
    } else {
      navigate(-1);
    }
  };

  const handleNotificationClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
    if (onNotificationClick) {
      onNotificationClick();
    }
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate(`/${userType}/profile`);
    }
  };

  const handleSettingsClick = () => {
    if (onSettingsClick) {
      onSettingsClick();
    } else {
      navigate(`/${userType}/settings`);
    }
  };

  const handleLogoutClick = () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      navigate("/");
    }
  };

  const getUserTypeColor = () => {
    switch (userType) {
      case "admin":
        return "text-red-200";
      case "passenger":
        return "text-blue-200";
      case "driver":
        return "text-green-200";
      case "moderator":
        return "text-purple-200";
      default:
        return "text-gray-200";
    }
  };

  const getPageTitle = () => {
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    return `${customPageTitle ? customPageTitle : capitalize(userType)} ${pageTitle}`;
  };

  const positionClasses = {
    relative: "relative",
    sticky: "sticky top-0",
    fixed: "fixed top-0 left-0 right-0",
  };

  return (
    <header
      className={`${positionClasses[position]} ${Z_CLASSES.HEADER} ${GLASS_PRESETS.HEADER_CONTAINER} ${className}`}
    >
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          { }
          <div className="flex items-center gap-2">
            { }
            <button
              onClick={handleLogoClick}
              className="flex items-center gap-3 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-white/10"
            >
              <img
                src={Logo}
                alt="BUP Bus Tracker"
                className="h-10 w-16 object-contain drop-shadow-lg"
              />
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white drop-shadow-lg">
                  BUP Bus Tracker
                </h1>
                <p
                  className={`text-xs font-medium drop-shadow ${getUserTypeColor()}`}
                >
                  {getPageTitle()}
                </p>
              </div>
            </button>
          </div>

          { }
          <div className="flex items-center gap-4">
            { }
            {showDateTime && (
              <div className="hidden text-right md:block">
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {currentTime.toLocaleDateString("en-BD", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-100 drop-shadow">
                  {currentTime.toLocaleTimeString("en-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}

            { }
            <div className="flex items-center gap-2">
              { }
              {customActions && (
                <div className="mr-2 flex items-center gap-2">
                  {customActions}
                </div>
              )}

              { }
              <div className="flex items-center gap-2">
                {showBackButton && (
                  <button
                    onClick={handleBackClick}
                    className={`rounded-lg p-2 text-white ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
                    title="Back"
                  >
                    <PiArrowLeftDuotone className="h-5 w-5 drop-shadow-lg" />
                  </button>
                )}
                { }
                {showNotifications && (
                  <div className="relative">
                    <button
                      onClick={handleNotificationClick}
                      className={`relative rounded-lg p-2 text-white ${GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
                      title="Notifications"
                    >
                      <PiBellDuotone className="h-5 w-5 drop-shadow-lg" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                          {notificationCount > 9 ? "9+" : notificationCount}
                        </span>
                      )}
                    </button>

                    { }
                    {showNotificationDropdown && (
                      <div
                        className={`absolute top-12 right-0 ${Z_CLASSES.DROPDOWN} w-80 rounded-lg p-4 ${GLASS_PRESETS.DROPDOWN_MENU}`}
                      >
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-white">
                            Notifications
                          </p>
                          <div
                            className={`rounded-lg p-3 ${GLASS_PRESETS.DROPDOWN_MENU_ITEM}`}
                          >
                            <p className="text-sm text-white">
                              No new notifications
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                { }
                {showProfile && (
                  <button
                    onClick={handleProfileClick}
                    className={`rounded-lg p-2 text-white ${onProfilePage ? GLASS_PRESETS.ACTIVE_ACTION_BUTTON : GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
                    title="Profile"
                  >
                    <PiUserCircleDuotone className="h-5 w-5 drop-shadow-lg" />
                  </button>
                )}

                { }
                {showSettings && (
                  <button
                    onClick={handleSettingsClick}
                    className={`rounded-lg p-2 text-white ${onSettingsPage ? GLASS_PRESETS.ACTIVE_ACTION_BUTTON : GLASS_PRESETS.HEADER_ACTION_BUTTON}`}
                    title="Settings"
                  >
                    <PiGearDuotone className="h-5 w-5 drop-shadow-lg" />
                  </button>
                )}

                { }
                {showLogout && (
                  <button
                    onClick={handleLogoutClick}
                    className="rounded-lg border border-red-300/60 bg-red-500/40 p-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-red-500/60 hover:shadow-2xl"
                    title="Logout"
                  >
                    <PiSignOutDuotone className="h-5 w-5 drop-shadow-lg" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
