import { useState } from "react";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa"; // Import icons

const GalleryManagement = () => {
    const [entries, setEntries] = useState([
        {
            id: 1,
            breed: "Netherland Dwarf",
            description: "Beautiful gray Netherland Dwarf with excellent temperament. Born and raised in our rabbitry.",
            pedigreed: true,
            image: "",
            isEditing: false,
        },
        {
            id: 2,
            breed: "Holland Lops",
            description: "",
            pedigreed: false,
            image: "",
            isEditing: false,
        }
    ]);

    const [newEntry, setNewEntry] = useState({
        breed: "",
        description: "",
        pedigreed: false,
        image: "",
    });

    const toggleEdit = (id) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
        ));
    };

    const handleChange = (id, field, value) => {
        setEntries(entries.map(entry =>
            entry.id === id ? { ...entry, [field]: value } : entry
        ));
    };

    const handleImageUpload = (id, event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEntries(entries.map(entry =>
                entry.id === id ? { ...entry, image: imageUrl } : entry
            ));
        }
    };

    const handleNewEntryChange = (field, value) => {
        setNewEntry({ ...newEntry, [field]: value });
    };

    const handleNewImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewEntry({ ...newEntry, image: imageUrl });
        }
    };

    const handleAddEntry = () => {
        if (!newEntry.breed.trim()) {
            alert("Breed name is required!");
            return;
        }

        setEntries([...entries, { id: Date.now(), ...newEntry, isEditing: false }]);
        setNewEntry({ breed: "", description: "", pedigreed: false, image: "" });
    };

    const handleDeleteEntry = (id) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-center md:text-left">Gallery Management</h1>
            <p className="text-gray-500 mb-6 text-center md:text-left">Total entries: {entries.length}</p>

            {/* List Existing Entries */}
            {entries.map((entry) => (
                <div key={entry.id} className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 relative">

                    {/* Icons for Edit, Save, Delete */}
                    <div className="absolute top-4 right-4 flex gap-3">
                        {entry.isEditing ? (
                            <FaSave
                                className="text-green-500 cursor-pointer text-lg md:text-xl hover:text-green-700"
                                onClick={() => toggleEdit(entry.id)}
                            />
                        ) : (
                            <FaEdit
                                className="text-blue-500 cursor-pointer text-lg md:text-xl hover:text-blue-700"
                                onClick={() => toggleEdit(entry.id)}
                            />
                        )}
                        <FaTrash
                            className="text-red-500 cursor-pointer text-lg md:text-xl hover:text-red-700"
                            onClick={() => handleDeleteEntry(entry.id)}
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="w-32 h-32 md:w-48 md:h-48 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                        {entry.image ? (
                            <img src={entry.image} alt="Uploaded" className="w-full h-full object-cover" />
                        ) : (
                            <label className="cursor-pointer flex flex-col justify-center items-center text-gray-400 text-xs md:text-sm">
                                <span>Click to upload</span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(entry.id, e)} />
                            </label>
                        )}
                    </div>

                    {/* Form Inputs */}
                    <div className="flex-1 w-full md:w-auto">
                        <div className="mb-4">
                            <label className="block text-gray-700">Breed</label>
                            <input
                                type="text"
                                value={entry.breed}
                                onChange={(e) => handleChange(entry.id, "breed", e.target.value)}
                                className="w-full border p-2 rounded"
                                disabled={!entry.isEditing}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center text-gray-700">
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
                            <label className="block text-gray-700">Description</label>
                            <textarea
                                value={entry.description}
                                onChange={(e) => handleChange(entry.id, "description", e.target.value)}
                                className="w-full border p-2 rounded"
                                rows="3"
                                disabled={!entry.isEditing}
                            ></textarea>
                        </div>
                    </div>
                </div>
            ))}

            {/* Add New Entry Section */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 md:gap-6 border-2 border-dashed">

                {/* Image Upload */}
                <div className="w-32 h-32 md:w-48 md:h-48 border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {newEntry.image ? (
                        <img src={newEntry.image} alt="Uploaded" className="w-full h-full object-cover" />
                    ) : (
                        <label className="cursor-pointer flex flex-col items-center text-gray-400 text-xs md:text-sm">
                            <span>Click to upload</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleNewImageUpload} />
                        </label>
                    )}
                </div>

                {/* Form Inputs */}
                <div className="flex-1 w-full md:w-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700">Breed</label>
                        <input
                            type="text"
                            value={newEntry.breed}
                            onChange={(e) => handleNewEntryChange("breed", e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="flex items-center text-gray-700">
                            <input
                                type="checkbox"
                                checked={newEntry.pedigreed}
                                onChange={(e) => handleNewEntryChange("pedigreed", e.target.checked)}
                                className="mr-2"
                            />
                            Pedigreed Parent
                        </label>
                    </div>

                    {/* Add Entry Button */}
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto" onClick={handleAddEntry}>
                        Add Entry
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryManagement;
