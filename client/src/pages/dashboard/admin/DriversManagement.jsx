import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiBusDuotone,
  PiDownloadDuotone,
  PiEyeDuotone,
  PiFunnelDuotone,
  PiMagnifyingGlassDuotone,
  PiPencilDuotone,
  PiPlusBold,
  PiSortAscendingDuotone,
  PiTrashDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import DeleteConfirmModal from "../../../components/dashboard/admin/DeleteConfirmModal";
import DriverModal from "../../../components/dashboard/admin/DriverModal";

const DriversManagement = () => {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("view");  
  const itemsPerPage = 10;

  useEffect(() => {
    const mockDrivers = [
      {
        id: 1,
        name: "মোঃ করিম উদ্দিন",
        nameEn: "Md. Karim Uddin",
        licenseNumber: "DRV-001-2020",
        phone: "+880 1712-345678",
        email: "karim.driver@bup.edu.bd",
        address: "Mirpur-10, Dhaka-1216",
        busAssigned: "BUS-001",
        joinDate: "2020-01-15",
        status: "active",
        totalTrips: 1256,
        experience: "15 years",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 2,
        name: "আবদুল রহমান",
        nameEn: "Abdul Rahman",
        licenseNumber: "DRV-002-2019",
        phone: "+880 1712-345679",
        email: "abdul.driver@bup.edu.bd",
        address: "Uttara, Dhaka-1230",
        busAssigned: "BUS-002",
        joinDate: "2019-03-20",
        status: "active",
        totalTrips: 1789,
        experience: "18 years",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 3,
        name: "মোঃ রফিক মিয়া",
        nameEn: "Md. Rafiq Mia",
        licenseNumber: "DRV-003-2021",
        phone: "+880 1712-345680",
        email: "rafiq.driver@bup.edu.bd",
        address: "Dhanmondi, Dhaka-1205",
        busAssigned: "BUS-003",
        joinDate: "2021-06-10",
        status: "inactive",
        totalTrips: 845,
        experience: "12 years",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 4,
        name: "আলী হোসেন",
        nameEn: "Ali Hossain",
        licenseNumber: "DRV-004-2022",
        phone: "+880 1712-345681",
        email: "ali.driver@bup.edu.bd",
        address: "Gulshan-2, Dhaka-1212",
        busAssigned: "BUS-004",
        joinDate: "2022-02-28",
        status: "active",
        totalTrips: 567,
        experience: "8 years",
        photo:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 5,
        name: "নুর মোহাম্মদ",
        nameEn: "Nur Mohammad",
        licenseNumber: "DRV-005-2018",
        phone: "+880 1712-345682",
        email: "nur.driver@bup.edu.bd",
        address: "Banani, Dhaka-1213",
        busAssigned: "BUS-005",
        joinDate: "2018-09-15",
        status: "active",
        totalTrips: 2134,
        experience: "22 years",
        photo:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
      },
    ];
    setDrivers(mockDrivers);
  }, []);

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.phone.includes(searchQuery) ||
      driver.busAssigned.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterBy === "all" || driver.status === filterBy;

    return matchesSearch && matchesFilter;
  });

  const sortedDrivers = [...filteredDrivers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "licenseNumber":
        return a.licenseNumber.localeCompare(b.licenseNumber);
      case "joinDate":
        return new Date(b.joinDate) - new Date(a.joinDate);
      case "trips":
        return b.totalTrips - a.totalTrips;
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedDrivers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDrivers = sortedDrivers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleBack = () => {
    navigate("/admin");
  };

  const handleView = (driver) => {
    setSelectedDriver(driver);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedDriver(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleDelete = (driver) => {
    setDriverToDelete(driver);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setDrivers(drivers.filter((d) => d.id !== driverToDelete.id));
    setShowDeleteModal(false);
    setDriverToDelete(null);
  };

  const handleSave = (driverData) => {
    if (modalMode === "add") {
      const newDriver = {
        ...driverData,
        id: drivers.length + 1,
        joinDate: new Date().toISOString().split("T")[0],
        totalTrips: 0,
        status: "active",
      };
      setDrivers([...drivers, newDriver]);
    } else if (modalMode === "edit") {
      setDrivers(drivers.map((d) => (d.id === driverData.id ? driverData : d)));
    }
    setShowModal(false);
  };

  const handleExport = () => {
     
    console.log("Exporting drivers data...");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      { }
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      { }
      <header className="relative z-10 border-b border-white/30 bg-black/30 shadow-xl backdrop-blur-xl">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="rounded-lg border border-white/40 bg-white/25 p-2 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/35"
              >
                <PiArrowLeftDuotone className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src={Logo}
                  alt="BUP Bus Tracker"
                  className="h-10 w-16 object-contain drop-shadow-lg"
                />
                <div>
                  <h1 className="text-lg font-bold text-white drop-shadow-lg">
                    Drivers Management
                  </h1>
                  <p className="text-xs font-medium text-blue-200 drop-shadow">
                    Admin Panel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      { }
      <main className="relative z-10 mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          { }
          <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              { }
              <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                { }
                <div className="relative max-w-md flex-1">
                  <PiMagnifyingGlassDuotone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search drivers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-white/40 bg-white/25 py-2 pr-4 pl-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                  />
                </div>

                { }
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <PiFunnelDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="licenseNumber">
                        Sort by License Number
                      </option>
                      <option value="joinDate">Sort by Join Date</option>
                      <option value="trips">Sort by Total Trips</option>
                      <option value="experience">Sort by Experience</option>
                    </select>
                    <PiSortAscendingDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>
                </div>
              </div>

              { }
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 rounded-lg border border-white/40 bg-green-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-green-500/35"
                >
                  <PiDownloadDuotone className="h-4 w-4" />
                  Export
                </button>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 rounded-lg border border-white/40 bg-blue-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                >
                  <PiPlusBold className="h-4 w-4" />
                  Add Driver
                </button>
              </div>
            </div>
          </div>

          { }
          <div className="overflow-hidden rounded-xl border border-white/30 bg-black/30 backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20 bg-white/10">
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Photo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      License Number
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Bus Assigned
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Experience
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Trips
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentDrivers.map((driver) => (
                    <tr
                      key={driver.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={driver.photo}
                          alt={driver.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {driver.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {driver.nameEn}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {driver.licenseNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <PiBusDuotone className="h-4 w-4 text-blue-400" />
                          {driver.busAssigned}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          {driver.phone}
                        </div>
                        <div className="text-xs text-gray-400">
                          {driver.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {driver.experience}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            driver.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {driver.totalTrips}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(driver)}
                            className="rounded-lg border border-white/40 bg-blue-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                            title="View"
                          >
                            <PiEyeDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(driver)}
                            className="rounded-lg border border-white/40 bg-yellow-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/35"
                            title="Edit"
                          >
                            <PiPencilDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(driver)}
                            className="rounded-lg border border-white/40 bg-red-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-500/35"
                            title="Delete"
                          >
                            <PiTrashDuotone className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            { }
            <div className="flex items-center justify-between border-t border-white/20 bg-white/10 px-6 py-4">
              <div className="text-sm text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, sortedDrivers.length)} of{" "}
                {sortedDrivers.length} drivers
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-white/40 bg-white/25 px-3 py-1 text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="flex items-center px-3 py-1 text-sm text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-white/40 bg-white/25 px-3 py-1 text-sm text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      { }
      {showModal && (
        <DriverModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          driver={selectedDriver}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={driverToDelete?.name}
          itemType="driver"
        />
      )}
    </div>
  );
};

export default DriversManagement;
