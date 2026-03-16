import { useEffect, useState } from "react";
import { PiCameraDuotone, PiUserDuotone, PiXBold } from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GlassDropdown } from "../../common";

const PassengerModal = ({ isOpen, onClose, passenger, mode, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    nameEn: "",
    studentId: "",
    email: "",
    phone: "",
    department: "",
    faculty: "",
    address: "",
    status: "active",
    photo: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (passenger) {
      setFormData(passenger);
    } else {
      setFormData({
        name: "",
        nameEn: "",
        studentId: "",
        email: "",
        phone: "",
        department: "",
        faculty: "",
        address: "",
        status: "active",
        photo: "",
      });
    }
    setErrors({});
  }, [passenger, isOpen]);

  const departments = [
    "Computer Science & Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Business Administration",
    "Economics",
    "English",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
  ];

  const faculties = [
    "Faculty of Engineering",
    "Faculty of Science & Technology",
    "Faculty of Business Studies",
    "Faculty of Arts & Social Sciences",
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.nameEn.trim()) newErrors.nameEn = "English name is required";
    if (!formData.studentId.trim())
      newErrors.studentId = "Student ID is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.faculty.trim()) newErrors.faculty = "Faculty is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

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
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/30 bg-black/80 backdrop-blur-xl">
        {/* Header */}
        <div
          className={`sticky top-0 ${Z_CLASSES.MODAL_HEADER} flex items-center justify-between border-b border-white/20 bg-black/90 p-6`}
        >
          <h2 className="text-xl font-bold text-white">
            {mode === "view"
              ? "View Passenger"
              : mode === "edit"
                ? "Edit Passenger"
                : "Add New Passenger"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/40 bg-white/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
          >
            <PiXBold className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className={`relative ${Z_CLASSES.MODAL_CONTENT} p-6`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Passenger"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-600">
                    <PiUserDuotone className="h-8 w-8 text-gray-400" />
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
                <div>
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

            {/* Personal Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white">
                  Name (Bengali) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter Bengali name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Name (English) <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter English name"
                />
                {errors.nameEn && (
                  <p className="mt-1 text-sm text-red-400">{errors.nameEn}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Student ID <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter student ID"
                />
                {errors.studentId && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.studentId}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Phone <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
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
                    { value: "inactive", label: "Inactive" },
                  ]}
                  placeholder="Select Status"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-white">
                  Department <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={departments.map((dept) => ({
                    value: dept,
                    label: dept,
                  }))}
                  placeholder="Select Department"
                  className="mt-1"
                />
                {errors.department && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.department}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white">
                  Faculty <span className="text-red-400">*</span>
                </label>
                <GlassDropdown
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleInputChange}
                  disabled={mode === "view"}
                  options={faculties.map((faculty) => ({
                    value: faculty,
                    label: faculty,
                  }))}
                  placeholder="Select Faculty"
                  className="mt-1"
                />
                {errors.faculty && (
                  <p className="mt-1 text-sm text-red-400">{errors.faculty}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-white">
                Address <span className="text-red-400">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={mode === "view"}
                rows={3}
                className="mt-1 w-full resize-none rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                placeholder="Enter full address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400">{errors.address}</p>
              )}
            </div>

            {/* Additional Info for View Mode */}
            {mode === "view" && passenger && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-white">
                    Join Date
                  </label>
                  <input
                    type="text"
                    value={new Date(passenger.joinDate).toLocaleDateString()}
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/40 bg-white/25 px-3 py-2 text-white backdrop-blur-md disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white">
                    Total Trips
                  </label>
                  <input
                    type="text"
                    value={passenger.totalTrips}
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
                className="rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
              >
                {mode === "view" ? "Close" : "Cancel"}
              </button>
              {mode !== "view" && (
                <button
                  type="submit"
                  className="rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                >
                  {mode === "edit" ? "Update" : "Add"} Passenger
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassengerModal;
