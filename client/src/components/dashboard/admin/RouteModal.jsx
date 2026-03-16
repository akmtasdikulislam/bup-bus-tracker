import { useEffect, useState } from "react";
import {
  PiCalendarDuotone,
  PiClockDuotone,
  PiMapPinDuotone,
  PiPlusBold,
  PiTrashDuotone,
  PiXBold,
} from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import { GlassDropdown } from "../../common";

const RouteModal = ({ isOpen, onClose, route, mode, onSave }) => {
  const [formData, setFormData] = useState({
    routeName: "",
    routeNameEn: "",
    startLocation: "",
    endLocation: "",
    distance: "",
    duration: "",
    schedule: [""],
    fare: "",
    status: "active",
    busesAssigned: 0,
    totalPassengers: 0,
    description: "",
    waypoints: [""],
    operatingDays: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (route) {
      setFormData({
        ...route,
        schedule: route.schedule || [""],
        waypoints: route.waypoints || [""],
        operatingDays: route.operatingDays || [],
      });
    } else {
      setFormData({
        routeName: "",
        routeNameEn: "",
        startLocation: "",
        endLocation: "",
        distance: "",
        duration: "",
        schedule: [""],
        fare: "",
        status: "active",
        busesAssigned: 0,
        totalPassengers: 0,
        description: "",
        waypoints: [""],
        operatingDays: [],
      });
    }
    setErrors({});
  }, [route, isOpen]);

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleArrayInputChange = (index, value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (index, field) => {
    if (formData[field].length > 1) {
      setFormData((prev) => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index),
      }));
    }
  };

  const handleOperatingDaysChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      operatingDays: prev.operatingDays.includes(day)
        ? prev.operatingDays.filter((d) => d !== day)
        : [...prev.operatingDays, day],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.routeName.trim())
      newErrors.routeName = "Route name is required";
    if (!formData.routeNameEn.trim())
      newErrors.routeNameEn = "English route name is required";
    if (!formData.startLocation.trim())
      newErrors.startLocation = "Start location is required";
    if (!formData.endLocation.trim())
      newErrors.endLocation = "End location is required";
    if (!formData.distance.trim()) newErrors.distance = "Distance is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (!formData.fare || formData.fare <= 0)
      newErrors.fare = "Valid fare is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Validate schedule
    const validSchedule = formData.schedule.filter(
      (time) => time.trim() !== "",
    );
    if (validSchedule.length === 0) {
      newErrors.schedule = "At least one schedule time is required";
    } else {
      // Validate time format
      const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      const invalidTimes = validSchedule.filter(
        (time) => !timeRegex.test(time),
      );
      if (invalidTimes.length > 0) {
        newErrors.schedule = "All schedule times must be in HH:MM format";
      }
    }

    // Validate waypoints
    const validWaypoints = formData.waypoints.filter(
      (point) => point.trim() !== "",
    );
    if (validWaypoints.length < 2) {
      newErrors.waypoints = "At least two waypoints are required";
    }

    // Validate operating days
    if (formData.operatingDays.length === 0) {
      newErrors.operatingDays = "At least one operating day is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const processedData = {
        ...formData,
        schedule: formData.schedule.filter((time) => time.trim() !== ""),
        waypoints: formData.waypoints.filter((point) => point.trim() !== ""),
        fare: parseInt(formData.fare),
        busesAssigned: parseInt(formData.busesAssigned) || 0,
        totalPassengers: parseInt(formData.totalPassengers) || 0,
      };
      onSave(processedData);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${Z_CLASSES.MODAL} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
    >
      <div className={`relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl ${GLASS_PRESETS.MODAL_CONTAINER}`}>
        {/* Header */}
        <div
          className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 bg-black/90 p-6`}
        >
          <h2 className="text-xl font-bold text-white">
            {mode === "view"
              ? "View Route"
              : mode === "edit"
                ? "Edit Route"
                : "Add New Route"}
          </h2>
          <button
            onClick={onClose}
            className={`p-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
          >
            <PiXBold className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className={`relative ${Z_CLASSES.MODAL_CONTENT} p-6`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Route Names */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white">
                  Route Name (Bengali) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className={`mt-1 w-full rounded-lg px-3 py-2 text-white placeholder-gray-300 disabled:opacity-50 ${GLASS_PRESETS.FORM_INPUT}`}
                  placeholder="Enter Bengali route name"
                />
                {errors.routeName && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.routeName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Route Name (English) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="routeNameEn"
                  value={formData.routeNameEn}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter English route name"
                />
                {errors.routeNameEn && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.routeNameEn}
                  </p>
                )}
              </div>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white">
                  Start Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="startLocation"
                  value={formData.startLocation}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter start location"
                />
                {errors.startLocation && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.startLocation}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  End Location <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="endLocation"
                  value={formData.endLocation}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter end location"
                />
                {errors.endLocation && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.endLocation}
                  </p>
                )}
              </div>
            </div>

            {/* Distance, Duration, Fare */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-white">
                  Distance <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="distance"
                  value={formData.distance}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="e.g., 8.5 km"
                />
                {errors.distance && (
                  <p className="mt-1 text-sm text-red-400">{errors.distance}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Duration <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="e.g., 25 minutes"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-400">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Fare (৳) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="fare"
                  value={formData.fare}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  min="0"
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter fare amount"
                />
                {errors.fare && (
                  <p className="mt-1 text-sm text-red-400">{errors.fare}</p>
                )}
              </div>
            </div>

            {/* Status and Counters */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-white">
                  Status <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" }
                  ]}
                  placeholder="Select Status"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Buses Assigned
                </label>
                <input
                  type="number"
                  name="busesAssigned"
                  value={formData.busesAssigned}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  min="0"
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Number of buses"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Total Passengers
                </label>
                <input
                  type="number"
                  name="totalPassengers"
                  value={formData.totalPassengers}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  min="0"
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Number of passengers"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                disabled={mode === "view"}
                rows={3}
                className="mt-1 w-full resize-none rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                placeholder="Enter route description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Operating Days */}
            <div>
              <label className="mb-3 block text-sm font-medium text-white">
                Operating Days <span className="text-red-400">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {daysOfWeek.map((day) => (
                  <label
                    key={day.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all duration-300 ${
                      formData.operatingDays.includes(day.value)
                        ? "border-blue-400 bg-blue-500/25 text-blue-400"
                        : "border-white/40 bg-white/25 text-white hover:bg-white/35"
                    } ${mode === "view" ? "pointer-events-none opacity-50" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.operatingDays.includes(day.value)}
                      onChange={() => handleOperatingDaysChange(day.value)}
                      disabled={mode === "view"}
                      className="sr-only"
                    />
                    <PiCalendarDuotone className="h-4 w-4" />
                    <span className="text-sm font-medium">{day.label}</span>
                  </label>
                ))}
              </div>
              {errors.operatingDays && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.operatingDays}
                </p>
              )}
            </div>

            {/* Schedule */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-white">
                  Schedule <span className="text-red-400">*</span>
                </label>
                {mode !== "view" && (
                  <button
                    type="button"
                    onClick={() => addArrayItem("schedule")}
                    className="flex items-center gap-1 rounded-lg border border-white/40 bg-blue-500/25 px-3 py-1 text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                  >
                    <PiPlusBold className="h-4 w-4" />
                    Add Time
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {formData.schedule.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <PiClockDuotone className="h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) =>
                        handleArrayInputChange(
                          index,
                          e.target.value,
                          "schedule",
                        )
                      }
                      disabled={mode === "view"}
                      className="flex-1 rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                    />
                    {mode !== "view" && formData.schedule.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "schedule")}
                        className="rounded-lg border border-white/40 bg-red-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-500/35"
                      >
                        <PiTrashDuotone className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.schedule && (
                <p className="mt-1 text-sm text-red-400">{errors.schedule}</p>
              )}
            </div>

            {/* Waypoints */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="block text-sm font-medium text-white">
                  Waypoints/Stops <span className="text-red-400">*</span>
                </label>
                {mode !== "view" && (
                  <button
                    type="button"
                    onClick={() => addArrayItem("waypoints")}
                    className="flex items-center gap-1 rounded-lg border border-white/40 bg-blue-500/25 px-3 py-1 text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                  >
                    <PiPlusBold className="h-4 w-4" />
                    Add Stop
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {formData.waypoints.map((waypoint, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <PiMapPinDuotone className="h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={waypoint}
                      onChange={(e) =>
                        handleArrayInputChange(
                          index,
                          e.target.value,
                          "waypoints",
                        )
                      }
                      disabled={mode === "view"}
                      placeholder={`Stop ${index + 1}`}
                      className="flex-1 rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                    />
                    {mode !== "view" && formData.waypoints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem(index, "waypoints")}
                        className="rounded-lg border border-white/40 bg-red-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-500/35"
                      >
                        <PiTrashDuotone className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.waypoints && (
                <p className="mt-1 text-sm text-red-400">{errors.waypoints}</p>
              )}
            </div>

            {/* Additional Info for View Mode */}
            {mode === "view" && route && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Created Date
                  </label>
                  <input
                    type="text"
                    value={new Date(route.createdDate).toLocaleDateString()}
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Route ID
                  </label>
                  <input
                    type="text"
                    value={route.id}
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
              >
                {mode === "view" ? "Close" : "Cancel"}
              </button>
              {mode !== "view" && (
                <button
                  type="submit"
                  className="rounded-lg border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-white shadow-lg hover:scale-105 hover:bg-blue-500/30 hover:shadow-xl backdrop-blur-sm transition-all duration-300"
                >
                  {mode === "edit" ? "Update" : "Add"} Route
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RouteModal;
