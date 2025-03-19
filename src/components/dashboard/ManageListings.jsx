import { useState, useEffect } from "react";
import { Edit, Trash2, CheckCircle, RefreshCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { DndContext, closestCenter, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import SortableBunnyCard from "./SortableBunnyCard"; // New component for draggable items
const ManageListings = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [segregatedOrders, setSegregatedOrders] = useState({});
    const [bunnies, setBunnies] = useState([]); // Store fetched bunnies
    const [initialOrder, setInitialOrder] = useState([]); // Store only the initial order of IDs
    const [orderChanged, setOrderChanged] = useState(false); // Track order changes
    const [search, setSearch] = useState("");
    const [breedFilter, setBreedFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 5 }, // Prevents accidental drags on touch
        })
    );

    // Fetch bunnies from both endpoints
    useEffect(() => {
        const fetchBunnies = async () => {
            setLoading(true);
            try {
                const [hollandLopRes, netherlandDwarfRes] = await Promise.all([
                    fetch("https://backend.sillybillysilkies.workers.dev/fetch", {
                        method: "POST",
                        body: JSON.stringify({ pageType: "breeds/holland_lop" }),
                        headers: { "Content-Type": "application/json" },
                    }),
                    fetch("https://backend.sillybillysilkies.workers.dev/fetch", {
                        method: "POST",
                        body: JSON.stringify({ pageType: "breeds/netherland_dwarf" }),
                        headers: { "Content-Type": "application/json" },
                    }),
                ]);

                const [hollandLopData, netherlandDwarfData] = await Promise.all([
                    hollandLopRes.json(),
                    netherlandDwarfRes.json(),
                ]);

                // Combine both lists

                const allBunnies = [...hollandLopData.bunnies, ...netherlandDwarfData.bunnies];
                const sortedBunnies = allBunnies.sort((a, b) => a.order - b.order);
                setBunnies(sortedBunnies);
                setInitialOrder(sortedBunnies.map(bunny => bunny.id)); // Store initial IDs

            } catch (error) {
                console.error("Error fetching bunnies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBunnies();
    }, []);

    // Apply filtering
    console.log(bunnies);

    const filteredBunnies = bunnies
        .filter((bunny) => bunny.name.toLowerCase().includes(search.toLowerCase()))
        .filter((bunny) => (breedFilter ? bunny.breed === breedFilter : true))
        .filter((bunny) => (statusFilter ? bunny.status.toLowerCase() === statusFilter.toLowerCase() : true));

    const handleDelete = async (id, breed) => {
        // Determine the pageType based on breed
        setLoading(true);
        let pageType = "";
        if (breed === "Holland Lop") {
            pageType = "breeds/holland_lop";
        } else if (breed === "Netherland Dwarf") {
            pageType = "breeds/netherland_dwarf";
        }

        try {
            const response = await fetch("https://backend.sillybillysilkies.workers.dev/delete", {
                method: "DELETE", // API expects a POST request
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    pageType,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to delete bunny");
            }

            // Remove the bunny from state after successful deletion
            setBunnies((prevBunnies) => prevBunnies.filter((bunny) => bunny.id !== id));

            console.log(`Bunny with ID: ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting bunny:", error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = async (id, breed) => {
        try {
            let pageType = "";

            // Determine pageType explicitly using if-else
            if (breed === "Holland Lop") {
                pageType = "breeds/holland_lop";
            } else if (breed === "Netherland Dwarf") {
                pageType = "breeds/netherland_dwarf";
            } else {
                console.error("Unknown breed:", breed);
                return;
            }

            // Find the current bunny
            const currentBunny = bunnies.find((bunny) => bunny.id === id);
            if (!currentBunny) {
                console.error("Bunny not found:", id);
                return;
            }

            // Determine the new status based on the current status
            const newStatus = currentBunny.status.toLowerCase() === "available" ? "sold" : "available";

            // Optimistically update the UI
            setBunnies((prevBunnies) =>
                prevBunnies.map((bunny) =>
                    bunny.id === id ? { ...bunny, status: newStatus } : bunny
                )
            );

            // Send update request to backend
            const response = await fetch("https://backend.sillybillysilkies.workers.dev/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, pageType, status: newStatus }), // Send correct newStatus
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to update status");
            }

            console.log(`Status updated: Bunny ${id} is now ${newStatus}`);
        } catch (error) {
            console.error("Error updating bunny status:", error);

            // Revert UI change if request fails
            setBunnies((prevBunnies) =>
                prevBunnies.map((bunny) =>
                    bunny.id === id ? { ...bunny, status: currentBunny.status } : bunny
                )
            );
        }
    };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        setBunnies((prevBunnies) => {
            const oldIndex = prevBunnies.findIndex((bunny) => bunny.id === active.id);
            const newIndex = prevBunnies.findIndex((bunny) => bunny.id === over.id);
            const newBunnies = arrayMove(prevBunnies, oldIndex, newIndex);

            const currentOrder = newBunnies.map(bunny => bunny.id);
            setOrderChanged(JSON.stringify(currentOrder) !== JSON.stringify(initialOrder));
            // Update the segregated order state
            const updatedOrders = newBunnies.reduce((acc, bunny, index) => {
                const breedKey = bunny.breed.toLowerCase().replace(/\s+/g, "_"); // Convert breed to URL format
                const pageType = `breeds/${breedKey}`;

                if (!acc[pageType]) {
                    acc[pageType] = [];
                }
                acc[pageType].push({ id: bunny.id, order: index + 1 });

                return acc;
            }, {});

            setSegregatedOrders(updatedOrders);
            console.log(updatedOrders);

            return newBunnies;
        });
    };

    // Send API request when button is clicked
    const updateBunnyOrder = async () => {
        setLoading(true);
        try {
            if (!Object.keys(segregatedOrders).length) {
                console.warn("No changes to update.");
                return;
            }

            console.log("Sending Order Update:", segregatedOrders);

            await Promise.all(
                Object.entries(segregatedOrders).map(async ([pageType, orderedIds]) => {
                    const response = await fetch("https://backend.sillybillysilkies.workers.dev/updateBulkOrder", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ pageType, orderedIds }),
                    });

                    if (!response.ok) {
                        throw new Error(`Failed to update order for ${pageType}`);
                    }

                    console.log(`Order updated successfully for ${pageType}`);
                })
            );
            setInitialOrder(bunnies.map(bunny => bunny.id)); // 🔹 Update initial order after saving
            setOrderChanged(false);
            // Clear segregated orders after successful update
            setSegregatedOrders({});
        } catch (error) {
            console.error("Error updating bunny order:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-2 sm:p-6 bg-gray-100 min-h-screen">
            {/* Header & Search */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-[#754E1A] font-semibold">Manage Listings</h1>
                <div className="mt-3 md:mt-0">
                    <button
                        className={`px-4 py-2 rounded-md text-white flex items-center gap-2 text-sm md:text-base
        ${orderChanged ? "bg-[#754E1A] hover:bg-[#5f482a]" : "bg-gray-400 cursor-not-allowed"}`}
                        onClick={updateBunnyOrder}
                        disabled={!orderChanged || loading} // Disable if no changes or loading
                    >
                        {loading ? (
                            <>
                                <RefreshCcw className="animate-spin mr-2" />
                                Loading...
                            </>
                        ) : (
                            "Change Order"
                        )}
                    </button>

                </div>
            </div>

            {/* Filters */}
            <div className="flex text-[#4A3B2D] flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search bunnies..."
                    className="flex-1 placeholder:text-[#4A3B2D] p-2 border border-[#4A3B2D] rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="relative">
                    <select
                        className="p-3 border border-[#4A3B2D] rounded-lg pointer-events-auto text-[#4A3B2D] pr-10 appearance-none"
                        onChange={(e) => setBreedFilter(e.target.value)}
                    >
                        <option value="">All Breeds</option>
                        <option value="Holland Lop">Holland Lop</option>
                        <option value="Netherland Dwarf">Netherland Dwarf</option>
                    </select>
                    {/* Dropdown Icon */}
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#4A3B2D]">
                        <FaChevronDown />
                    </span>
                </div>
                <div className="relative">
                    <select
                        className="p-3 border border-[#4A3B2D] rounded-lg pointer-events-auto text-[#4A3B2D] pr-10 appearance-none"
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            console.log(e.target.value);
                        }}
                    >
                        <option value="">All Status</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#4A3B2D]">
                        <FaChevronDown />
                    </span>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></span>
                    <p className="ml-3 text-gray-700">Loading responses...</p>
                </div>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={bunnies.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {filteredBunnies.length > 0 ? (
                                filteredBunnies.map((bunny) => (
                                    <SortableBunnyCard
                                        key={bunny.id}
                                        bunny={bunny}
                                        handleDelete={handleDelete}
                                        toggleStatus={toggleStatus}
                                    />
                                ))
                            ) : (
                                <p className="text-center col-span-3 text-gray-500">No bunnies found.</p>
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
            )}


        </div>
    );
};

export default ManageListings;
