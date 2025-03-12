import { useState, useEffect } from "react";
import { Edit, Trash2, CheckCircle, RefreshCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const ManageListings = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [bunnies, setBunnies] = useState([]); // Store fetched bunnies
    const [search, setSearch] = useState("");
    const [breedFilter, setBreedFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();

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
                setBunnies(allBunnies);

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
        <div className="p-2 sm:p-6 bg-gray-100 min-h-screen">
            {/* Header & Search */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl text-[#754E1A] font-semibold">Manage Listings</h1>
                <Link to="/admin/add-bunny" className="bg-[#754E1A] hidden sm:block text-white px-4 py-2 rounded hover:opacity-80">
                    Add New Bunny
                </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredBunnies.length > 0 ? (
                        filteredBunnies.map((bunny) => (                            
                            <div key={bunny.id} className="bg-white p-4 shadow rounded-lg">
                                {/* Bunny Image */}
                                <div className="relative">
                                    {/* Bunny Image */}
                                    <img
                                        src={bunny.images[0]}
                                        alt={bunny.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />

                                    {/* Sold Label */}
                                    {bunny.status.toLowerCase() === "sold" && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                                            SOLD
                                        </span>
                                    )}
                                </div>

                                {/* Bunny Info */}
                                <h2 className="text-lg font-semibold mt-3">{bunny.name}</h2>
                                <p className="text-gray-500">{bunny.breed}</p>
                                <p className="text-xl font-bold mt-1">${bunny.price}</p>

                                {/* Buttons */}
                                {/* Buttons */}
                                <div className="mt-4 flex justify-center gap-2">
                                    <button
                                        className="border border-[#4A3B2D] text-[#4A3B2D] px-3 py-1 rounded flex items-center"
                                        onClick={() => navigate(`/admin/edit-bunny/${bunny.id}`, { state: { bunny } })}
                                    >
                                        <Edit size={16} className="mr-1" /> Edit
                                    </button>


                                    <button
                                        className="bg-white border border-[#4A3B2D] text-[#4A3B2D]  px-3 py-1 rounded flex items-center"
                                        onClick={() => handleDelete(bunny.id, bunny.breed)}
                                    >
                                        <Trash2 strokeWidth={2.5} size={16} st className="mr-1" /> Delete
                                    </button>

                                    <button
                                        className={`px-3 py-1 rounded flex items-center ${bunny.status.toLowerCase() === "available"
                                            ? "bg-[#754E1A] text-white"
                                            : "bg-gray-500 text-white"
                                            }`}
                                        onClick={() => toggleStatus(bunny.id, bunny.breed)}
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
            )}


        </div>
    );
};

export default ManageListings;
