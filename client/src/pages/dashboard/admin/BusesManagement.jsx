import { useEffect, useState } from "react";
import {
  PiArrowLeftDuotone,
  PiCheckCircleDuotone,
  PiClockDuotone,
  PiDownloadDuotone,
  PiEyeDuotone,
  PiFunnelDuotone,
  PiMagnifyingGlassDuotone,
  PiPencilDuotone,
  PiPlusBold,
  PiSortAscendingDuotone,
  PiTrashDuotone,
  PiWarningCircleDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router";
import BUPCover from "../../../assets/images/bup-cover.jpg";
import Logo from "../../../assets/logo/bup-bus-tracker-logo.png";
import BusModal from "../../../components/dashboard/admin/BusModal";
import DeleteConfirmModal from "../../../components/dashboard/admin/DeleteConfirmModal";
import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const BusesManagement = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("busNumber");
  const [filterBy, setFilterBy] = useState("all");
  const [fuelTypeFilter, setFuelTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBus, setSelectedBus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [busToDelete, setBusToDelete] = useState(null);
  const [modalMode, setModalMode] = useState("view");  
  const itemsPerPage = 10;

  useEffect(() => {
    const mockBuses = [
      {
        id: 1,
        busNumber: "BUP-001",
        model: "Ashok Leyland 2518",
        capacity: 50,
        manufacturer: "Ashok Leyland",
        yearOfManufacture: 2020,
        registrationNumber: "DHAKA-GA-11-2020",
        driverAssigned: "মোহাম্মদ রহিম",
        routeAssigned: "Mirpur - BUP Campus",
        status: "active",
        lastMaintenance: "2024-01-15",
        nextMaintenance: "2024-04-15",
        fuelType: "diesel",
        mileage: 8.5,
        photo:
          "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&h=300&fit=crop&crop=center",
        totalTrips: 245,
        totalDistance: 12500,
      },
      {
        id: 2,
        busNumber: "BUP-002",
        model: "Tata LP 909",
        capacity: 35,
        manufacturer: "Tata Motors",
        yearOfManufacture: 2019,
        registrationNumber: "DHAKA-GA-11-2019",
        driverAssigned: "আব্দুল করিম",
        routeAssigned: "Uttara - BUP Campus",
        status: "maintenance",
        lastMaintenance: "2024-01-10",
        nextMaintenance: "2024-02-10",
        fuelType: "diesel",
        mileage: 7.2,
        photo:
          "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop&crop=center",
        totalTrips: 189,
        totalDistance: 9800,
      },
      {
        id: 3,
        busNumber: "BUP-003",
        model: "Eicher Skyline Pro",
        capacity: 40,
        manufacturer: "Eicher Motors",
        yearOfManufacture: 2021,
        registrationNumber: "DHAKA-GA-11-2021",
        driverAssigned: "মো. সালাম",
        routeAssigned: "Dhanmondi - BUP Campus",
        status: "active",
        lastMaintenance: "2024-01-20",
        nextMaintenance: "2024-04-20",
        fuelType: "cng",
        mileage: 12.3,
        photo:
          "https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=400&h=300&fit=crop&crop=center",
        totalTrips: 134,
        totalDistance: 7200,
      },
      {
        id: 4,
        busNumber: "BUP-004",
        model: "Ashok Leyland Viking",
        capacity: 45,
        manufacturer: "Ashok Leyland",
        yearOfManufacture: 2018,
        registrationNumber: "DHAKA-GA-11-2018",
        driverAssigned: "রফিকুল ইসলাম",
        routeAssigned: "Gulshan - BUP Campus",
        status: "inactive",
        lastMaintenance: "2023-12-05",
        nextMaintenance: "2024-03-05",
        fuelType: "diesel",
        mileage: 6.8,
        photo:
          "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=300&fit=crop&crop=center",
        totalTrips: 298,
        totalDistance: 18900,
      },
    ];
    setBuses(mockBuses);
  }, []);

  const filteredBuses = buses.filter((bus) => {
    const matchesSearch =
      bus.busNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.registrationNumber
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      bus.driverAssigned.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bus.routeAssigned.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter = filterBy === "all" || bus.status === filterBy;
    const matchesFuelFilter =
      fuelTypeFilter === "all" || bus.fuelType === fuelTypeFilter;

    return matchesSearch && matchesStatusFilter && matchesFuelFilter;
  });

  const sortedBuses = [...filteredBuses].sort((a, b) => {
    switch (sortBy) {
      case "busNumber":
        return a.busNumber.localeCompare(b.busNumber);
      case "model":
        return a.model.localeCompare(b.model);
      case "capacity":
        return b.capacity - a.capacity;
      case "yearOfManufacture":
        return b.yearOfManufacture - a.yearOfManufacture;
      case "mileage":
        return b.mileage - a.mileage;
      case "trips":
        return b.totalTrips - a.totalTrips;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedBuses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBuses = sortedBuses.slice(startIndex, startIndex + itemsPerPage);

  const handleBack = () => {
    navigate("/admin");
  };

  const handleView = (bus) => {
    navigate(`/admin/buses/view/${bus.id}`);
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedBus(null);
    setModalMode("add");
    setShowModal(true);
  };

  const handleDelete = (bus) => {
    setBusToDelete(bus);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBuses(buses.filter((b) => b.id !== busToDelete.id));
    setShowDeleteModal(false);
    setBusToDelete(null);
  };

  const handleSave = (busData) => {
    if (modalMode === "add") {
      const newBus = {
        ...busData,
        id: buses.length + 1,
        totalTrips: 0,
        totalDistance: 0,
        lastMaintenance: new Date().toISOString().split("T")[0],
      };
      setBuses([...buses, newBus]);
    } else if (modalMode === "edit") {
      setBuses(buses.map((b) => (b.id === busData.id ? busData : b)));
    }
    setShowModal(false);
  };

  const handleExport = () => {
     
    console.log("Exporting buses data...");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400";
      case "inactive":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PiCheckCircleDuotone className="h-4 w-4" />;
      case "maintenance":
        return <PiWarningCircleDuotone className="h-4 w-4" />;
      case "inactive":
        return <PiClockDuotone className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const isMaintenanceDue = (nextMaintenance) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
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
      <header className={`relative z-10 ${GLASS_PRESETS.HEADER_CONTAINER}`}>
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
                    Buses Management
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
                    placeholder="Search buses..."
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
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <PiFunnelDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>

                  <div className="relative">
                    <select
                      value={fuelTypeFilter}
                      onChange={(e) => setFuelTypeFilter(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="all">All Fuel Types</option>
                      <option value="diesel">Diesel</option>
                      <option value="cng">CNG</option>
                      <option value="petrol">Petrol</option>
                    </select>
                    <PiFunnelDuotone className="absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-300" />
                  </div>

                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-lg border border-white/40 bg-white/25 px-4 py-2 pr-8 text-white backdrop-blur-md focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none"
                    >
                      <option value="busNumber">Sort by Bus Number</option>
                      <option value="model">Sort by Model</option>
                      <option value="capacity">Sort by Capacity</option>
                      <option value="yearOfManufacture">Sort by Year</option>
                      <option value="mileage">Sort by Mileage</option>
                      <option value="trips">Sort by Total Trips</option>
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
                  Add Bus
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
                      Bus Info
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Assignment
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Performance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Maintenance
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentBuses.map((bus) => (
                    <tr
                      key={bus.id}
                      className="transition-colors hover:bg-white/5"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={bus.photo}
                          alt={bus.busNumber}
                          className="h-12 w-16 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-white">
                            {bus.busNumber}
                          </div>
                          <div className="text-xs text-gray-400">
                            {bus.model}
                          </div>
                          <div className="text-xs text-gray-400">
                            {bus.manufacturer} ({bus.yearOfManufacture})
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div>Capacity: {bus.capacity} seats</div>
                          <div>Fuel: {bus.fuelType.toUpperCase()}</div>
                          <div>Mileage: {bus.mileage} km/l</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div className="font-medium">
                            {bus.driverAssigned}
                          </div>
                          <div className="text-xs">{bus.routeAssigned}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(bus.status)}`}
                        >
                          {getStatusIcon(bus.status)}
                          {bus.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div>Trips: {bus.totalTrips}</div>
                          <div>Distance: {bus.totalDistance} km</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-300">
                          <div>
                            Last:{" "}
                            {new Date(bus.lastMaintenance).toLocaleDateString()}
                          </div>
                          <div
                            className={`text-xs ${isMaintenanceDue(bus.nextMaintenance) ? "text-red-400" : "text-gray-400"}`}
                          >
                            Next:{" "}
                            {new Date(bus.nextMaintenance).toLocaleDateString()}
                            {isMaintenanceDue(bus.nextMaintenance) && (
                              <span className="ml-1">⚠️</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleView(bus)}
                            className="rounded-lg border border-white/40 bg-blue-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-blue-500/35"
                            title="View"
                          >
                            <PiEyeDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(bus)}
                            className="rounded-lg border border-white/40 bg-yellow-500/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-yellow-500/35"
                            title="Edit"
                          >
                            <PiPencilDuotone className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(bus)}
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
                {Math.min(startIndex + itemsPerPage, sortedBuses.length)} of{" "}
                {sortedBuses.length} buses
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
        <BusModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          bus={selectedBus}
          mode={modalMode}
          onSave={handleSave}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          itemName={busToDelete?.busNumber}
          itemType="bus"
        />
      )}
    </div>
  );
};

export default BusesManagement;
