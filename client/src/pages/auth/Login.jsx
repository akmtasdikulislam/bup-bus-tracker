import { useState } from "react";
import {
  PiArrowLeftDuotone,
  PiEyeDuotone,
  PiEyeSlashDuotone,
  PiLockDuotone,
  PiSteeringWheelDuotone,
  PiUserDuotone,
} from "react-icons/pi";
import toast from "react-hot-toast";

import { useNavigate, useSearchParams } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Logo from "../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS } from "../../utils/glassomorphism";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type") || "passenger";
  const { login: authLogin } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authLogin(formData.email, formData.password);
      
      toast.success("Login successful!");
      
      // Navigate based on user role
      const role = result.backendUser?.role || "passenger";
      
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "driver":
          navigate("/driver");
          break;
        case "moderator":
          navigate("/moderator");
          break;
        default:
          navigate("/passenger");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleForgotPassword = () => {
    navigate(`/forgot-password?type=${userType}`);
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const getUserIcon = () => {
    return userType === "driver" ? (
      <PiSteeringWheelDuotone className="h-16 w-16 text-red-300 sm:h-20 sm:w-20" />
    ) : (
      <PiUserDuotone className="h-16 w-16 text-blue-300 sm:h-20 sm:w-20" />
    );
  };

  const getUserColor = () => {
    return userType === "driver" ? "text-red-300" : "text-blue-300";
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
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
      <div className={`relative z-10 mx-4 flex w-11/12 max-w-full flex-col items-center gap-6 rounded-xl px-4 py-8 sm:mx-4 sm:max-w-md sm:gap-8 sm:rounded-2xl sm:px-8 sm:py-10 md:max-w-lg md:px-10 md:py-12 ${GLASS_PRESETS.AUTH_MAIN}`}>
        {/* Header */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <button
            onClick={handleLogoClick}
            className="mb-1 transition-transform duration-200 hover:scale-105 sm:mb-2"
          >
            <img
              src={Logo}
              alt="BUP Bus Tracker"
              className="h-16 w-24 object-contain drop-shadow-lg sm:h-20 sm:w-32"
            />
          </button>

          {/* User Type Icon - Centered above title */}
          <div className="flex justify-center">{getUserIcon()}</div>

          <h1 className="text-center text-xl font-extrabold text-green-100 drop-shadow-lg sm:text-2xl md:text-3xl">
            Login as a{" "}
            <span className={getUserColor()}>
              {userType === "driver" ? "Driver" : "Passenger"}
            </span>
          </h1>

          <p className="text-center text-sm font-medium text-gray-100 drop-shadow sm:text-base">
            Welcome back! Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4 sm:space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-green-100 sm:text-base"
            >
              Email
            </label>
            <div className="relative">
              <PiUserDuotone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full rounded-lg py-3 pr-4 pl-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-green-100 sm:text-base"
            >
              Password
            </label>
            <div className="relative">
              <PiLockDuotone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className={`w-full rounded-lg py-3 pr-12 pl-10 text-white placeholder-gray-300 ${GLASS_PRESETS.FORM_INPUT}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300 transition-colors hover:text-white"
              >
                {showPassword ? (
                  <PiEyeSlashDuotone className="h-5 w-5" />
                ) : (
                  <PiEyeDuotone className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-white/20 bg-white/10 text-green-400 focus:ring-2 focus:ring-green-400/30"
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-medium text-green-300 transition-colors hover:text-green-200"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-lg border px-4 py-3 font-semibold text-white shadow-lg hover:scale-105 hover:shadow-xl backdrop-blur-sm transition-all duration-300 ${
              userType === "driver"
                ? "border-red-400/30 bg-red-500/20 hover:bg-red-500/30"
                : "border-blue-400/30 bg-blue-500/20 hover:bg-blue-500/30"
            } ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-sm text-gray-200/90 sm:text-base">
            Don't have an account?{" "}
            <button
              onClick={handleSignup}
              className="font-semibold text-green-300 underline decoration-green-300/50 underline-offset-2 transition-all duration-200 hover:text-green-200 hover:decoration-green-200/70"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-6 px-2 text-center text-xs text-gray-200/80 drop-shadow sm:mt-10">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-green-200">BUP Bus Tracker</span>. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Login;
