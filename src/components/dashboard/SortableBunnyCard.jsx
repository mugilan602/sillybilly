import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle, Edit, RefreshCcw, Trash2, GripVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SortableBunnyCard = ({ bunny, handleDelete, toggleStatus }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: bunny.id });
    const navigate = useNavigate();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white p-4 shadow rounded-lg relative">
            {/* 🔹 Draggable Handle (Hamburger Icon) */}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 cursor-grab p-2 rounded hover:bg-gray-200"
            >
                <GripVertical size={20} />
            </div>

            {/* Bunny Image */}
            <div className="relative mt-6">
                <img src={bunny.images[0]} alt={bunny.name} className="w-full h-64 object-cover rounded-lg" />
                {bunny.status.toLowerCase() === "sold" && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">SOLD</span>
                )}
            </div>

            {/* Bunny Info */}
            <h2 className="text-lg font-semibold mt-3">{bunny.name}</h2>
            <p className="text-gray-500">{bunny.breed}</p>
            <p className="text-xl font-bold mt-1">${bunny.price}</p>

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-2">
                <button
                    className="border border-[#4A3B2D] text-[#4A3B2D] px-3 py-1 rounded flex items-center"
                    onClick={() => navigate(`/admin/edit-bunny/${bunny.id}`, { state: { bunny } })}
                >
                    <Edit size={16} className="mr-1" /> Edit
                </button>

                <button
                    className="bg-white border border-[#4A3B2D] text-[#4A3B2D] px-3 py-1 rounded flex items-center"
                    onClick={() => handleDelete(bunny.id,bunny.breed)}
                >
                    <Trash2 size={16} className="mr-1" /> Delete
                </button>

                <button
                    className={`px-3 py-1 rounded flex items-center ${bunny.status.toLowerCase() === "available" ? "bg-[#754E1A] text-white" : "bg-gray-500 text-white"
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
    );
};

export default SortableBunnyCard;
