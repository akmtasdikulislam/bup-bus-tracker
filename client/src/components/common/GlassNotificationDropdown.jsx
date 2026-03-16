import React, { useState } from 'react';
import {
  PiBellDuotone,
  PiCheckCircleDuotone,
  PiInfoDuotone,
  PiWarningDuotone,
  PiXBold,
} from 'react-icons/pi';
import { Z_CLASSES } from '../../utils/zIndexLayers';
import { GLASS_PRESETS } from '../../utils/glassomorphism';

const GlassNotificationDropdown = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  onNotificationRead,
  onNotificationRemove,
  onMarkAllAsRead,
  onClearAll,
  className = "",
  position = "right-0", // "right-0", "left-0", "center"
  width = "w-80"
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return <PiWarningDuotone className="h-4 w-4 text-yellow-300 drop-shadow" />;
      case 'info':
        return <PiInfoDuotone className="h-4 w-4 text-blue-300 drop-shadow" />;
      case 'success':
        return <PiCheckCircleDuotone className="h-4 w-4 text-green-300 drop-shadow" />;
      default:
        return <PiInfoDuotone className="h-4 w-4 text-gray-300 drop-shadow" />;
    }
  };

  const getNotificationBorderColor = (type) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-300/50';
      case 'info':
        return 'border-blue-300/50';
      case 'success':
        return 'border-green-300/50';
      default:
        return 'border-white/30';
    }
  };

  const markAsRead = (id) => {
    if (onNotificationRead) {
      onNotificationRead(id);
    }
  };

  const removeNotification = (id) => {
    if (onNotificationRemove) {
      onNotificationRemove(id);
    }
  };

  const markAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const clearAll = () => {
    if (onClearAll) {
      onClearAll();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      className={`absolute top-full ${position} ${Z_CLASSES.DROPDOWN} mt-2 ${width} rounded-xl ${GLASS_PRESETS.DROPDOWN_MENU} ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/20 p-4">
        <div className="flex items-center gap-2">
          <PiBellDuotone className="h-5 w-5 text-blue-300 drop-shadow" />
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
          aria-label="Close notifications"
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
                className={`rounded-lg border p-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg ${GLASS_PRESETS.DROPDOWN_MENU_ITEM} ${getNotificationBorderColor(notification.type)} ${
                  !notification.read ? 'ring-1 shadow-blue-500/20 ring-blue-300/50' : ''
                }`}
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
                            notification.read ? 'text-gray-200' : 'text-white'
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p
                          className={`mt-1 text-xs drop-shadow ${
                            notification.read ? 'text-gray-300' : 'text-gray-100'
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
                        aria-label="Remove notification"
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

export default GlassNotificationDropdown;
