import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CgSpinner } from "react-icons/cg";
import { Edit, Trash2, Save, SquareX } from "lucide-react";

const SortableGalleryItem = ({ entry, savingId, deletingId, toggleEdit, handleDeleteEntry, handleImageUpload, handleChange, handleSaveEntry }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: entry.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white py-7 sm:py-8 sm:px-8 rounded-lg shadow mb-6 flex flex-col md:flex-row items-center gap-4 relative"
        >
            {/* Drag Handle */}
            <div {...attributes} {...listeners} className="absolute left-2 top-2 cursor-grab">
                <span className="text-gray-500">☰</span> {/* Example Drag Handle */}
            </div>

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
                    <button
                        className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                        onClick={(e) => {
                            // e.stopPropagation();
                            toggleEdit(entry.id);
                        }}
                    >
                        <SquareX size={16} className="mr-1" />
                        Cancel
                    </button>
                ) : (
                    <div className="flex justify-center gap-2">
                        <button
                            className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleEdit(entry.id);
                            }}
                        >
                            <Edit size={16} className="mr-1" /> Edit
                        </button>
                        <button
                            className="border border-[#4A3B2D] text-[#4A3B2D] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEntry(entry.id);
                            }}
                        >
                            <Trash2 strokeWidth={2.5} size={16} className="mr-1" />
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
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(entry.id, e)}
                        disabled={!entry.isEditing}
                    />
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
                        <button
                            className="border bg-[#4A3B2D] text-[#ffffff] rounded-sm px-3 py-1 flex items-center cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSaveEntry(entry.id);
                            }}
                        >
                            <Save size={16} className="mr-1" />
                            Save
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default SortableGalleryItem;
