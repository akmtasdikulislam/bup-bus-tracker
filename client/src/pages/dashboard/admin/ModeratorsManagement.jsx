import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiDownloadDuotone,
  PiEyeDuotone,
  PiFunnelDuotone,
  PiIdentificationCardDuotone,
  PiMagnifyingGlassDuotone,
  PiPencilDuotone,
  PiPlusBold,
  PiShieldDuotone,
  PiSortAscendingDuotone,
  PiTrashDuotone,
  PiUserCheckDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import DeleteConfirmModal from "../../../components/dashboard/admin/DeleteConfirmModal";
import ModeratorModal from "../../../components/dashboard/admin/ModeratorModal";

const ModeratorsManagement = () => {
  const navigate = useNavigate();
  const [moderators, setModerators] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedModerator, setSelectedModerator] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [moderatorToDelete, setModeratorToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("view"); // view, edit, add
  const itemsPerPage = 10;

  // Mock data for moderators
  useEffect(() => {
    const mockModerators = [
      {
        id: 1,
        name: "মোঃ আহমেদ রহমান",
        nameEn: "Md. Ahmed Rahman",
        email: "ahmed.rahman@bup.edu.bd",
        phone: "+880 1712-345678",
        employeeId: "MOD-001",
        department: "Information Technology",
        address: "Mirpur-10, Dhaka-1216",
        permissions: ["manage_passengers", "manage_drivers", "view_reports"],
        status: "active",
        joinDate: "2023-01-15",
        lastLogin: "2024-01-20T10:30:00Z",
        photo:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 2,
        name: "ফাতিমা খাতুন",
        nameEn: "Fatima Khatun",
        email: "fatima.khatun@bup.edu.bd",
        phone: "+880 1712-345679",
        employeeId: "MOD-002",
        department: "Transport Management",
        address: "Uttara, Dhaka-1230",
        permissions: ["manage_buses", "manage_routes", "system_settings"],
        status: "active",
        joinDate: "2023-02-20",
        lastLogin: "2024-01-19T15:45:00Z",
        photo:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 3,
        name: "নাসির উদ্দিন",
        nameEn: "Nasir Uddin",
        email: "nasir.uddin@bup.edu.bd",
        phone: "+880 1712-345680",
        employeeId: "MOD-003",
        department: "Student Affairs",
        address: "Dhanmondi, Dhaka-1205",
        permissions: ["manage_passengers", "view_reports"],
        status: "active",
        joinDate: "2023-03-10",
        lastLogin: "2024-01-18T09:20:00Z",
        photo:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 4,
        name: "সালমা আক্তার",
        nameEn: "Salma Akter",
        email: "salma.akter@bup.edu.bd",
        phone: "+880 1712-345681",
        employeeId: "MOD-004",
        department: "Administration",
        address: "Gulshan-2, Dhaka-1212",
        permissions: ["manage_drivers", "manage_buses", "view_reports"],
        status: "inactive",
        joinDate: "2023-04-05",
        lastLogin: "2024-01-10T14:30:00Z",
        photo:
          "https://images.unsplash.com/photo-1494790108755-2616b9e0b9d5?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 5,
        name: "রহিম উল্লাহ",
        nameEn: "Rahim Ullah",
        email: "rahim.ullah@bup.edu.bd",
        phone: "+880 1712-345682",
        employeeId: "MOD-005",
        department: "Security",
        address: "Banani, Dhaka-1213",
        permissions: ["system_settings", "view_reports"],
        status: "active",
        joinDate: "2023-05-12",
        lastLogin: "2024-01-21T11:15:00Z",
        photo:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 6,
        name: "আমিনা বেগম",
        nameEn: "Amina Begum",
        email: "amina.begum@bup.edu.bd",
        phone: "+880 1712-345683",
        employeeId: "MOD-006",
        department: "Finance",
        address: "Mohammadpur, Dhaka-1207",
        permissions: [
          "manage_passengers",
          "manage_drivers",
          "manage_buses",
          "manage_routes",
          "view_reports",
        ],
        status: "active",
        joinDate: "2023-06-18",
        lastLogin: "2024-01-22T08:45:00Z",
        photo:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face",
      },
    ];
    setModerators(mockModerators);
  }, []);

  const departments = [
    "Information Technology",
    "Transport Management",
    "Student Affairs",
    "Administration",
    "Finance",
    "Security",
    "Maintenance",
  ];

  const permissionLabels = {
    manage_passengers: "Manage Passengers",
    manage_drivers: "Manage Drivers",
    manage_buses: "Manage Buses",
    manage_routes: "Manage Routes",
    view_reports: "View Reports",
    system_settings: "System Settings",
  };

  // Filter and search logic
  const filteredModerators = moderators.filter((moderator) => {
    const matchesSearch =
      moderator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.phone.includes(searchQuery) ||
      moderator.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter =
      filterBy === "all" || moderator.status === filterBy;
    const matchesDepartmentFilter =
      departmentFilter === "all" || moderator.department === departmentFilter;

    return matchesSearch && matchesStatusFilter && matchesDepartmentFilter;
  });

  // Sort logic
  const sortedModerators = [...filteredModerators].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "employeeId":
        return a.employeeId.localeCompare(b.employeeId);
      case "department":
        return a.department.localeCompare(b.department);
      case "joinDate":
        return new Date(b.joinDate) - new Date(a.joinDate);
      case "lastLogin":
        return new Date(b.lastLogin) - new Date(a.lastLogin);
      case "permissions":
        return b.permissions.length - a.permissions.length;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedModerators.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentModerators = sortedModerators.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleBack = () => {
    navigate("/admin");
  };

  const handleView = (moderator) => {
    setSelectedModerator(moderator);
    setModalMode("view");
    setShowModal(true);
  };

  const handleEdit = (moderator) => {
    setSelectedModerator(moderator);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedModerator(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleDelete = (moderator) => {
    setModeratorToDelete(moderator);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setModerators(moderators.filter((m) => m.id !== moderatorToDelete.id));
    setShowDeleteModal(false);
    setModeratorToDelete(null);
  };

  const handleSave = (moderatorData) => {
    if (modalMode === "add") {
      const newModerator = {
        ...moderatorData,
        id: moderators.length + 1,
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toISOString(),
      };
      setModerators([...moderators, newModerator]);
    } else if (modalMode === "edit") {
      setModerators(
        moderators.map((m) => (m.id === moderatorData.id ? moderatorData : m)),
      );
    }
    setShowModal(false);
  };

  const handleExport = () => {
    // Export logic would go here
    console.log("Exporting moderators data...");
  };

  const formatLastLogin = (lastLogin) => {
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
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
                    Moderators Management
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
                    placeholder="Search moderators..."
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
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="all">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
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
                      <option value="employeeId">Sort by Employee ID</option>
                      <option value="department">Sort by Department</option>
                      <option value="joinDate">Sort by Join Date</option>
                      <option value="lastLogin">Sort by Last Login</option>
                      <option value="permissions">Sort by Permissions</option>
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
                  Add Moderator
                </button>
              </div>
            </div>
          </div>

          {/* Moderators Table */}
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
                      Employee ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Last Login
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentModerators.map((moderator) => (
                    <tr
                      key={moderator.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={moderator.photo}
                          alt={moderator.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {moderator.name}
                          </div>
                          <div className="text-xs text-gray-400">
                            {moderator.nameEn}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                          <PiIdentificationCardDuotone className="h-4 w-4 text-blue-400" />
                          {moderator.employeeId}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {moderator.department}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          {moderator.phone}
                        </div>
                        <div className="text-xs text-gray-400">
                          {moderator.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {moderator.permissions
                            .slice(0, 2)
                            .map((permission) => (
                              <span
                                key={permission}
                                className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-1 text-xs text-purple-400"
                              >
                                <PiShieldDuotone className="h-3 w-3" />
                                {permissionLabels[permission]}
                              </span>
                            ))}
                          {moderator.permissions.length > 2 && (
                            <span className="inline-flex rounded-full bg-gray-500/20 px-2 py-1 text-xs text-gray-400">
                              +{moderator.permissions.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            moderator.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          <PiUserCheckDuotone className="h-3 w-3" />
                          {moderator.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatLastLogin(moderator.lastLogin)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(moderator)}
                            className="rounded-lg border border-white/40 bg-blue-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                            title="View"
                          >
                            <PiEyeDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(moderator)}
                            className="rounded-lg border border-white/40 bg-yellow-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/35"
                            title="Edit"
                          >
                            <PiPencilDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(moderator)}
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
                {Math.min(startIndex + itemsPerPage, sortedModerators.length)}{" "}
                of {sortedModerators.length} moderators
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
        <ModeratorModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          moderator={selectedModerator}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={moderatorToDelete?.name}
          itemType="moderator"
        />
      )}
    </div>
  );
};

export default ModeratorsManagement;
