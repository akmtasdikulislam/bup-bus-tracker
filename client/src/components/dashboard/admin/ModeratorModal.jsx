import { useEffect, useState } from "react";
import {
  PiEnvelopeDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiShieldDuotone,
  PiUserDuotone,
  PiXBold,
} from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";
import { GlassDropdown } from "../../common";

const ModeratorModal = ({ isOpen, onClose, moderator, mode, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    nameEn: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    address: "",
    permissions: [],
    status: "active",
    password: "",
    confirmPassword: "",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const availablePermissions = [
    {
      id: "manage_passengers",
      label: "Manage Passengers",
      description: "Can view, edit, and delete passenger accounts",
    },
    {
      id: "manage_drivers",
      label: "Manage Drivers",
      description: "Can view, edit, and delete driver accounts",
    },
    {
      id: "manage_buses",
      label: "Manage Buses",
      description: "Can view, edit, and delete bus information",
    },
    {
      id: "manage_routes",
      label: "Manage Routes",
      description: "Can view, edit, and delete route information",
    },
    {
      id: "view_reports",
      label: "View Reports",
      description: "Can access system reports and analytics",
    },
    {
      id: "system_settings",
      label: "System Settings",
      description: "Can modify system configuration",
    },
  ];

  const departments = [
    "Information Technology",
    "Transport Management",
    "Student Affairs",
    "Administration",
    "Finance",
    "Security",
    "Maintenance",
  ];

  useEffect(() => {
    if (moderator) {
      setFormData({
        id: moderator.id,
        name: moderator.name || "",
        nameEn: moderator.nameEn || "",
        email: moderator.email || "",
        phone: moderator.phone || "",
        employeeId: moderator.employeeId || "",
        department: moderator.department || "",
        address: moderator.address || "",
        permissions: moderator.permissions || [],
        status: moderator.status || "active",
        password: "",
        confirmPassword: "",
        photo:
          moderator.photo ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
    } else {
      setFormData({
        id: null,
        name: "",
        nameEn: "",
        email: "",
        phone: "",
        employeeId: "",
        department: "",
        address: "",
        permissions: [],
        status: "active",
        password: "",
        confirmPassword: "",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
    }
    setErrors({});
  }, [moderator]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
     
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.nameEn.trim()) {
      newErrors.nameEn = "English name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (formData.permissions.length === 0) {
      newErrors.permissions = "At least one permission must be selected";
    }

    if (mode === "add") {
      if (!formData.password.trim()) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
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
            {mode === "add"
              ? "Add New Moderator"
              : mode === "edit"
                ? "Edit Moderator"
                : "Moderator Details"}
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
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <img
                  src={formData.photo}
                  alt="Moderator Photo"
                  className="h-24 w-24 rounded-full border-2 border-white/20 object-cover"
                />
              </div>
              <div className="flex-1">
                <label className="mb-2 block text-sm font-medium text-white">
                  Profile Photo URL
                </label>
                <input
                  type="url"
                  name="photo"
                  value={formData.photo}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            { }
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  <PiUserDuotone className="mr-2 inline h-4 w-4" />
                  Name (বাংলা) *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="মোঃ আহমেদ রহমান"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  <PiUserDuotone className="mr-2 inline h-4 w-4" />
                  Name (English) *
                </label>
                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="Md. Ahmed Rahman"
                />
                {errors.nameEn && (
                  <p className="mt-1 text-sm text-red-400">{errors.nameEn}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  <PiEnvelopeDuotone className="mr-2 inline h-4 w-4" />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="ahmed@bup.edu.bd"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  <PiPhoneDuotone className="mr-2 inline h-4 w-4" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="+880 1712-345678"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  <PiIdentificationCardDuotone className="mr-2 inline h-4 w-4" />
                  Employee ID *
                </label>
                <input
                  type="text"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                  placeholder="MOD-001"
                />
                {errors.employeeId && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.employeeId}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Department *
                </label>
                <GlassDropdown
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={mode === "view"}
                  options={departments.map((dept) => ({
                    value: dept,
                    label: dept,
                  }))}
                  placeholder="Select Department"
                  className="w-full"
                />
                {errors.department && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            { }
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                <PiMapPinDuotone className="mr-2 inline h-4 w-4" />
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={mode === "view"}
                rows={3}
                className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none disabled:opacity-50"
                placeholder="Complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-400">{errors.address}</p>
              )}
            </div>

            { }
            {mode === "add" && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? (
                        <PiEyeSlashDuotone className="h-5 w-5" />
                      ) : (
                        <PiEyeDuotone className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <PiEyeSlashDuotone className="h-5 w-5" />
                      ) : (
                        <PiEyeDuotone className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            )}

            { }
            <div>
              <label className="mb-4 block text-sm font-medium text-white">
                <PiShieldDuotone className="mr-2 inline h-4 w-4" />
                Permissions *
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {availablePermissions.map((permission) => (
                  <div
                    key={permission.id}
                    className={`rounded-lg border p-4 transition-all duration-300 ${
                      formData.permissions.includes(permission.id)
                        ? "border-blue-400 bg-blue-500/20"
                        : "border-white/20 bg-white/10"
                    }`}
                  >
                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        disabled={mode === "view"}
                        className="mt-1 h-4 w-4 rounded border-white/40 bg-white/25 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">
                          {permission.label}
                        </div>
                        <div className="text-xs text-gray-400">
                          {permission.description}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              {errors.permissions && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.permissions}
                </p>
              )}
            </div>

            { }
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Status
              </label>
              <GlassDropdown
                name="status"
                value={formData.status}
                onChange={handleChange}
                disabled={mode === "view"}
                options={[
                  { value: "active", label: "Active" },
                  { value: "inactive", label: "Inactive" },
                ]}
                placeholder="Select Status"
                className="w-full"
              />
            </div>

            { }
            {mode !== "view" && (
              <div className="flex justify-end gap-4 border-t border-white/20 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-white/40 bg-white/25 px-6 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg border border-blue-400 bg-blue-500/25 px-6 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                >
                  {mode === "add" ? "Add Moderator" : "Update Moderator"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModeratorModal;
