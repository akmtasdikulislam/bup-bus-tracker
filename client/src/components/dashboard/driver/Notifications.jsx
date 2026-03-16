import { useState } from "react";
import {
  PiBellDuotone,
  PiCheckCircleDuotone,
  PiInfoDuotone,
  PiWarningDuotone,
  PiXBold,
} from "react-icons/pi";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Traffic Alert",
      message:
        "Heavy traffic reported on Mirpur Road. Consider alternate route.",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "info",
      title: "Schedule Update",
      message: "Next trip departure time updated to 11:30 AM.",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Trip Completed",
      message:
        "Successfully completed BUP to Savar trip. 32 passengers transported.",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "info",
      title: "Fuel Reminder",
      message: "Fuel level at 85%. Next refuel recommended after current trip.",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "warning",
      title: "Maintenance Due",
      message: "Vehicle maintenance scheduled for tomorrow at 2:00 PM.",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return (
          <PiWarningDuotone className="h-5 w-5 text-yellow-200 drop-shadow-lg" />
        );
      case "info":
        return (
          <PiInfoDuotone className="h-5 w-5 text-blue-200 drop-shadow-lg" />
        );
      case "success":
        return (
          <PiCheckCircleDuotone className="h-5 w-5 text-green-200 drop-shadow-lg" />
        );
      default:
        return (
          <PiInfoDuotone className="h-5 w-5 text-gray-200 drop-shadow-lg" />
        );
    }
  };

  const getNotificationBg = (type, read) => {
    const baseClasses = read ? "bg-white/15" : "bg-white/25";
    const hoverClasses = read ? "hover:bg-white/25" : "hover:bg-white/35";
    switch (type) {
      case "warning":
        return `${baseClasses} ${hoverClasses} border-yellow-300/60`;
      case "info":
        return `${baseClasses} ${hoverClasses} border-blue-300/60`;
      case "success":
        return `${baseClasses} ${hoverClasses} border-green-300/60`;
      default:
        return `${baseClasses} ${hoverClasses} border-white/40`;
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="hover:shadow-3xl rounded-2xl border border-white/40 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PiBellDuotone className="h-6 w-6 text-purple-200 drop-shadow-lg" />
          <h2 className="text-lg font-semibold text-white drop-shadow-lg">
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="rounded-full border border-red-300/60 bg-red-500/80 px-2 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
              {unreadCount}
            </span>
          )}
        </div>
      </div>

      <div className="h-80 space-y-3 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl border p-3 backdrop-blur-md transition-all duration-300 hover:shadow-lg ${getNotificationBg(
                notification.type,
                notification.read,
              )} ${!notification.read ? "ring-1 shadow-blue-500/30 ring-blue-300/60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4
                        className={`text-sm font-semibold drop-shadow-lg ${
                          notification.read ? "text-gray-100" : "text-white"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <p
                        className={`mt-1 text-xs drop-shadow ${
                          notification.read ? "text-gray-200" : "text-gray-100"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="mt-2 text-xs font-medium text-gray-300 drop-shadow">
                        {notification.time}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="ml-2 flex-shrink-0 rounded-full p-1 text-gray-200 backdrop-blur-sm transition-all duration-200 hover:bg-white/25 hover:text-white"
                    >
                      <PiXBold className="h-4 w-4 drop-shadow-lg" />
                    </button>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="mt-2 text-xs font-medium text-blue-200 drop-shadow transition-colors hover:text-blue-100"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center text-gray-200">
            <div className="text-center">
              <PiBellDuotone className="mx-auto h-12 w-12 text-gray-300/60 drop-shadow-lg" />
              <p className="mt-2 text-sm font-medium drop-shadow">
                No notifications
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
