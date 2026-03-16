import {
  PiEnvelopeDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiUserDuotone,
} from "react-icons/pi";

const DriverInfo = () => {
  // Placeholder driver data
  const driverData = {
    name: "মোহাম্মদ রহিম উদ্দিন",
    nameEn: "Mohammad Rahim Uddin",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    licenseNo: "DL-1234567890",
    idNo: "1234567890123",
    phone: "+880 1712-345678",
    email: "rahim.driver@bup.edu.bd",
    address: "Mirpur-10, Dhaka-1216",
    experience: "8 years",
    rating: 4.8,
    totalTrips: 1247,
  };

  return (
    <div className="hover:shadow-3xl h-full rounded-2xl border border-white/40 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
      <div className="mb-6 flex items-center gap-3">
        <PiUserDuotone className="h-6 w-6 text-red-300 drop-shadow" />
        <h2 className="text-lg font-semibold text-white drop-shadow-lg">
          Driver Information
        </h2>
      </div>

      <div className="flex flex-1 flex-col justify-between space-y-6">
        {/* Driver Photo & Basic Info */}
        <div className="text-center">
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-red-300/60 shadow-xl backdrop-blur-sm">
            <img
              src={driverData.photo}
              alt={driverData.nameEn}
              className="h-full w-full object-cover"
            />
          </div>
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            {driverData.name}
          </h3>
          <p className="text-sm text-gray-200 drop-shadow">
            {driverData.nameEn}
          </p>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-yellow-400 drop-shadow">★</span>
            <span className="text-sm font-medium text-white drop-shadow">
              {driverData.rating}
            </span>
            <span className="text-xs text-gray-300 drop-shadow">
              ({driverData.totalTrips} trips)
            </span>
          </div>
        </div>

        {/* Contact Information - Flexible spacing */}
        <div className="flex flex-1 flex-col justify-center space-y-4">
          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <PiIdentificationCardDuotone className="h-5 w-5 text-blue-300 drop-shadow" />
            <div className="flex-1">
              <p className="text-xs text-gray-300 drop-shadow">License No.</p>
              <p className="text-sm font-medium text-white drop-shadow">
                {driverData.licenseNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <PiIdentificationCardDuotone className="h-5 w-5 text-green-300 drop-shadow" />
            <div className="flex-1">
              <p className="text-xs text-gray-300 drop-shadow">National ID</p>
              <p className="text-sm font-medium text-white drop-shadow">
                {driverData.idNo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <PiPhoneDuotone className="h-5 w-5 text-purple-300 drop-shadow" />
            <div className="flex-1">
              <p className="text-xs text-gray-300 drop-shadow">Phone</p>
              <p className="text-sm font-medium text-white drop-shadow">
                {driverData.phone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <PiEnvelopeDuotone className="h-5 w-5 text-orange-300 drop-shadow" />
            <div className="flex-1">
              <p className="text-xs text-gray-300 drop-shadow">Email</p>
              <p className="text-sm font-medium text-white drop-shadow">
                {driverData.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-white/20">
            <PiMapPinDuotone className="h-5 w-5 text-red-300 drop-shadow" />
            <div className="flex-1">
              <p className="text-xs text-gray-300 drop-shadow">Address</p>
              <p className="text-sm font-medium text-white drop-shadow">
                {driverData.address}
              </p>
            </div>
          </div>
        </div>

        {/* Experience Badge - Fixed at bottom */}
        <div className="rounded-xl border border-green-300/50 bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 text-center backdrop-blur-sm">
          <p className="text-sm font-medium text-green-200 drop-shadow">
            {driverData.experience} Experience
          </p>
          <p className="text-xs text-green-300 drop-shadow">
            Professional Driver
          </p>
        </div>
      </div>
    </div>
  );
};

export default DriverInfo;
