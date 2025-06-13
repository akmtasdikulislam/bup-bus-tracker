import { createBrowserRouter } from "react-router";
import BUPCover from "./assets/images/bup-cover.jpg";
import AkmTasdikulIslam from "./assets/images/developers/akm-tasdikul-islam.png";
import MuztabaRafid from "./assets/images/developers/muztaba-rafid.png";
import Logo from "./assets/logo/bup-bus-tracker-logo.png";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
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

        {/* Main Content */}
        <div className="relative z-10 mx-4 flex w-11/12 max-w-full flex-col items-center gap-6 rounded-xl border border-white/30 bg-white/20 px-4 py-8 shadow-2xl backdrop-blur-lg sm:mx-4 sm:max-w-2xl sm:gap-8 sm:rounded-2xl sm:px-8 sm:py-10 md:mx-4 md:max-w-4xl md:px-10 md:py-12">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <img
              src={Logo}
              alt="BUP Bus Tracker"
              className="mb-1 h-24 w-36 object-contain drop-shadow-lg sm:mb-2 sm:h-32 sm:w-48 md:h-40 md:w-60"
            />
            <h1 className="text-center text-2xl font-extrabold text-green-100 drop-shadow-lg sm:text-4xl md:text-5xl">
              Welcome to <span className="text-green-400">BUP Bus Tracker</span>
            </h1>
            <p className="mt-1 text-center text-base font-medium text-gray-100 drop-shadow sm:mt-2 sm:text-lg md:text-2xl">
              We are coming soon.
              <br />
              <span className="font-semibold text-green-200">
                Our website is under construction.
              </span>
            </p>
          </div>

          {/* Developers Section */}
          <div className="mt-4 w-full sm:mt-6">
            <h5 className="mb-2 text-center font-semibold tracking-wide text-green-100 sm:mb-4">
              Developed by
            </h5>
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 md:flex-row">
              {/* Developer 1 */}
              <div className="flex w-full flex-row items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3 shadow transition-transform duration-400 hover:scale-105 sm:gap-4 sm:p-4 md:w-auto">
                <img
                  src={AkmTasdikulIslam}
                  alt="Akm Tasdikul Islam"
                  className="h-12 w-12 rounded-full border-2 border-green-300/60 shadow sm:h-16 sm:w-16"
                />
                <div>
                  <h3 className="text-base font-semibold text-green-300 sm:text-lg">
                    Akm Tasdikul Islam
                  </h3>
                  <p className="text-xs text-gray-100/90 sm:text-sm">
                    BCSE-25, Dept. of CSE, FST, BUP
                  </p>
                </div>
              </div>
              {/* Divider */}
              <div className="hidden h-16 w-[2px] rounded-full bg-gradient-to-b from-green-300/50 to-white/20 md:block"></div>
              {/* Developer 2 */}
              <div className="flex w-full flex-row items-center gap-3 rounded-lg border border-white/10 bg-white/10 p-3 shadow transition-transform duration-400 hover:scale-105 sm:gap-4 sm:p-4 md:w-auto">
                <img
                  src={MuztabaRafid}
                  alt="Muztaba Rafid"
                  className="h-12 w-12 rounded-full border-2 border-green-300/60 shadow sm:h-16 sm:w-16"
                />
                <div>
                  <h3 className="text-base font-semibold text-green-300 sm:text-lg">
                    Muztaba Rafid
                  </h3>
                  <p className="text-xs text-gray-100/90 sm:text-sm">
                    MGT-6, Dept. of Management, FBS, BUP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 mt-6 px-2 text-center text-xs text-gray-200/80 drop-shadow sm:mt-10">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-green-200">BUP Bus Tracker</span>. All rights
          reserved.
        </footer>
      </div>
    ),
  },
]);

export default router;
