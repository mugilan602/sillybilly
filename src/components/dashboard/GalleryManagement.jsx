    import { useEffect, useState } from "react";
    import { CgSpinner } from "react-icons/cg"; // Spinner icon
    import { Edit, Trash2, Save, SquareX } from "lucide-react";
    import { DndContext, closestCenter } from "@dnd-kit/core";
    import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
    import SortableGalleryItem from "./SortableGalleryItem";

    const API_URL = "https://backend.sillybillysilkies.workers.dev/pets"; // Replace with your backend URL

    const GalleryManagement = () => {
        const [entries, setEntries] = useState([]);
        const [updatedEntries, setUpdatedEntries] = useState([]); // Stores new order
        const [initialOrder, setInitialOrder] = useState([]); // Store only the initial order of IDs
        const [orderChanged, setOrderChanged] = useState(false); // Track order changes
        const [newEntry, setNewEntry] = useState({
            breed: "",
            description: "",
            pedigreed: false,
            purebred: false,
            image: "",
        });

        // Loading states
        const [isLoading, setIsLoading] = useState(true);
        const [isAdding, setIsAdding] = useState(false);
        const [savingId, setSavingId] = useState(null);
        const [deletingId, setDeletingId] = useState(null);

        // ✅ Fetch entries from backend
        useEffect(() => {
            setIsLoading(true);
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    if (data.pets && typeof data.pets === "object") {
                        const entriesArray = Object.values(data.pets);
                        const sortedEntries = entriesArray.sort((a, b) => a.order - b.order); 
                        setEntries(sortedEntries);
                        setInitialOrder(sortedEntries.map(entry => entry.id));
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
        console.log(entries);
        // ✅ Toggle edit mode
        const toggleEdit = (id) => {
            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
                )
            );
        };

        // ✅ Handle input changes
        const handleChange = (id, field, value) => {
            setEntries(prevEntries =>
                prevEntries.map(entry =>
                    entry.id === id ? { ...entry, [field]: value } : entry
                )
            );
        };

        // ✅ Handle image upload for existing entries
        const handleImageUpload = (id, event) => {
            const file = event.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                setEntries(prevEntries =>
                    prevEntries.map(entry =>
                        entry.id === id ? { ...entry, image: imageUrl, imageFile: file } : entry
                    )
                );
            }
        };

        // ✅ Handle new entry changes
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

        // ✅ Add new entry
        const handleAddEntry = async () => {
            if (!newEntry.breed.trim()) {
                alert("Breed name is required!");
                return;
            }

            console.log("New Entry:", newEntry);
            setIsAdding(true);

            const formData = new FormData();
            const details = JSON.stringify({
                breed: newEntry.breed,
                description: newEntry.description,
                pedigreed: newEntry.pedigreed,
                purebred: newEntry.purebred,
            });

            formData.append("details", details);
            if (newEntry.imageFile) {
                formData.append("file", newEntry.imageFile);
            }

            try {
                const response = await fetch(API_URL, { method: "POST", body: formData });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const updatedResponse = await fetch(API_URL);
                const updatedData = await updatedResponse.json();
                setEntries(Object.values(updatedData.pets || {}));

                setNewEntry({ breed: "", description: "", pedigreed: false, purebred: false, image: "", imageFile: null });
            } catch (error) {
                console.error("Error adding entry:", error);
            } finally {
                setIsAdding(false);
            }
        };

        // ✅ Save entry updates
        const handleSaveEntry = async (id) => {
            setSavingId(id);
            const entry = entries.find(e => e.id === id);
            if (!entry) {
                console.error("Entry not found!");
                return;
            }

            const formData = new FormData();
            formData.append("id", id);
            formData.append("details", JSON.stringify({
                breed: entry.breed,
                description: entry.description,
                pedigreed: entry.pedigreed,
                purebred: entry.purebred,
            }));

            if (entry.imageFile) {
                formData.append("file", entry.imageFile);
            }

            try {
                const response = await fetch(API_URL, { method: "PUT", body: formData });
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const updatedResponse = await fetch(API_URL);
                const updatedData = await updatedResponse.json();
                setEntries(Object.values(updatedData.pets || {}));
            } catch (error) {
                console.error("Error updating entry:", error);
            } finally {
                setSavingId(null);
            }
        };

        // ✅ Delete an entry
        const handleDeleteEntry = async (id) => {
            // setIsLoading(true);
            setDeletingId(id);
            try {
                const response = await fetch(API_URL, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                if (!response.ok) throw new Error(`Failed to delete entry: ${response.statusText}`);

                setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
            } catch (error) {
                console.error("Error deleting entry:", error);
            } finally {
                setDeletingId(null);
                // setIsLoading(false);
            }
        };

        // ✅ Handle drag-and-drop sorting
        const handleDragEnd = (event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            setEntries(prevEntries => {
                const oldIndex = prevEntries.findIndex(item => item.id === active.id);
                const newIndex = prevEntries.findIndex(item => item.id === over.id);
                const newOrder = arrayMove(prevEntries, oldIndex, newIndex);
                setUpdatedEntries(newOrder);
                const currentOrder = newOrder.map(entry => entry.id);
                setOrderChanged(JSON.stringify(currentOrder) !== JSON.stringify(initialOrder));
                return newOrder;
            });
        };
        // ✅ Function to update order in database
        const updateOrderInDatabase = async () => {
            setIsLoading(true);
            if (entries.length === 0) {
                console.log("No changes made to order.");
                return;
            }

            // 🔹 Map entries to required format (ID → Order)
            const formattedOrder = entries.map((entry, index) => ({
                id: entry.id,
                order: index + 1, // Order starts from 1
            }));

            console.log("Final Order to be sent:", JSON.stringify(formattedOrder, null, 4));

            try {
                const response = await fetch("https://backend.sillybillysilkies.workers.dev/updateGalleryOrder", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedOrder),
                });

                if (!response.ok) throw new Error(`Failed to update order: ${response.statusText}`);

                console.log("✅ Order successfully updated in the database.");
                setInitialOrder(entries.map(entry => entry.id)); // 🔹 Update initial order after saving
                setOrderChanged(false);
            } catch (error) {
                console.error("❌ Error updating order:", error);
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <div className="p-4 bg-gray-100 min-h-screen">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold mb-4">Gallery Management</h1>
                        <p className="mb-6">Total entries: {entries.length}</p>
                    </div>
                    <div>
                        <button
                            className={`px-4 py-2 rounded-md text-white flex items-center gap-2 text-sm md:text-base
        ${orderChanged ? "bg-[#754E1A] hover:bg-[#5f482a]" : "bg-gray-400 cursor-not-allowed"}`}
                            onClick={updateOrderInDatabase}
                            disabled={!orderChanged || isLoading} // Disable if no changes or loading
                        >
                            {isLoading ? (
                                <>
                                    <CgSpinner className="animate-spin mr-2" />
                                    Loading...
                                </>
                            ) : (
                                "Change Order"
                            )}
                        </button>

                    </div>
                </div>
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
                            className="bg-[#754E1A] text-white px-4 py-2 rounded-md hover:bg-[#5f482a] transition w-full md:w-auto flex items-center justify-center"
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


                {/* Entry List with Drag-and-Drop */}
                {isLoading ? (
                    <div className="flex justify-center items-center p-12">
                        <CgSpinner className="animate-spin text-blue-500 text-4xl" />
                        <span className="ml-2 text-gray-600">Loading entries...</span>
                    </div>
                ) : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={entries} strategy={verticalListSortingStrategy}>
                            {entries.map(entry => (
                                <SortableGalleryItem
                                    key={entry.id}
                                    entry={entry}
                                    isLoading={isLoading}  // Pass isLoading
                                    savingId={savingId}    // Pass savingId to indicate which entry is being saved
                                    deletingId={deletingId} // Pass deletingId to indicate which entry is being deleted
                                    toggleEdit={toggleEdit}
                                    handleDeleteEntry={handleDeleteEntry}
                                    handleImageUpload={handleImageUpload}
                                    handleChange={handleChange}
                                    handleSaveEntry={handleSaveEntry}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        );
    };

    export default GalleryManagement;
