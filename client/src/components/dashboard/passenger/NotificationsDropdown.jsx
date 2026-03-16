import { useState } from "react";
import {
  PiBellDuotone,
  PiCheckCircleDuotone,
  PiInfoDuotone,
  PiWarningDuotone,
  PiXBold,
} from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const NotificationsDropdown = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "info",
      title: "Bus Approaching",
      message: "BUP-003 will arrive at BUP Main Gate in 5 minutes.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Route Delay",
      message: "BUP-001 is running 10 minutes late due to traffic.",
      time: "8 min ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Schedule Updated",
      message: "New bus BUP-007 added to afternoon schedule.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "Maintenance Notice",
      message: "BUP-002 will be under maintenance tomorrow 2-4 PM.",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "success",
      title: "Trip Completed",
      message: "You successfully completed your trip to Savar.",
      time: "3 hours ago",
      read: true,
    },
  ]);

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
    const baseClasses = read ? "bg-white/10" : "bg-white/20";
    const hoverClasses = read ? "hover:bg-white/20" : "hover:bg-white/30";
    switch (type) {
      case "warning":
        return `${baseClasses} ${hoverClasses} border-yellow-300/50`;
      case "info":
        return `${baseClasses} ${hoverClasses} border-blue-300/50`;
      case "success":
        return `${baseClasses} ${hoverClasses} border-green-300/50`;
      default:
        return `${baseClasses} ${hoverClasses} border-white/30`;
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

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full right-0 ${Z_CLASSES.DROPDOWN} mt-2 w-80 rounded-xl ${GLASS_PRESETS.DROPDOWN_MENU}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <div className="flex items-center gap-2">
          <PiBellDuotone className="h-5 w-5 text-purple-300 drop-shadow" />
          <h3 className="font-semibold text-white drop-shadow-lg">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <PiXBold className="h-4 w-4" />
        </button>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-between border-b border-white/20 p-3">
          <button
            onClick={markAllAsRead}
            className="text-xs text-blue-300 transition-colors hover:text-blue-200"
            disabled={unreadCount === 0}
          >
            Mark all as read
          </button>
          <button
            onClick={clearAll}
            className="text-xs text-red-300 transition-colors hover:text-red-200"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="space-y-1 p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${GLASS_PRESETS.DROPDOWN_MENU_ITEM} ${getNotificationBg(
                  notification.type,
                  notification.read,
                )} ${!notification.read ? "ring-1 shadow-blue-500/20 ring-blue-300/50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`text-sm font-medium drop-shadow ${
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
                      <button
                        onClick={() => removeNotification(notification.id)}
                        className="ml-2 flex-shrink-0 rounded-full p-1 text-gray-300 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:text-white"
                      >
                        <PiXBold className="h-3 w-3 drop-shadow" />
                      </button>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="mt-2 text-xs text-blue-300 drop-shadow transition-colors hover:text-blue-200"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-32 items-center justify-center text-gray-300">
            <div className="text-center">
              <PiBellDuotone className="mx-auto h-8 w-8 text-gray-400/50 drop-shadow" />
              <p className="mt-2 text-sm drop-shadow">No notifications</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDropdown;
