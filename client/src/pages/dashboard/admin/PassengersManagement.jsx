import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
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
import PassengerModal from "../../../components/dashboard/admin/PassengerModal";

const PassengersManagement = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passengerToDelete, setPassengerToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // view, edit, add
  const itemsPerPage = 10;

  // Mock data for passengers
  useEffect(() => {
    const mockPassengers = [
      {
        id: 1,
        name: "সারা খান",
        nameEn: "Sara Khan",
        studentId: "BCSE-25-001",
        email: "sara.khan@student.bup.edu.bd",
        phone: "+880 1712-345678",
        department: "Computer Science & Engineering",
        faculty: "Faculty of Science & Technology",
        address: "Mirpur-12, Dhaka-1216",
        joinDate: "2023-01-15",
        status: "active",
        totalTrips: 156,
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b9e0b9d5?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 2,
        name: "আহমেদ রহমান",
        nameEn: "Ahmed Rahman",
        studentId: "BCSE-25-002",
        email: "ahmed.rahman@student.bup.edu.bd",
        phone: "+880 1712-345679",
        department: "Civil Engineering",
        faculty: "Faculty of Engineering",
        address: "Uttara, Dhaka-1230",
        joinDate: "2023-02-20",
        status: "active",
        totalTrips: 89,
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 3,
        name: "ফাতিমা খাতুন",
        nameEn: "Fatima Khatun",
        studentId: "BCSE-25-003",
        email: "fatima.khatun@student.bup.edu.bd",
        phone: "+880 1712-345680",
        department: "Business Administration",
        faculty: "Faculty of Business Studies",
        address: "Dhanmondi, Dhaka-1205",
        joinDate: "2023-03-10",
        status: "inactive",
        totalTrips: 45,
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      // Add more mock data as needed
    ];
    setPassengers(mockPassengers);
  }, []);

  // Filter and search logic
  const filteredPassengers = passengers.filter((passenger) => {
    const matchesSearch =
      passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      passenger.phone.includes(searchQuery);

    const matchesFilter = filterBy === "all" || passenger.status === filterBy;

    return matchesSearch && matchesFilter;
  });

  // Sort logic
  const sortedPassengers = [...filteredPassengers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "studentId":
        return a.studentId.localeCompare(b.studentId);
      case "joinDate":
        return new Date(b.joinDate) - new Date(a.joinDate);
      case "trips":
        return b.totalTrips - a.totalTrips;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedPassengers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPassengers = sortedPassengers.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleBack = () => {
    navigate("/admin");
  };

  const handleView = (passenger) => {
    setSelectedPassenger(passenger);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (passenger) => {
    setSelectedPassenger(passenger);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedPassenger(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleDelete = (passenger) => {
    setPassengerToDelete(passenger);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setPassengers(passengers.filter((p) => p.id !== passengerToDelete.id));
    setShowDeleteModal(false);
    setPassengerToDelete(null);
  };

  const handleSave = (passengerData) => {
    if (modalMode === "add") {
      const newPassenger = {
        ...passengerData,
        id: passengers.length + 1,
        joinDate: new Date().toISOString().split("T")[0],
        totalTrips: 0,
        status: "active",
      };
      setPassengers([...passengers, newPassenger]);
    } else if (modalMode === "edit") {
      setPassengers(
        passengers.map((p) => (p.id === passengerData.id ? passengerData : p)),
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Export logic would go here
    console.log("Exporting passengers data...");
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={BUPCover}
          alt="BUP Cover"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Header */}
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
                    Passengers Management
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

      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-full px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search and Filters */}
              <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative max-w-md flex-1">
                  <PiMagnifyingGlassDuotone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Search passengers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-white/40 bg-white/25 py-2 pr-4 pl-10 text-white placeholder-gray-300 backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                  />
                </div>

                {/* Filters */}
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
                      <option value="studentId">Sort by Student ID</option>
                      <option value="joinDate">Sort by Join Date</option>
                      <option value="trips">Sort by Total Trips</option>
                    </select>
                    <PiSortAscendingDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
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
                  Add Passenger
                </button>
              </div>
            </div>
          </div>

          {/* Passengers Table */}
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
                      Student ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Contact
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
                  {currentPassengers.map((passenger) => (
                    <tr
                      key={passenger.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={passenger.photo}
                          alt={passenger.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {passenger.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {passenger.nameEn}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {passenger.studentId}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          {passenger.department}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          {passenger.phone}
                        </div>
                        <div className="text-xs text-gray-400">
                          {passenger.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            passenger.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {passenger.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {passenger.totalTrips}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(passenger)}
                            className="rounded-lg border border-white/40 bg-blue-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                            title="View"
                          >
                            <PiEyeDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(passenger)}
                            className="rounded-lg border border-white/40 bg-yellow-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/35"
                            title="Edit"
                          >
                            <PiPencilDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(passenger)}
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

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-white/20 bg-white/10 px-6 py-4">
              <div className="text-sm text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, sortedPassengers.length)}{" "}
                of {sortedPassengers.length} passengers
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

      {/* Modals */}
      {showModal && (
        <PassengerModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          passenger={selectedPassenger}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={passengerToDelete?.name}
          itemType="passenger"
        />
      )}
    </div>
  );
};

export default PassengersManagement;
