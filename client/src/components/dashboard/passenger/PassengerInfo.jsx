import {
  PiBookmarkDuotone,
  PiEnvelopeDuotone,
  PiIdentificationCardDuotone,
  PiMapPinDuotone,
  PiPhoneDuotone,
  PiUserDuotone,
} from "react-icons/pi";

const PassengerInfo = ({ passengerData }) => {
  return (
    <div className="space-y-6">
      {/* Main Profile Card */}
      <div className="hover:shadow-3xl rounded-2xl border border-white/40 bg-black/40 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-black/50">
        <div className="mb-4 flex items-center gap-3">
          <PiUserDuotone className="h-6 w-6 text-blue-200 drop-shadow-lg" />
          <h2 className="text-lg font-semibold text-white drop-shadow-lg">
            Passenger Information
          </h2>
        </div>

        <div className="space-y-6">
          {/* Profile Photo & Basic Info */}
          <div className="text-center">
            <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-blue-300/60 shadow-xl backdrop-blur-sm">
              <img
                src={passengerData.photo}
                alt={passengerData.nameEn}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">
              {passengerData.name}
            </h3>
            <p className="text-sm text-gray-200 drop-shadow">
              {passengerData.nameEn}
            </p>
            <div className="mt-2 flex items-center justify-center gap-1">
              <span className="text-blue-400 drop-shadow">🎓</span>
              <span className="text-sm font-medium text-white drop-shadow">
                {passengerData.totalTrips} trips completed
              </span>
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/30">
              <PiIdentificationCardDuotone className="h-5 w-5 text-green-200 drop-shadow-lg" />
              <div className="flex-1">
                <p className="text-xs text-gray-200 drop-shadow">Student ID</p>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {passengerData.studentId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/30">
              <PiBookmarkDuotone className="h-5 w-5 text-purple-200 drop-shadow-lg" />
              <div className="flex-1">
                <p className="text-xs text-gray-200 drop-shadow">Department</p>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {passengerData.department}
                </p>
                <p className="text-xs text-gray-300 drop-shadow">
                  {passengerData.faculty}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/30">
              <PiPhoneDuotone className="h-5 w-5 text-orange-200 drop-shadow-lg" />
              <div className="flex-1">
                <p className="text-xs text-gray-200 drop-shadow">Phone</p>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {passengerData.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/30">
              <PiEnvelopeDuotone className="h-5 w-5 text-pink-200 drop-shadow-lg" />
              <div className="flex-1">
                <p className="text-xs text-gray-200 drop-shadow">Email</p>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {passengerData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-md transition-all duration-200 hover:bg-white/30">
              <PiMapPinDuotone className="h-5 w-5 text-red-200 drop-shadow-lg" />
              <div className="flex-1">
                <p className="text-xs text-gray-200 drop-shadow">Address</p>
                <p className="text-sm font-medium text-white drop-shadow-lg">
                  {passengerData.address}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-blue-300/50 bg-blue-500/20 p-3 text-center backdrop-blur-md">
              <p className="text-sm font-medium text-blue-200 drop-shadow-lg">
                Member Since
              </p>
              <p className="text-xs text-blue-300 drop-shadow">
                {passengerData.memberSince}
              </p>
            </div>
            <div className="rounded-xl border border-green-300/50 bg-green-500/20 p-3 text-center backdrop-blur-md">
              <p className="text-sm font-medium text-green-200 drop-shadow-lg">
                Favorite Route
              </p>
              <p className="text-xs text-green-300 drop-shadow">
                {passengerData.favoriteRoute}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
