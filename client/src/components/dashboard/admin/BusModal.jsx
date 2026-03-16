import { useEffect, useState } from "react";
import { PiBusDuotone, PiCameraDuotone, PiXBold } from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";
import { GlassDropdown } from "../../common";

const BusModal = ({ isOpen, onClose, bus, mode, onSave }) => {
  const [formData, setFormData] = useState({
    busNumber: "",
    model: "",
    capacity: "",
    manufacturer: "",
    yearOfManufacture: "",
    registrationNumber: "",
    driverAssigned: "",
    routeAssigned: "",
    status: "active",
    lastMaintenance: "",
    nextMaintenance: "",
    fuelType: "diesel",
    mileage: "",
    photo: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bus) {
      setFormData(bus);
    } else {
      setFormData({
        busNumber: "",
        model: "",
        capacity: "",
        manufacturer: "",
        yearOfManufacture: "",
        registrationNumber: "",
        driverAssigned: "",
        routeAssigned: "",
        status: "active",
        lastMaintenance: "",
        nextMaintenance: "",
        fuelType: "diesel",
        mileage: "",
        photo: "",
      });
    }
    setErrors({});
  }, [bus, isOpen]);

  const manufacturers = [
    "Ashok Leyland",
    "Tata Motors",
    "Eicher Motors",
    "Mahindra",
    "Force Motors",
    "SML Isuzu",
    "Volvo",
    "Mercedes-Benz",
    "Scania",
    "MAN Truck & Bus",
  ];

  const busModels = {
    "Ashok Leyland": ["2518", "Viking", "Stile", "Dost", "Partner"],
    "Tata Motors": ["LP 909", "LP 1109", "Ultra", "Magic", "Ace"],
    "Eicher Motors": ["Skyline Pro", "Starline", "Pro Series", "School Bus"],
    Mahindra: ["Tourister", "Blazo", "Bolero Maxi Truck"],
    "Force Motors": ["Traveller", "Trax", "Citiline"],
    "SML Isuzu": ["Samrat", "Super", "Executive"],
    Volvo: ["B7R", "B9R", "7900", "8700"],
    "Mercedes-Benz": ["OF Series", "OH Series", "Citaro"],
    Scania: ["K Series", "Citywide", "Interlink"],
    "MAN Truck & Bus": ["Lion's City", "Lion's Coach", "TGL"],
  };

  const routes = [
    "Mirpur - BUP Campus",
    "Uttara - BUP Campus",
    "Dhanmondi - BUP Campus",
    "Gulshan - BUP Campus",
    "Banani - BUP Campus",
    "Wari - BUP Campus",
    "Old Dhaka - BUP Campus",
    "Tejgaon - BUP Campus",
    "Mohammadpur - BUP Campus",
    "Ramna - BUP Campus",
  ];

  const drivers = [
    "মোহাম্মদ রহিম",
    "আব্দুল করিম",
    "মো. সালাম",
    "রফিকুল ইসলাম",
    "শাহ আলম",
    "নুরুল ইসলাম",
    "আমিনুল ইসলাম",
    "কামাল উদ্দিন",
    "জাহাঙ্গীর আলম",
    "ফারুক আহমেদ",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.busNumber.trim())
      newErrors.busNumber = "Bus number is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.capacity || formData.capacity <= 0)
      newErrors.capacity = "Valid capacity is required";
    if (!formData.manufacturer.trim())
      newErrors.manufacturer = "Manufacturer is required";
    if (
      !formData.yearOfManufacture ||
      formData.yearOfManufacture < 1980 ||
      formData.yearOfManufacture > new Date().getFullYear()
    ) {
      newErrors.yearOfManufacture = "Valid year of manufacture is required";
    }
    if (!formData.registrationNumber.trim())
      newErrors.registrationNumber = "Registration number is required";
    if (!formData.driverAssigned.trim())
      newErrors.driverAssigned = "Driver assignment is required";
    if (!formData.routeAssigned.trim())
      newErrors.routeAssigned = "Route assignment is required";
    if (!formData.lastMaintenance)
      newErrors.lastMaintenance = "Last maintenance date is required";
    if (!formData.nextMaintenance)
      newErrors.nextMaintenance = "Next maintenance date is required";
    if (!formData.mileage || formData.mileage <= 0)
      newErrors.mileage = "Valid mileage is required";

    if (formData.lastMaintenance && formData.nextMaintenance) {
      const lastDate = new Date(formData.lastMaintenance);
      const nextDate = new Date(formData.nextMaintenance);
      if (nextDate <= lastDate) {
        newErrors.nextMaintenance =
          "Next maintenance must be after last maintenance";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${Z_CLASSES.MODAL} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl border border-white/30 bg-black/80 backdrop-blur-xl">
        { }
        <div
          className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 bg-black/90 p-6`}
        >
          <h2 className="text-xl font-bold text-white">
            {mode === "view"
              ? "View Bus"
              : mode === "edit"
                ? "Edit Bus"
                : "Add New Bus"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/40 bg-white/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
          >
            <PiXBold className="h-5 w-5" />
          </button>
        </div>

        { }
        <div className={`relative ${Z_CLASSES.MODAL_CONTENT} p-6`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            { }
            <div className="flex items-center gap-4">
              <div className="relative">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Bus"
                    className="h-24 w-32 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-24 w-32 items-center justify-center rounded-lg bg-gray-600">
                    <PiBusDuotone className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                {mode !== "view" && (
                  <button
                    type="button"
                    className="absolute right-0 bottom-0 rounded-full border border-white/40 bg-blue-500/25 p-1 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                  >
                    <PiCameraDuotone className="h-4 w-4" />
                  </button>
                )}
              </div>
              {mode !== "view" && (
                <div className="flex-1">
                  <label className="block text-sm font-medium text-white">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    placeholder="Enter photo URL"
                  />
                </div>
              )}
            </div>

            { }
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-white">
                  Bus Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="busNumber"
                  value={formData.busNumber}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="e.g., BUP-001"
                />
                {errors.busNumber && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.busNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Manufacturer <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={manufacturers.map(manufacturer => ({ value: manufacturer, label: manufacturer }))}
                  placeholder="Select Manufacturer"
                  className="mt-1"
                />
                {errors.manufacturer && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.manufacturer}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Model <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  disabled={mode === "view" || !formData.manufacturer}
                  options={formData.manufacturer ? busModels[formData.manufacturer]?.map(model => ({ value: model, label: model })) || [] : []}
                  placeholder="Select Model"
                  className="mt-1"
                />
                {errors.model && (
                  <p className="mt-1 text-sm text-red-400">{errors.model}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Capacity (seats) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  min="1"
                  max="100"
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter capacity"
                />
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-400">{errors.capacity}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Year of Manufacture <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="yearOfManufacture"
                  value={formData.yearOfManufacture}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  min="1980"
                  max={new Date().getFullYear()}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter year"
                />
                {errors.yearOfManufacture && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.yearOfManufacture}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Registration Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="e.g., DHAKA-GA-11-2020"
                />
                {errors.registrationNumber && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.registrationNumber}
                  </p>
                )}
              </div>
            </div>

            { }
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white">
                  Driver Assigned <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="driverAssigned"
                  value={formData.driverAssigned}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={drivers.map(driver => ({ value: driver, label: driver }))}
                  placeholder="Select Driver"
                  className="mt-1"
                />
                {errors.driverAssigned && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.driverAssigned}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Route Assigned <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="routeAssigned"
                  value={formData.routeAssigned}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={routes.map(route => ({ value: route, label: route }))}
                  placeholder="Select Route"
                  className="mt-1"
                />
                {errors.routeAssigned && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.routeAssigned}
                  </p>
                )}
              </div>

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
                    { value: "maintenance", label: "Maintenance" },
                    { value: "inactive", label: "Inactive" }
                  ]}
                  placeholder="Select Status"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Fuel Type <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={[
                    { value: "diesel", label: "Diesel" },
                    { value: "cng", label: "CNG" },
                    { value: "petrol", label: "Petrol" }
                  ]}
                  placeholder="Select Fuel Type"
                  className="mt-1"
                />
              </div>
            </div>

            { }
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-white">
                  Mileage (km/l) <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  step="0.1"
                  min="0"
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter mileage"
                />
                {errors.mileage && (
                  <p className="mt-1 text-sm text-red-400">{errors.mileage}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Last Maintenance <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="lastMaintenance"
                  value={formData.lastMaintenance}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                />
                {errors.lastMaintenance && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.lastMaintenance}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Next Maintenance <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="nextMaintenance"
                  value={formData.nextMaintenance}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                />
                {errors.nextMaintenance && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.nextMaintenance}
                  </p>
                )}
              </div>
            </div>

            { }
            {mode === "view" && bus && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Total Trips
                  </label>
                  <input
                    type="text"
                    value={bus.totalTrips || 0}
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Total Distance (km)
                  </label>
                  <input
                    type="text"
                    value={bus.totalDistance || 0}
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md disabled:opacity-50"
                  />
                </div>
              </div>
            )}

            { }
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
              >
                {mode === "view" ? "Close" : "Cancel"}
              </button>
              {mode !== "view" && (
                <button
                  type="submit"
                  className="rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                >
                  {mode === "edit" ? "Update" : "Add"} Bus
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusModal;
