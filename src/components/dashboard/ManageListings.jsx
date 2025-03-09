import { useState, useEffect } from "react";
import { Edit, Trash2, CheckCircle, RefreshCcw } from "lucide-react";

const ManageListings = () => {
    const [bunnies, setBunnies] = useState([]); // Store fetched bunnies
    const [search, setSearch] = useState("");
    const [breedFilter, setBreedFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Fetch bunnies from both endpoints
    useEffect(() => {
        const fetchBunnies = async () => {
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
                setBunnies(allBunnies);

            } catch (error) {
                console.error("Error fetching bunnies:", error);
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


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Header & Search */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Manage Listings</h1>
                <button className="bg-black text-white px-4 py-2 rounded hover:opacity-80">
                    Add New Bunny
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input
                    type="text"
                    placeholder="🔍 Search bunnies..."
                    className="flex-1 p-2 border rounded-lg"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="p-2 border rounded-lg"
                    onChange={(e) => setBreedFilter(e.target.value)}
                >
                    <option value="">All Breeds</option>
                    <option value="Holland Lop">Holland Lop</option>
                    <option value="Netherland Dwarf">Netherland Dwarf</option>
                </select>
                <select
                    className="p-2 border rounded-lg"

                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        console.log(e.target.value);
                    }}

                >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredBunnies.length > 0 ? (
                    filteredBunnies.map((bunny) => (
                        <div key={bunny.id} className="bg-white p-4 shadow rounded-lg">
                            {/* Bunny Image */}
                            <img
                                src={bunny.images[0]}
                                alt={bunny.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />

                            {/* Bunny Info */}
                            <h2 className="text-lg font-semibold mt-3">{bunny.name}</h2>
                            <p className="text-gray-500">{bunny.breed}</p>
                            <p className="text-xl font-bold mt-1">${bunny.price}</p>

                            {/* Buttons */}
                            {/* Buttons */}
                            <div className="mt-4 flex justify-center gap-2">
                                <button className="border px-3 py-1 rounded flex items-center">
                                    <Edit size={16} className="mr-1" /> Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                                    onClick={() => handleDelete(bunny.id, bunny.breed)}
                                >
                                    <Trash2 size={16} className="mr-1" /> Delete
                                </button>

                                <button
                                    className={`px-3 py-1 rounded flex items-center ${bunny.status.toLowerCase() === "available"
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-500 text-white"
                                        }`}
                                    onClick={() => toggleStatus(bunny.id,bunny.breed)}
                                >
                                    {bunny.status.toLowerCase() === "available" ? (
                                        <>
                                            <CheckCircle size={16} className="mr-1" /> Mark as Sold
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCcw size={16} className="mr-1" /> Mark as Unsold
                                        </>
                                    )}
                                </button>
                            </div>

                        </div>
                    ))
                ) : (
                    <p className="text-center col-span-3 text-gray-500">No bunnies found.</p>
                )}
            </div>
        </div>
    );
};

export default ManageListings;
