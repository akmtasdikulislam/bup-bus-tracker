import { useState } from "react";
import {
  PiBellDuotone,
  PiCheckCircleDuotone,
  PiCheckDuotone,
  PiInfoDuotone,
  PiTrashDuotone,
  PiWarningDuotone,
  PiXBold,
} from "react-icons/pi";

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Traffic Alert",
      message:
        "Heavy traffic reported on Mirpur Road. Consider alternate route.",
      time: "5 min ago",
      read: false,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 2,
      type: "info",
      title: "Schedule Update",
      message: "Next trip departure time updated to 11:30 AM.",
      time: "15 min ago",
      read: false,
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
    },
    {
      id: 3,
      type: "success",
      title: "Trip Completed",
      message:
        "Successfully completed BUP to Savar trip. 32 passengers transported.",
      time: "1 hour ago",
      read: true,
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
    },
    {
      id: 4,
      type: "info",
      title: "Fuel Reminder",
      message: "Fuel level at 85%. Next refuel recommended after current trip.",
      time: "2 hours ago",
      read: true,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 5,
      type: "warning",
      title: "Maintenance Due",
      message: "Vehicle maintenance scheduled for tomorrow at 2:00 PM.",
      time: "3 hours ago",
      read: true,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    },
  ]);

  const [filter, setFilter] = useState("all");  

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return (
          <PiWarningDuotone className="h-4 w-4 text-yellow-300 drop-shadow" />
        );
      case "info":
        return <PiInfoDuotone className="h-4 w-4 text-blue-300 drop-shadow" />;
      case "success":
        return (
          <PiCheckCircleDuotone className="h-4 w-4 text-green-300 drop-shadow" />
        );
      default:
        return <PiInfoDuotone className="h-4 w-4 text-gray-300 drop-shadow" />;
    }
  };

  const getNotificationBg = (type, read) => {
    const baseClasses = read ? "bg-white/5" : "bg-white/15";
    const hoverClasses = read ? "hover:bg-white/15" : "hover:bg-white/25";
    switch (type) {
      case "warning":
        return `${baseClasses} ${hoverClasses} border-yellow-300/40`;
      case "info":
        return `${baseClasses} ${hoverClasses} border-blue-300/40`;
      case "success":
        return `${baseClasses} ${hoverClasses} border-green-300/40`;
      default:
        return `${baseClasses} ${hoverClasses} border-white/30`;
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 max-w-[90vw] rounded-2xl border border-white/30 bg-black/90 shadow-2xl backdrop-blur-xl">
      { }
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <div className="flex items-center gap-3">
          <PiBellDuotone className="h-5 w-5 text-purple-300 drop-shadow-lg" />
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500/80 px-2 py-1 text-xs font-bold text-white shadow-lg">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-gray-300 transition-all duration-200 hover:bg-white/20 hover:text-white"
          aria-label="Close notifications"
        >
          <PiXBold className="h-5 w-5 drop-shadow" />
        </button>
      </div>

      { }
      <div className="flex border-b border-white/20 bg-white/5">
        {[
          { key: "all", label: "All", count: notifications.length },
          { key: "unread", label: "Unread", count: unreadCount },
          {
            key: "read",
            label: "Read",
            count: notifications.length - unreadCount,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              filter === tab.key
                ? "border-b-2 border-purple-400 bg-purple-500/20 text-purple-200"
                : "text-gray-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      { }
      {notifications.length > 0 && (
        <div className="flex gap-2 border-b border-white/20 bg-white/5 p-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 rounded-lg border border-green-300/50 bg-green-500/20 px-3 py-2 text-xs font-medium text-green-200 transition-all duration-200 hover:bg-green-500/30"
            >
              <PiCheckDuotone className="h-3 w-3" />
              Mark all read
            </button>
          )}
          <button
            onClick={clearAllNotifications}
            className="flex items-center gap-2 rounded-lg border border-red-300/50 bg-red-500/20 px-3 py-2 text-xs font-medium text-red-200 transition-all duration-200 hover:bg-red-500/30"
          >
            <PiTrashDuotone className="h-3 w-3" />
            Clear all
          </button>
        </div>
      )}

      { }
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-1 p-2">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`group rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 ${getNotificationBg(
                  notification.type,
                  notification.read,
                )} ${!notification.read ? "ring-1 ring-blue-300/30" : ""}`}
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
                            notification.read ? "text-gray-200" : "text-white"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p
                          className={`mt-1 text-xs drop-shadow ${
                            notification.read
                              ? "text-gray-300"
                              : "text-gray-100"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="mt-2 text-xs text-gray-400 drop-shadow">
                          {notification.time}
                        </p>
                      </div>
                      <div className="ml-2 flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="rounded-full p-1 text-green-300 transition-all duration-200 hover:bg-green-500/20 hover:text-green-200"
                            title="Mark as read"
                          >
                            <PiCheckDuotone className="h-3 w-3 drop-shadow" />
                          </button>
                        )}
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="rounded-full p-1 text-red-300 transition-all duration-200 hover:bg-red-500/20 hover:text-red-200"
                          title="Remove notification"
                        >
                          <PiXBold className="h-3 w-3 drop-shadow" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-400">
            <div className="text-center">
              <PiBellDuotone className="mx-auto h-8 w-8 text-gray-500/50 drop-shadow" />
              <p className="mt-2 text-sm drop-shadow">
                {filter === "unread"
                  ? "No unread notifications"
                  : filter === "read"
                    ? "No read notifications"
                    : "No notifications"}
              </p>
            </div>
          </div>
        )}
      </div>

      { }
      {notifications.length > 0 && (
        <div className="border-t border-white/20 bg-white/5 p-3 text-center">
          <button
            onClick={onClose}
            className="text-xs font-medium text-purple-300 transition-colors hover:text-purple-200"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
