import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg"; // Import spinner icon
import { Edit, Trash2, Save, SquareX } from "lucide-react";

const API_URL = "https://backend.sillybillysilkies.workers.dev/pets"; // Replace with your backend URL

const GalleryManagement = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        breed: "",
        description: "",
        pedigreed: false,
        purebred: false,
        image: "",
    });
    // Add loading state variables
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [savingId, setSavingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // ✅ Fetch existing entries from backend
    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                if (data.pets && typeof data.pets === "object") {
                    const petsArray = Object.values(data.pets); // Convert object to array
                    setEntries(petsArray);
                    console.log(petsArray);

                } else {
                    console.error("Invalid API response:", data);
                    setEntries([]); // Fallback to empty array
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setEntries([]); // Ensure entries is always an array
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // ✅ Toggle edit mode
    const toggleEdit = (id) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
        ));
    };

    // ✅ Handle changes in input fields
    const handleChange = (id, field, value) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        ));
    };

    // ✅ Handle image upload for existing entries
    const handleImageUpload = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEntries(entries.map(entry =>
                entry.id === id ? { ...entry, image: imageUrl, imageFile: file } : entry
            ));
        }
    };

    // ✅ Handle new entry field changes
    const handleNewEntryChange = (field, value) => {
        setNewEntry({ ...newEntry, [field]: value });
    };

    // ✅ Handle image upload for new entry
    const handleNewImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewEntry({ ...newEntry, image: imageUrl, imageFile: file });
        }
    };

    // ✅ Add a new entry
    const handleAddEntry = async () => {
        if (!newEntry.breed.trim()) {
            alert("Breed name is required!");
            return;
        }

        console.log("New Entry:", newEntry);
        setIsAdding(true);

        // Create a FormData object
        const formData = new FormData();

        // Append details as JSON string
        const details = JSON.stringify({
            breed: newEntry.breed,
            pedigreed: newEntry.pedigreed,
            purebred: newEntry.purebred,
            description: newEntry.description,
        });

        formData.append("details", details);

        // Append file (if available)
        if (newEntry.imageFile) {
            formData.append("file", newEntry.imageFile);
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // ✅ Fetch the updated list immediately after adding
            const updatedResponse = await fetch(API_URL);
            const updatedData = await updatedResponse.json();

            if (updatedData.pets && typeof updatedData.pets === "object") {
                const updatedPetsArray = Object.values(updatedData.pets); // Convert object to array
                setEntries(updatedPetsArray);
            }

            // Reset the form
            setNewEntry({
                breed: "",
                description: "",
                pedigreed: false,
                purebred: false,
                image: "",
                imageFile: null, // Reset file input
            });

        } catch (error) {
            console.error("Error adding entry:", error);
        } finally {
            setIsAdding(false);
        }
    };



    // ✅ Save updates to an existing entry
    const handleSaveEntry = async (id) => {
        const entry = entries.find(e => e.id === id);
        if (!entry) {
            console.error("Entry not found!");
            return;
        }

        setSavingId(id);
        const formData = new FormData();

        // ✅ Send ID as a separate key
        formData.append("id", id);

        // ✅ Send details as a JSON string, including `pedigreed` and `purebred`
        const details = JSON.stringify({
            breed: entry.breed,
            description: entry.description,
            pedigreed: entry.pedigreed,
            purebred: entry.purebred,
        });
        formData.append("details", details);

        // ✅ Append file (if updated)
        if (entry.imageFile) {
            formData.append("file", entry.imageFile);
        }

        try {
            const response = await fetch(API_URL, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // ✅ Fetch the updated list immediately after updating
            const updatedResponse = await fetch(API_URL);
            const updatedData = await updatedResponse.json();

            if (updatedData.pets && typeof updatedData.pets === "object") {
                const updatedPetsArray = Object.values(updatedData.pets);
                setEntries(updatedPetsArray);
            }

        } catch (error) {
            console.error("Error updating entry:", error);
        } finally {
            setSavingId(null);
        }
    };


    // ✅ Delete an entry
    const handleDeleteEntry = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(API_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id }) // Send ID in the request body
            });

            if (!response.ok) {
                throw new Error(`Failed to delete entry: ${response.statusText}`);
            }

            // Remove the deleted entry from the state
            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            console.error("Error deleting entry:", error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-2xl text-[#754E1A] font-semibold mb-4">Gallery Management</h1>
            <p className="text-[#4A3B2D] mb-6">Total entries: {entries.length}</p>
            {/* Add New Entry Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 border-2 border-dashed border-[#4A3B2D] relative">
                {/* Show spinner overlay when adding a new entry */}
                {isAdding && (
                    <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg z-10">
                        <CgSpinner className="animate-spin text-green-500 text-4xl" />
                        <span className="ml-2 font-medium">Adding new entry...</span>
                    </div>
                )}

                {/* Image Upload */}
                <label className="w-64 h-64 md:w-64 md:h-64 border-dashed border-2 border-[#4A3B2D] rounded-lg flex items-center justify-center overflow-hidden cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleNewImageUpload}
                    />
                    {newEntry.image ? (
                        <img src={newEntry.image} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400 text-xs md:text-sm">Click to upload</span>
                    )}
                </label>


                {/* Form Inputs */}
                <div className="flex-1 w-full md:w-auto">
                    {/* Breed Input */}
                    <div className="mb-4">
                        <label className="block text-[#4A3B2D] font-medium">Breed</label>
                        <input
                            type="text"
                            value={newEntry.breed}
                            onChange={(e) => handleNewEntryChange("breed", e.target.value)}
                            className="w-full border placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter breed name"
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-4">
                        <label className="block text-[#4A3B2D] font-medium">Description</label>
                        <textarea
                            value={newEntry.description}
                            onChange={(e) => handleNewEntryChange("description", e.target.value)}
                            className="w-full border  placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                            rows="3"
                            placeholder="Enter a description..."
                        />
                    </div>
                    <div className="flex space-x-4">
                        {/* Pedigreed Parent Checkbox */}
                        <div className="mb-4">
                            <label className="flex items-center text-[#4A3B2D] font-medium">
                                <input
                                    type="checkbox"
                                    checked={newEntry.pedigreed}
                                    onChange={(e) => handleNewEntryChange("pedigreed", e.target.checked)}
                                    className="mr-2 accent-blue-500"
                                />
                                Pedigreed Parent
                            </label>
                        </div>

                        {/* Purebred Checkbox */}
                        <div className="mb-4">
                            <label className="flex items-center text-[#4A3B2D] font-medium">
                                <input
                                    type="checkbox"
                                    checked={newEntry.purebred}
                                    onChange={(e) => handleNewEntryChange("purebred", e.target.checked)}
                                    className="mr-2 accent-blue-500"
                                />
                                Purebred
                            </label>
                        </div>
                    </div>
                    {/* Add Entry Button */}
                    <button
                        className="bg-[#754E1A] text-white px-4 py-2 rounded-md hover:bg-green-600 transition w-full md:w-auto flex items-center justify-center"
                        onClick={handleAddEntry}
                        disabled={isAdding}
                    >
                        {isAdding ? (
                            <>
                                <CgSpinner className="animate-spin mr-2" />
                                Adding...
                            </>
                        ) : (
                            "Add Entry"
                        )}
                    </button>
                </div>
            </div>
            {/* Show loading spinner for initial data load */}
            {isLoading ? (
                <div className="flex justify-center items-center p-12">
                    <CgSpinner className="animate-spin text-blue-500 text-4xl" />
                    <span className="ml-2 text-gray-600">Loading entries...</span>
                </div>
            ) : (
                <>
                    {/* List Existing Entries */}
                    {entries.map((entry) => (
                        <div key={entry.id} className="bg-white py-7 sm:py-8 sm:px-8 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 relative">
                            {/* Show spinner overlay when saving or deleting */}
                            {(savingId === entry.id || deletingId === entry.id) && (
                                <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-lg z-10">
                                    <CgSpinner className="animate-spin text-blue-500 text-4xl" />
                                    <span className="ml-2 font-medium">
                                        {savingId === entry.id ? "Saving..." : "Deleting..."}
                                    </span>
                                </div>
                            )}

                            {/* Icons for Edit, Save, Delete */}
                            <div className="sm:absolute top-3 right-2 sm:top-3 sm:right-8 flex gap-3">
                                {entry.isEditing ? (
                                    <>
                                        <div>
                                            <button size={20} className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer" onClick={() => toggleEdit(entry.id)} >
                                                <SquareX size={16} className="mr-1" />
                                                Cancel
                                            </button>
                                        </div>

                                    </>
                                ) : (
                                    <div className="flex justify-center gap-2">
                                        <button size={20} className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                                            onClick={() => toggleEdit(entry.id)} >
                                            <Edit size={16} className="mr-1" /> Edit
                                        </button>
                                        <button size={20} className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                                            onClick={() => handleDeleteEntry(entry.id)} >

                                            <Trash2 strokeWidth={2.5} size={16} st className="mr-1" />
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Image Upload */}
                            <div className="w-72 h-72 sm:w-64 sm:h-64 border-2 border-[#4A3B2D] rounded-lg flex items-center justify-center overflow-hidden">
                                {entry.image_url ? (
                                    <img src={entry.image_url} alt="Uploaded" className="w-full h-full object-cover" />
                                ) : (
                                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(entry.id, e)} disabled={!entry.isEditing} />
                                )}
                            </div>

                            {/* Form Inputs */}
                            <div className="flex-1">
                                <div className="flex-1 w-full md:w-auto">
                                    <div className="mb-4">
                                        <label className="block text-[#4A3B2D]">Breed</label>
                                        <input
                                            type="text"
                                            value={entry.breed}
                                            onChange={(e) => handleChange(entry.id, "breed", e.target.value)}
                                            className="w-full text-[#4A3B2D] border border-[#4A3B2D] p-2 rounded"
                                            disabled={!entry.isEditing}
                                        />
                                    </div>
                                    <div className="flex space-x-4">
                                        <div className="mb-4">
                                            <label className="flex items-center text-[#4A3B2D]">
                                                <input
                                                    type="checkbox"
                                                    checked={entry.pedigreed}
                                                    onChange={(e) => handleChange(entry.id, "pedigreed", e.target.checked)}
                                                    className="mr-2"
                                                    disabled={!entry.isEditing}
                                                />
                                                Pedigreed Parent
                                            </label>
                                        </div>
                                        <div className="mb-4">
                                            <label className="flex items-center text-[#4A3B2D]">
                                                <input
                                                    type="checkbox"
                                                    checked={entry.purebred}
                                                    onChange={(e) => handleChange(entry.id, "purebred", e.target.checked)}
                                                    className="mr-2"
                                                    disabled={!entry.isEditing}
                                                />
                                                Purebred
                                            </label>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="block text-[#4A3B2D]">Description</label>
                                        <textarea
                                            value={entry.description}
                                            onChange={(e) => handleChange(entry.id, "description", e.target.value)}
                                            className="w-full text-[#4A3B2D] border border-[#4A3B2D] p-2 rounded"
                                            rows="3"
                                            disabled={!entry.isEditing}
                                        ></textarea>
                                    </div>
                                </div>
                                {entry.isEditing &&
                                    <div className="flex justify-end">
                                        <button size={20} className="border bg-[#4A3B2D] text-[#ffffff] rounded-sm px-3 py-1 flex items-center cursor-pointer" onClick={() => handleSaveEntry(entry.id)} >
                                            <Save size={16} className="mr-1" />
                                            Save
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    ))}


                </>
            )}
        </div>
    );
};

export default GalleryManagement;