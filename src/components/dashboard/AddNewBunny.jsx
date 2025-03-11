import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddNewBunny = () => {
    const { id } = useParams(); // Get bunny ID from URL (if editing)
    const location = useLocation(); // Get state from navigation
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [bunny, setBunny] = useState({
        breed: "",
        name: "",
        gender: "",
        dob: "",
        takeHomeDate: "",
        price: "",
        status: "",
        pedigreedParents: "",
        color: "",
        images: [],
    });

    useEffect(() => {
        if (id && location.state?.bunny) {
            // Use the data passed from Manage Listings
            setBunny(location.state.bunny);
        }
    }, [id, location.state]);

    const handleChange = (e) => {
        setBunny({ ...bunny, [e.target.name]: e.target.value });
    };

    const handleBreedSelection = (selectedBreed) => {
        setBunny({ ...bunny, breed: selectedBreed });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setBunny({ ...bunny, images: [...bunny.images, ...files] });
    };

    const removeImage = (index) => {
        const updatedImages = bunny.images.filter((_, i) => i !== index);
        setBunny({ ...bunny, images: updatedImages });
    };

    const handleSubmit = async () => {
        if (!bunny.breed || !bunny.name || !bunny.gender || !bunny.dob || !bunny.takeHomeDate || !bunny.price) {
            alert("Please fill all required fields!");
            return;
        }
        setLoading(true); // Start loading spinner

        try {
            if (id) {
                // 🟢 **Update Existing Bunny** (Send Full Data as JSON)
                const updatedData = {
                    id: id,
                    pageType: `breeds/${bunny.breed.toLowerCase().replace(/\s+/g, "_")}`,
                    breed: bunny.breed,
                    name: bunny.name,
                    gender: bunny.gender,
                    dob: bunny.dob,
                    takeHomeDate: bunny.takeHomeDate,
                    price: bunny.price,
                    status: bunny.status,
                    pedigreedParents: bunny.pedigreedParents,
                    color: bunny.color,
                    images: bunny.images, // Keeping existing image URLs
                };

                const response = await fetch("https://backend.sillybillysilkies.workers.dev/update", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                alert("Bunny updated successfully!");
            } else {
                // 🟢 **Create New Bunny** (Send as FormData)
                const details = JSON.stringify({
                    breed: bunny.breed,
                    name: bunny.name,
                    gender: bunny.gender,
                    dob: bunny.dob,
                    takeHomeDate: bunny.takeHomeDate,
                    price: bunny.price,
                    status: bunny.status,
                    pedigreedParents: bunny.pedigreedParents,
                    color: bunny.color,
                    images: bunny.images
                });
                console.log(details);

                const formData = new FormData();
                formData.append("details", details);
                formData.append("pageType", `breeds/${bunny.breed.toLowerCase().replace(/\s+/g, "_")}`);
                console.log(bunny.images);

                bunny.images.forEach((img) => {
                    if (img instanceof File) {
                        formData.append("file", img); // ✅ Only append File objects
                    }
                });


                const response = await fetch("https://backend.sillybillysilkies.workers.dev/upload", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                alert("Bunny added successfully!");
            }

            navigate("/admin/manage-listing");
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to save bunny. Please try again.");
        }finally{
            setLoading(false);
        }
    };

    const handleDeleteImage = async (imageUrl, index) => {
        setLoading(true);
        try {
            // Prepare the required data
            const bunnyId = id; // Assuming `id` is coming from `useParams()`
            const pageType = `breeds/${bunny.breed.toLowerCase().replace(/\s+/g, "_")}`;
            const imageUrls = [imageUrl]; // Backend expects an array of image URLs

            // Send DELETE request to backend
            const response = await fetch("https://backend.sillybillysilkies.workers.dev/deleteImage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bunnyId, pageType, imageUrls }),
            });

            if (!response.ok) throw new Error("Failed to delete image");

            // Remove the image from state if deleted successfully
            setBunny((prev) => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
            }));
        } catch (error) {
            console.error("Error deleting image:", error);
            alert("Failed to delete image. Please try again.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };


    const handleAddImages = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;
        setLoading(true);
        const formData = new FormData();
        formData.append("pageType", `breeds/${bunny.breed.toLowerCase().replace(/\s+/g, "_")}`);
        files.forEach((file) => formData.append("files", file));

        try {
            const response = await fetch("https://backend.sillybillysilkies.workers.dev/addImages", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Image upload failed");

            const { uploadedUrls } = await response.json();

            // Add new URLs to state
            setBunny((prev) => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls],
            }));
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images.");
        } finally {
            setLoading(false); // Hide spinner
        }
    };

    return (
        <div className="p-2 sm:p-6 bg-gray-100 min-h-screen">
            {loading && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></span>
                </div>
            )}



            <h1 className="text-center text-[#754E1A] sm:text-left text-2xl font-semibold mb-6">
                {id ? "Edit Bunny" : "Add New Bunny"}
            </h1>

            <div className="bg-white text-[#4A3B2D] p-6 rounded-lg shadow">
                <h2 className="text-lg text-[#754E1A] font-semibold mb-4">Select Breed</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                        className={`border border-[#4A3B2D] rounded-lg p-6 flex items-center justify-center h-24 cursor-pointer ${bunny.breed === "Holland Lop" ? "bg-blue-200 border-blue-500" : "bg-white"}`}
                        onClick={() => handleBreedSelection("Holland Lop")}
                    >
                        <p className="text-[#4A3B2D] font-medium">Holland Lop</p>
                    </div>
                    <div
                        className={`border rounded-lg p-6 flex items-center justify-center h-24 cursor-pointer ${bunny.breed === "Netherland Dwarf" ? "bg-blue-200 border-blue-500" : "bg-white"}`}
                        onClick={() => handleBreedSelection("Netherland Dwarf")}
                    >
                        <p className="text-[#4A3B2D] font-medium">Netherland Dwarf</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#4A3B2D]">Bunny Name/ID</label>
                        <input
                            type="text"
                            name="name"
                            value={bunny.name}
                            placeholder="Enter name or ID"
                            className="w-full border placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Gender</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={bunny.gender === "Male"}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={bunny.gender === "Female"}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            value={bunny.dob}
                            className="w-full border border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Take Home Date</label>
                        <input
                            type="text"
                            name="takeHomeDate"
                            value={bunny.takeHomeDate}
                            placeholder="Enter take-home date"
                            className="w-full border placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Price (USD)</label>
                        <input
                            type="number"
                            name="price"
                            value={bunny.price}
                            placeholder="$"
                            className="w-full border border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Status</label>
                        <select
                            name="status"
                            value={bunny.status}
                            className="w-full border border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        >
                            <option value="">Select Status</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#4A3B2D]">Pedigreed Parents</label>
                        <input
                            type="text"
                            name="pedigreedParents"
                            value={bunny.pedigreedParents}
                            placeholder="Enter pedigreed parents info"
                            className="w-full border placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-[#4A3B2D]">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={bunny.color}
                            placeholder="Enter bunny color"
                            className="w-full border placeholder:text-[#4A3B2D] border-[#4A3B2D] p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>
                </div>


                {/* <div className="mt-4">
                    <label className="block text-[#4A3B2D]">Bunny Description</label>
                    <textarea
                        name="description"
                        value={bunny.description}
                        placeholder="Enter bunny description..."
                        className="w-full border p-2 rounded"
                        rows="3"
                        onChange={handleChange}
                    ></textarea>
                </div> */}

                <div className="mt-6 border-dashed border-2 border-[#4A3B2D] rounded-lg p-6 text-center bg-gray-50">
                    <p className="text-[#4A3B2D]">Upload Bunny Images</p>
                    <p className="text-xs text-[#4A3B2D] mb-2">PNG, JPG, GIF up to 10MB</p>

                    <label className="cursor-pointer bg-[#754E1A] text-white px-4 py-2 rounded-md hover:bg-[#5f482a]">
                        Select Images
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleAddImages} />
                    </label>

                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-2">
                        {bunny.images.length === 0 ? (
                            <p className="col-span-4 text-[#4A3B2D] italic">No images uploaded</p>
                        ) : (
                            bunny.images.map((img, index) => {
                                const imageUrl = img instanceof File ? URL.createObjectURL(img) : img;

                                return (
                                    <div key={index} className="relative w-64 h-64 sm:w-64 sm:h-64 rounded-lg overflow-hidden border">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => handleDeleteImage(img, index)}
                                            className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl"
                                        >
                                            ✖
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>


                <div className="mt-6 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-[#754E1A] text-white px-4 py-2 rounded hover:bg-[#5f482a] flex items-center"
                        disabled={loading}
                    >
                        Save Bunny
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewBunny;
