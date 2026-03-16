import { useState } from "react";
import {
  PiArrowLeftDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiUserDuotone,
  PiEnvelopeDuotone,
  PiPhoneDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiCalendarDuotone,
  PiCheckDuotone,
  PiShieldCheckDuotone,
} from "react-icons/pi";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Logo from "../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS, GLASS_STYLES } from "../../utils/glassomorphism";
import { GlassDropdown, GlassSearchDropdown } from "../../components/common";
import authService from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    fullNameEn: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    
    // Student Information
    studentId: "",
    department: "",
    semester: "",
    session: "",
    
    // Address Information
    presentAddress: "",
    permanentAddress: "",
    emergencyContact: "",
    emergencyPhone: "",
    
    // Account Information
    username: "",
    password: "",
    confirmPassword: "",
    
    // Terms and Privacy
    agreeToTerms: false,
    agreeToPrivacy: false,
    allowNotifications: true,
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const departments = [
    { value: "Computer Science & Engineering", label: "Computer Science & Engineering" },
    { value: "Electrical & Electronic Engineering", label: "Electrical & Electronic Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Economics", label: "Economics" },
    { value: "English", label: "English" },
    { value: "Management", label: "Management" },
    { value: "Accounting", label: "Accounting" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Law", label: "Law" },
    { value: "International Relations", label: "International Relations" },
    { value: "Public Administration", label: "Public Administration" },
  ];

  const sessions = [
    { value: "Spring 2024", label: "Spring 2024" },
    { value: "Fall 2024", label: "Fall 2024" },
    { value: "Summer 2024", label: "Summer 2024" },
    { value: "Spring 2023", label: "Spring 2023" },
    { value: "Fall 2023", label: "Fall 2023" },
    { value: "Summer 2023", label: "Summer 2023" },
    { value: "Spring 2022", label: "Spring 2022" },
    { value: "Fall 2022", label: "Fall 2022" },
    { value: "Summer 2022", label: "Summer 2022" },
    { value: "Spring 2021", label: "Spring 2021" },
    { value: "Fall 2021", label: "Fall 2021" },
    { value: "Summer 2021", label: "Summer 2021" },
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name in Bengali is required";
    if (!formData.fullNameEn.trim()) newErrors.fullNameEn = "Full name in English is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^(\+88)?01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid Bangladeshi phone number";
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.studentId.trim()) newErrors.studentId = "Student ID is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.semester.trim()) newErrors.semester = "Current semester is required";
    if (!formData.session) newErrors.session = "Session is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (!formData.presentAddress.trim()) newErrors.presentAddress = "Present address is required";
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = "Permanent address is required";
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact name is required";
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = "Emergency contact phone is required";
    } else if (!/^(\+88)?01[3-9]\d{8}$/.test(formData.emergencyPhone)) {
      newErrors.emergencyPhone = "Please enter a valid phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = "You must agree to the privacy policy";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    let isValid = false;
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep4()) return;
    
    setIsLoading(true);

    try {
      // Register user with Firebase and backend
      const result = await authService.register(formData);
      
      toast.success("Account created successfully! Please wait for admin approval.");
      
      // Clear form data
      setFormData({
        fullName: "",
        fullNameEn: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        studentId: "",
        department: "",
        semester: "",
        session: "",
        presentAddress: "",
        permanentAddress: "",
        emergencyContact: "",
        emergencyPhone: "",
        username: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        agreeToPrivacy: false,
        allowNotifications: true,
      });
      
      // Navigate to login page with success message
      navigate("/login?type=passenger&registered=true");
      
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogin = () => {
    navigate("/login?type=passenger");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const renderStep1 = () => (
    <div className="w-full space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-base font-bold text-green-100 mb-1 sm:text-lg">Personal Information</h2>
        <p className="text-xs text-gray-300 sm:text-sm">Tell us about yourself</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Full Name (Bengali) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiUserDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="আপনার পূর্ণ নাম লিখুন"
          />
        </div>
        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Full Name (English) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiUserDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            name="fullNameEn"
            value={formData.fullNameEn}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Enter your full name in English"
          />
        </div>
        {errors.fullNameEn && <p className="text-red-400 text-xs mt-1">{errors.fullNameEn}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Email Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiEnvelopeDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="your.email@example.com"
          />
        </div>
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Phone Number <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiPhoneDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="+880 1XXX-XXXXXX"
          />
        </div>
        {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-green-100">
            Date of Birth <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <PiCalendarDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            />
          </div>
          {errors.dateOfBirth && <p className="text-red-400 text-xs">{errors.dateOfBirth}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-green-100">
            Gender <span className="text-red-400">*</span>
          </label>
          <GlassDropdown
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            options={genderOptions}
            placeholder="Select Gender"
            error={errors.gender}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="w-full space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-base font-bold text-green-100 mb-1 sm:text-lg">Academic Information</h2>
        <p className="text-xs text-gray-300 sm:text-sm">Your university details</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Student ID <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiIdentificationCardDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="e.g., BCSE-25-001"
          />
        </div>
        {errors.studentId && <p className="text-red-400 text-xs">{errors.studentId}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Department <span className="text-red-400">*</span>
        </label>
        <GlassSearchDropdown
          name="department"
          value={formData.department}
          onChange={handleInputChange}
          options={departments}
          placeholder="Search and select department"
          searchPlaceholder="Search departments..."
          error={errors.department}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-sm font-semibold text-green-100">
            Current Semester <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 px-3 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="e.g., 8th Semester"
          />
          {errors.semester && <p className="text-red-400 text-xs">{errors.semester}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold text-green-100">
            Session <span className="text-red-400">*</span>
          </label>
          <GlassDropdown
            name="session"
            value={formData.session}
            onChange={handleInputChange}
            options={sessions}
            placeholder="Select Session"
            error={errors.session}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="w-full space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-base font-bold text-green-100 mb-1 sm:text-lg">Address & Emergency Contact</h2>
        <p className="text-xs text-gray-300 sm:text-sm">Your address and emergency contact details</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Present Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiMapPinDuotone className="absolute top-3 left-3 h-4 w-4 text-gray-300" />
          <textarea
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleInputChange}
            rows={2}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 resize-none ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Enter your current address"
          />
        </div>
        {errors.presentAddress && <p className="text-red-400 text-xs">{errors.presentAddress}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Permanent Address <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiMapPinDuotone className="absolute top-3 left-3 h-4 w-4 text-gray-300" />
          <textarea
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleInputChange}
            rows={2}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 resize-none ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Enter your permanent address"
          />
        </div>
        {errors.permanentAddress && <p className="text-red-400 text-xs">{errors.permanentAddress}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Emergency Contact Name <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiUserDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Emergency contact person's name"
          />
        </div>
        {errors.emergencyContact && <p className="text-red-400 text-xs">{errors.emergencyContact}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Emergency Contact Phone <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiPhoneDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="+880 1XXX-XXXXXX"
          />
        </div>
        {errors.emergencyPhone && <p className="text-red-400 text-xs">{errors.emergencyPhone}</p>}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="w-full space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-base font-bold text-green-100 mb-1 sm:text-lg">Account Setup</h2>
        <p className="text-xs text-gray-300 sm:text-sm">Create your login credentials</p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Username <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiUserDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-2.5 pr-4 pl-9 text-sm text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Choose a unique username"
          />
        </div>
        {errors.username && <p className="text-red-400 text-xs">{errors.username}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiLockDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type={showPassword.password ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-3 pr-12 pl-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Create a strong password"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("password")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 transition-colors hover:text-white"
          >
            {showPassword.password ? (
              <PiEyeSlashDuotone className="h-5 w-5" />
            ) : (
              <PiEyeDuotone className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-green-100">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <PiLockDuotone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-300" />
          <input
            type={showPassword.confirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={`w-full rounded-lg py-3 pr-12 pl-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility("confirmPassword")}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 transition-colors hover:text-white"
          >
            {showPassword.confirmPassword ? (
              <PiEyeSlashDuotone className="h-5 w-5" />
            ) : (
              <PiEyeDuotone className="h-5 w-5" />
            )}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
      </div>

      <div className="space-y-3 pt-4">
        <label className="flex items-start gap-2 text-sm text-gray-200">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-green-400 focus:ring-2 focus:ring-green-400/30"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-green-300 underline decoration-green-300/50 underline-offset-2 hover:text-green-200">
              Terms and Conditions
            </a>{" "}
            <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.agreeToTerms && <p className="text-red-400 text-xs ml-6">{errors.agreeToTerms}</p>}

        <label className="flex items-start gap-2 text-sm text-gray-200">
          <input
            type="checkbox"
            name="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-green-400 focus:ring-2 focus:ring-green-400/30"
          />
          <span>
            I agree to the{" "}
            <a href="#" className="font-medium text-green-300 underline decoration-green-300/50 underline-offset-2 hover:text-green-200">
              Privacy Policy
            </a>{" "}
            <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.agreeToPrivacy && <p className="text-red-400 text-xs ml-6">{errors.agreeToPrivacy}</p>}

        <label className="flex items-start gap-2 text-sm text-gray-200">
          <input
            type="checkbox"
            name="allowNotifications"
            checked={formData.allowNotifications}
            onChange={handleInputChange}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-green-400 focus:ring-2 focus:ring-green-400/30"
          />
          <span>Allow push notifications for bus updates (Recommended)</span>
        </label>
      </div>
    </div>
  );

  const renderProgressBar = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-green-100">Step {currentStep} of 4</span>
        <span className="text-xs text-gray-300">{Math.round((currentStep / 4) * 100)}% Complete</span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
        <div 
          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-8">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className={`absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg px-3 py-2 text-white sm:top-6 sm:left-6 sm:px-4 sm:py-3 ${GLASS_PRESETS.BACK_BUTTON}`}
      >
        <PiArrowLeftDuotone className="h-4 w-4 text-white drop-shadow-sm sm:h-5 sm:w-5" />
        <span className="text-sm font-semibold text-white drop-shadow-sm sm:text-base">
          Back
        </span>
      </button>

      {/* Main Content */}
      <div className={`relative z-10 mx-6 my-4 flex w-full max-w-md flex-col items-center gap-4 rounded-xl px-6 py-6 ${GLASS_PRESETS.AUTH_MAIN}`}>
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center sm:gap-3">
          <button
            onClick={handleLogoClick}
            className="transition-transform duration-200 hover:scale-105"
          >
            <img
              src={Logo}
              alt="BUP Bus Tracker"
              className="h-12 w-18 object-contain drop-shadow-lg sm:h-16 sm:w-24"
            />
          </button>

          {/* User Icon */}
          <div className="flex justify-center">
            <PiShieldCheckDuotone className="h-12 w-12 text-blue-300 sm:h-16 sm:w-16" />
          </div>

          <h1 className="text-xl font-extrabold text-green-100 drop-shadow-lg sm:text-2xl">
            Join as a{" "}
            <span className="text-blue-300">Passenger</span>
          </h1>

          <p className="text-sm font-medium text-gray-100 drop-shadow sm:text-base">
            Create your account to start using BUP Bus Tracker
          </p>
        </div>

        {/* Progress Bar */}
        {renderProgressBar()}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className={`flex-1 rounded-lg py-3 font-semibold text-white ${GLASS_PRESETS.INTERACTIVE_BUTTON}`}
              >
                Previous
              </button>
            )}
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className={`flex-1 rounded-lg border border-blue-400/30 bg-blue-500/20 py-3 font-semibold text-white shadow-lg hover:scale-105 hover:bg-blue-500/30 hover:shadow-xl backdrop-blur-sm transition-all duration-300`}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 rounded-lg border border-green-400/30 bg-green-500/20 py-3 font-semibold text-white shadow-lg hover:scale-105 hover:bg-green-500/30 hover:shadow-xl backdrop-blur-sm transition-all duration-300 ${
                  isLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <PiCheckDuotone className="h-5 w-5" />
                    Create Account
                  </div>
                )}
              </button>
            )}
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-200/90 sm:text-base">
            Already have an account?{" "}
            <button
              onClick={handleLogin}
              className="font-semibold text-green-300 underline decoration-green-300/50 underline-offset-2 transition-all duration-200 hover:text-green-200 hover:decoration-green-200/70"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-4 px-2 text-center text-xs text-gray-200/80 drop-shadow">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-green-200">BUP Bus Tracker</span>. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Signup;
