import { PiSteeringWheelDuotone, PiUserDuotone } from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../assets/images/bup-cover.jpg";
import Logo from "../../assets/logo/bup-bus-tracker-logo.png";
import { GLASS_PRESETS, GLASS_STYLES, GLASS_HOVER, GLASS_TRANSITIONS } from "../../utils/glassomorphism";

const Home = () => {
  const navigate = useNavigate();

  const handleUserTypeSelection = (userType) => {
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
      <div className={`relative z-10 mx-4 flex w-11/12 max-w-full flex-col items-center gap-6 rounded-xl px-4 py-8 sm:mx-4 sm:max-w-2xl sm:gap-8 sm:rounded-2xl sm:px-8 sm:py-10 md:mx-4 md:max-w-4xl md:px-10 md:py-12 ${GLASS_PRESETS.AUTH_MAIN}`}>
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <button
            onClick={handleLogoClick}
            className="mb-1 transition-transform duration-200 hover:scale-105 sm:mb-2"
          >
            <img
              src={Logo}
              alt="BUP Bus Tracker"
              className="h-24 w-36 object-contain drop-shadow-lg sm:h-32 sm:w-48 md:h-40 md:w-60"
            />
          </button>
          <h1 className="text-center text-2xl font-extrabold text-green-100 drop-shadow-lg sm:text-4xl md:text-5xl">
            Welcome to <span className="text-green-400">BUP Bus Tracker</span>
          </h1>
          <p className="mt-1 text-center text-base font-medium text-gray-100 drop-shadow sm:mt-2 sm:text-lg md:text-xl">
            Track your campus bus in real-time and never miss a ride
          </p>
        </div>

        { }
        <div className="mt-4 w-full sm:mt-6">
          <h3 className="mb-4 text-center text-lg font-semibold tracking-wide text-green-100 sm:mb-6 sm:text-xl">
            Continue as
          </h3>
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:flex-row">
            { }
            <button
              onClick={() => handleUserTypeSelection("driver")}
              className={`flex w-full items-center justify-center gap-3 rounded-lg border border-red-400/30 bg-red-500/20 px-6 py-4 text-white shadow-lg hover:scale-105 hover:bg-red-500/30 hover:shadow-xl sm:gap-4 sm:px-8 sm:py-5 md:w-auto md:min-w-[200px] backdrop-blur-sm ${GLASS_TRANSITIONS.DEFAULT}`}
            >
              <PiSteeringWheelDuotone className="h-6 w-6 text-red-300 sm:h-8 sm:w-8" />
              <span className="text-base font-semibold sm:text-lg">Driver</span>
            </button>

            { }
            <div className="hidden h-16 w-[2px] rounded-full bg-gradient-to-b from-green-300/50 to-white/20 md:block"></div>

            { }
            <button
              onClick={() => handleUserTypeSelection("passenger")}
              className={`flex w-full items-center justify-center gap-3 rounded-lg border border-blue-400/30 bg-blue-500/20 px-6 py-4 text-white shadow-lg hover:scale-105 hover:bg-blue-500/30 hover:shadow-xl sm:gap-4 sm:px-8 sm:py-5 md:w-auto md:min-w-[200px] backdrop-blur-sm ${GLASS_TRANSITIONS.DEFAULT}`}
            >
              <PiUserDuotone className="h-6 w-6 text-blue-300 sm:h-8 sm:w-8" />
              <span className="text-base font-semibold sm:text-lg">
                Passenger
              </span>
            </button>
          </div>

          { }
          <div className="mt-6 text-center sm:mt-8">
            <p className="text-sm text-gray-200/90 sm:text-base">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-semibold text-green-300 underline decoration-green-300/50 underline-offset-2 transition-all duration-200 hover:text-green-200 hover:decoration-green-200/70"
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
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

export default Home;
