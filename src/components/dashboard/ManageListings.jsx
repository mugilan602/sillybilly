import { useState } from "react";
import { Edit, Trash2, CheckCircle, RefreshCcw } from "lucide-react";

const listings = [
    {
        id: 1,
        name: "Fluffy Cloud",
        breed: "Holland Lop",
        price: 150,
        status: "available",
        image: "https://source.unsplash.com/300x200/?rabbit", // Sample Image
    },
    {
        id: 2,
        name: "Tiny Dancer",
        breed: "Netherland Dwarf",
        price: 175,
        status: "sold",
        image: "https://source.unsplash.com/300x200/?bunny",
    },
    {
        id: 3,
        name: "Maple Sugar",
        breed: "Holland Lop",
        price: 200,
        status: "sold",
        image: "https://source.unsplash.com/300x200/?cute-rabbit",
    },
];

const ManageListings = () => {
    const [search, setSearch] = useState("");
    const [breedFilter, setBreedFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

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
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                </select>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {listings
                    .filter((bunny) =>
                        bunny.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .filter((bunny) => (breedFilter ? bunny.breed === breedFilter : true))
                    .filter((bunny) => (statusFilter ? bunny.status === statusFilter : true))
                    .map((bunny) => (
                        <div key={bunny.id} className="bg-white p-4 shadow rounded-lg">
                            {/* Bunny Image */}
                            <img
                                src={bunny.image}
                                alt={bunny.name}
                                className="w-full h-64 object-cover rounded-lg"
                            />

                            {/* Bunny Info */}
                            <h2 className="text-lg font-semibold mt-3">{bunny.name}</h2>
                            <p className="text-gray-500">{bunny.breed}</p>
                            <p className="text-xl font-bold mt-1">${bunny.price}</p>

                            {/* Buttons */}
                            <div className="mt-4 flex justify-center gap-2">
                                <button className="border px-3 py-1 rounded flex items-center">
                                    <Edit size={16} className="mr-1" /> Edit
                                </button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded flex items-center">
                                    <Trash2 size={16} className="mr-1" /> Delete
                                </button>
                                {bunny.status === "available" ? (
                                    <button className="bg-green-500 text-white px-3 py-1 rounded flex items-center">
                                        <CheckCircle size={16} className="mr-1" /> Mark as Sold
                                    </button>
                                ) : (
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                                        <RefreshCcw size={16} className="mr-1" /> Mark as Unsold
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-end mt-6">
                <button className="border px-3 py-1 rounded mr-2">{"<"}</button>
                <button className="border px-3 py-1 rounded">{">"}</button>
            </div>
        </div>
    );
};

export default ManageListings;
