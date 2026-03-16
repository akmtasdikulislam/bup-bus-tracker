import { useState } from "react";
import {
  PiArrowLeftDuotone,
  PiEnvelopeDuotone,
  PiLockKeyDuotone,
  PiPaperPlaneTiltDuotone,
} from "react-icons/pi";
import { useNavigate, useSearchParams } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Logo from "../../assets/logo/bup-bus-tracker-logo.png";
import { auth } from "../../lib/firebase";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userType = searchParams.get("type") || "passenger";

  const [formData, setFormData] = useState({
    email: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, formData.email);
      setIsEmailSent(true);
      toast.success("Password reset email sent successfully!");
    } catch (error) {
      console.error("Password reset error:", error);

      let errorMessage = "Failed to send reset email. Please try again.";
      
      if (error.code) {
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No account found with this email address.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many requests. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToLogin = () => {
     
    navigate(`/login?type=${userType}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      { }
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      { }
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-lg border border-white/40 bg-black/40 px-3 py-2 text-white shadow-lg backdrop-blur-md transition-all duration-200 hover:bg-black/60 hover:shadow-xl sm:top-6 sm:left-6 sm:px-4 sm:py-3"
      >
        <PiArrowLeftDuotone className="h-4 w-4 text-white drop-shadow-sm sm:h-5 sm:w-5" />
        <span className="text-sm font-semibold text-white drop-shadow-sm sm:text-base">
          Back
        </span>
      </button>

      { }
      <div className="relative z-10 mx-4 flex w-11/12 max-w-full flex-col items-center gap-6 rounded-xl border border-white/30 bg-white/20 px-4 py-8 shadow-2xl backdrop-blur-lg sm:mx-4 sm:max-w-md sm:gap-8 sm:rounded-2xl sm:px-8 sm:py-10 md:max-w-lg md:px-10 md:py-12">
        {!isEmailSent ? (
          <>
            { }
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

              { }
              <div className="flex justify-center">
                <PiLockKeyDuotone className="h-16 w-16 text-orange-300 sm:h-20 sm:w-20" />
              </div>

              <h1 className="text-center text-xl font-extrabold text-green-100 drop-shadow-lg sm:text-2xl md:text-3xl">
                Forgot <span className="text-orange-300">Password?</span>
              </h1>

              <p className="text-center text-sm font-medium text-gray-100 drop-shadow sm:text-base">
                Don't worry! Enter your email address and we'll send you a link
                to reset your password.
              </p>
            </div>

            { }
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4 sm:space-y-6"
            >
              { }
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-green-100 sm:text-base"
                >
                  Email Address
                </label>
                <div className="relative">
                  <PiEnvelopeDuotone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pr-4 pl-10 text-white placeholder-gray-300 backdrop-blur-sm transition-all duration-200 focus:border-green-400/50 focus:bg-white/20 focus:ring-2 focus:ring-green-400/30 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              { }
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg border border-orange-400/30 bg-orange-500/20 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-orange-500/30 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Sending Reset Link...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <PiPaperPlaneTiltDuotone className="h-5 w-5" />
                    Send Reset Link
                  </div>
                )}
              </button>
            </form>

            { }
            <div className="text-center">
              <p className="text-sm text-gray-200/90 sm:text-base">
                Remember your password?{" "}
                <button
                  onClick={handleBackToLogin}
                  className="font-semibold text-green-300 underline decoration-green-300/50 underline-offset-2 transition-all duration-200 hover:text-green-200 hover:decoration-green-200/70"
                >
                  Back to Login
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            { }
            <div className="flex flex-col items-center gap-4 text-center sm:gap-6">
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

              { }
              <div className="flex justify-center">
                <PiPaperPlaneTiltDuotone className="h-16 w-16 text-green-400 sm:h-20 sm:w-20" />
              </div>

              <h1 className="text-xl font-extrabold text-green-100 drop-shadow-lg sm:text-2xl md:text-3xl">
                Email <span className="text-green-400">Sent!</span>
              </h1>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm font-medium text-gray-100 drop-shadow sm:text-base">
                  We've sent a password reset link to:
                </p>
                <p className="rounded-lg border border-green-400/30 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-300 sm:text-base">
                  {formData.email}
                </p>
                <p className="text-xs text-gray-200/80 sm:text-sm">
                  Please check your email and click the link to reset your
                  password. The link will expire in 15 minutes.
                </p>
              </div>

              { }
              <div className="flex w-full flex-col gap-3 sm:gap-4">
                <button
                  onClick={handleBackToLogin}
                  className="w-full rounded-lg border border-green-400/30 bg-green-500/20 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-500/30 hover:shadow-xl"
                >
                  Back to Login
                </button>

                <button
                  onClick={() => {
                    setIsEmailSent(false);
                    setFormData({ email: "" });
                  }}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl"
                >
                  Send Another Email
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      { }
      <footer className="relative z-10 mt-6 px-2 text-center text-xs text-gray-200/80 drop-shadow sm:mt-10">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-green-200">BUP Bus Tracker</span>. All rights
        reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;
