import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import BusInfo from "../../../components/dashboard/driver/BusInfo";
import DriverInfo from "../../../components/dashboard/driver/DriverInfo";
import LocationStreaming from "../../../components/dashboard/driver/LocationStreaming";
import RouteMap from "../../../components/dashboard/driver/RouteMap";
import UpcomingTrips from "../../../components/dashboard/driver/UpcomingTrips";
import Header from "../../../components/common/Header";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const DriverDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
     
    navigate("/");
  };

  const handleProfile = () => {
     
    navigate("/driver/profile");
  };

  const handleSettings = () => {
     
    navigate("/driver/settings");
  };

  const handleNotificationClick = () => {
     
    console.log("Notification clicked");
  };

  return (
    <div className="min-h-screen">
      { }
      <div className="fixed inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        { }
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-green-400/15 to-blue-400/15 blur-xl" />
        <div className="absolute top-40 right-32 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-xl delay-1000" />
        <div className="absolute bottom-32 left-1/3 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-blue-400/15 to-green-400/15 blur-xl delay-2000" />
      </div>

      { }
      <Header
        userType="driver"
        pageTitle="Dashboard"
        position="sticky"
        notificationCount={2}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfile}
        onSettingsClick={handleSettings}
        onLogoutClick={handleLogout}
      />

      { }
      <main className="relative z-10 pt-4">
        <div className="mx-auto max-w-full px-4 pb-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            { }
            <div className="lg:col-span-3">
              <DriverInfo />
            </div>

            { }
            <div className="lg:col-span-6">
              <div className="h-1/2 space-y-4">
                { }
                <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                  { }
                  <div className="flex-1">
                    <BusInfo />
                  </div>

                  { }
                  <div className="w-full lg:w-80">
                    <UpcomingTrips />
                  </div>
                </div>

                { }
                <div>
                  <RouteMap />
                </div>
              </div>
            </div>

            { }
            <div className="lg:col-span-3">
              <LocationStreaming />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
