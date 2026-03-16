import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiBusDuotone,
  PiClockDuotone,
  PiDownloadDuotone,
  PiEyeDuotone,
  PiFunnelDuotone,
  PiMagnifyingGlassDuotone,
  PiMapPinDuotone,
  PiPencilDuotone,
  PiPlusBold,
  PiSortAscendingDuotone,
  PiTrashDuotone,
  PiUsersDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import DeleteConfirmModal from "../../../components/dashboard/admin/DeleteConfirmModal";
import RouteModal from "../../../components/dashboard/admin/RouteModal";

const RoutesManagement = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("routeName");
  const [filterBy, setFilterBy] = useState("all");
  const [operatingDayFilter, setOperatingDayFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [routeToDelete, setRouteToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("view");  
  const itemsPerPage = 10;

  useEffect(() => {
    const mockRoutes = [
      {
        id: 1,
        routeName: "ঢাকা - মিরপুর",
        routeNameEn: "Dhaka - Mirpur",
        startLocation: "Bangladesh University of Professionals",
        endLocation: "Mirpur-12",
        distance: "8.5 km",
        duration: "25 minutes",
        schedule: ["07:30", "08:00", "16:30", "17:00", "17:30"],
        fare: 30,
        status: "active",
        busesAssigned: 3,
        totalPassengers: 45,
        description:
          "Main route connecting university to Mirpur residential area",
        waypoints: [
          "BUP Main Gate",
          "Kalabagan",
          "Dhanmondi 27",
          "Science Lab",
          "Newmarket",
          "Elephant Road",
          "Farmgate",
          "Bijoy Sarani",
          "Shewrapara",
          "Kazipara",
          "Mirpur-10",
          "Mirpur-12",
        ],
        operatingDays: [
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
        ],
        createdDate: "2023-01-15",
      },
      {
        id: 2,
        routeName: "ঢাকা - উত্তরা",
        routeNameEn: "Dhaka - Uttara",
        startLocation: "Bangladesh University of Professionals",
        endLocation: "Uttara Sector-10",
        distance: "12.3 km",
        duration: "35 minutes",
        schedule: ["07:45", "08:15", "16:45", "17:15"],
        fare: 40,
        status: "active",
        busesAssigned: 2,
        totalPassengers: 32,
        description: "Route serving students from Uttara area",
        waypoints: [
          "BUP Main Gate",
          "Farmgate",
          "Tejgaon",
          "Mohakhali",
          "Banani",
          "Gulshan-2",
          "Airport Road",
          "Uttara Sector-7",
          "Uttara Sector-10",
        ],
        operatingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        createdDate: "2023-02-20",
      },
      {
        id: 3,
        routeName: "ঢাকা - গুলশান",
        routeNameEn: "Dhaka - Gulshan",
        startLocation: "Bangladesh University of Professionals",
        endLocation: "Gulshan-1",
        distance: "6.2 km",
        duration: "20 minutes",
        schedule: ["08:00", "08:30", "16:30", "17:00"],
        fare: 25,
        status: "inactive",
        busesAssigned: 1,
        totalPassengers: 18,
        description: "Limited route for Gulshan area residents",
        waypoints: [
          "BUP Main Gate",
          "Kalabagan",
          "Green Road",
          "Panthapath",
          "Kawran Bazar",
          "Tejgaon",
          "Mohakhali",
          "Gulshan-1",
        ],
        operatingDays: ["monday", "wednesday", "friday"],
        createdDate: "2023-03-10",
      },
    ];
    setRoutes(mockRoutes);
  }, []);

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.routeNameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.endLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterBy === "all" || route.status === filterBy;

    const matchesOperatingDay =
      operatingDayFilter === "all" ||
      route.operatingDays.includes(operatingDayFilter);

    return matchesSearch && matchesStatus && matchesOperatingDay;
  });

  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    switch (sortBy) {
      case "routeName":
        return a.routeName.localeCompare(b.routeName);
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      case "fare":
        return a.fare - b.fare;
      case "passengers":
        return b.totalPassengers - a.totalPassengers;
      case "buses":
        return b.busesAssigned - a.busesAssigned;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedRoutes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRoutes = sortedRoutes.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleBack = () => {
    navigate("/admin");
  };

  const handleView = (route) => {
    navigate(`/admin/routes/view/${route.id}`);
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedRoute(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleDelete = (route) => {
    setRouteToDelete(route);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setRoutes(routes.filter((r) => r.id !== routeToDelete.id));
    setShowDeleteModal(false);
    setRouteToDelete(null);
  };

  const handleSave = (routeData) => {
    if (modalMode === "add") {
      const newRoute = {
        ...routeData,
        id: routes.length + 1,
        createdDate: new Date().toISOString().split("T")[0],
        totalPassengers: 0,
        busesAssigned: 0,
      };
      setRoutes([...routes, newRoute]);
    } else if (modalMode === "edit") {
      setRoutes(routes.map((r) => (r.id === routeData.id ? routeData : r)));
    }
    setShowModal(false);
  };

  const handleExport = () => {
     
    console.log("Exporting routes data...");
  };

  const getDayName = (day) => {
    const days = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    };
    return days[day] || day;
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
                    Routes Management
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
                    placeholder="Search routes..."
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
                      value={operatingDayFilter}
                      onChange={(e) => setOperatingDayFilter(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="all">All Days</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                    <PiFunnelDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="routeName">Sort by Name</option>
                      <option value="distance">Sort by Distance</option>
                      <option value="fare">Sort by Fare</option>
                      <option value="passengers">Sort by Passengers</option>
                      <option value="buses">Sort by Buses</option>
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
                  Add Route
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
                      Route
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Distance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Schedule
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Buses
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Passengers
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Operating Days
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentRoutes.map((route) => (
                    <tr
                      key={route.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                              <PiMapPinDuotone className="h-5 w-5 text-blue-400" />
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">
                              {route.routeName}
                            </div>
                            <div className="text-xs text-gray-400">
                              {route.routeNameEn}
                            </div>
                            <div className="text-xs text-gray-500">
                              {route.startLocation} → {route.endLocation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {route.distance}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <PiClockDuotone className="h-4 w-4" />
                          {route.duration}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {route.schedule.slice(0, 3).map((time, index) => (
                            <span
                              key={index}
                              className="inline-flex rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400"
                            >
                              {time}
                            </span>
                          ))}
                          {route.schedule.length > 3 && (
                            <span className="inline-flex rounded-full bg-gray-500/20 px-2 py-1 text-xs text-gray-400">
                              +{route.schedule.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <PiBusDuotone className="h-4 w-4" />
                          {route.busesAssigned}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-300">
                          <PiUsersDuotone className="h-4 w-4" />
                          {route.totalPassengers}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            route.status === "active"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {route.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {route.operatingDays.slice(0, 3).map((day, index) => (
                            <span
                              key={index}
                              className="inline-flex rounded bg-purple-500/20 px-1.5 py-0.5 text-xs text-purple-400"
                            >
                              {getDayName(day)}
                            </span>
                          ))}
                          {route.operatingDays.length > 3 && (
                            <span className="inline-flex rounded bg-gray-500/20 px-1.5 py-0.5 text-xs text-gray-400">
                              +{route.operatingDays.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(route)}
                            className="rounded-lg border border-white/40 bg-blue-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                            title="View"
                          >
                            <PiEyeDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(route)}
                            className="rounded-lg border border-white/40 bg-yellow-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/35"
                            title="Edit"
                          >
                            <PiPencilDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(route)}
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
                {Math.min(startIndex + itemsPerPage, sortedRoutes.length)} of{" "}
                {sortedRoutes.length} routes
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
        <RouteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          route={selectedRoute}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={routeToDelete?.routeName}
          itemType="route"
        />
      )}
    </div>
  );
};

export default RoutesManagement;
