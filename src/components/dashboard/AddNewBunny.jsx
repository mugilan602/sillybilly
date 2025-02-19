import { useState } from "react";

const AddNewBunny = () => {
    const [bunny, setBunny] = useState({
        breed: "",
        name: "",
        gender: "",
        dob: "",
        takeHomeDate: "",
        price: "",
        status: "Available",
        description: "",
        images: [],
    });

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

    const handleSubmit = () => {
        console.log("Bunny Data:", bunny);
        alert("Bunny saved successfully!");
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Add New Bunny</h1>

            {/* Breed Selection */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Select Breed</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div
                        className={`border rounded-lg p-6 flex items-center justify-center h-24 cursor-pointer ${bunny.breed === "Holland Lop" ? "bg-blue-200 border-blue-500" : "bg-white"
                            }`}
                        onClick={() => handleBreedSelection("Holland Lop")}
                    >
                        <p className="text-gray-700 font-medium">Holland Lop</p>
                    </div>
                    <div
                        className={`border rounded-lg p-6 flex items-center justify-center h-24 cursor-pointer ${bunny.breed === "Netherland Dwarf" ? "bg-blue-200 border-blue-500" : "bg-white"
                            }`}
                        onClick={() => handleBreedSelection("Netherland Dwarf")}
                    >
                        <p className="text-gray-700 font-medium">Netherland Dwarf</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Bunny Name/ID</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name or ID"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Gender</label>
                        <div className="flex gap-4 mt-2">
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="Male" onChange={handleChange} />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="Female" onChange={handleChange} />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Take Home Date</label>
                        <input
                            type="date"
                            name="takeHomeDate"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Price (USD)</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="$"
                            className="w-full border p-2 rounded"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Status</label>
                        <select name="status" className="w-full border p-2 rounded" onChange={handleChange}>
                            <option value="Available">Available</option>
                            <option value="Sold">Sold</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Bunny Description</label>
                    <textarea
                        name="description"
                        placeholder="Enter bunny description..."
                        className="w-full border p-2 rounded"
                        rows="3"
                        onChange={handleChange}
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div className="mt-6 border-dashed border-2 border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                    <p className="text-gray-500">Upload Bunny Images</p>
                    <p className="text-xs text-gray-400 mb-2">PNG, JPG, GIF up to 10MB</p>

                    <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Select Images
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                    </label>

                    {/* Show Uploaded Images */}
                    <div className="mt-4 grid grid-cols-4">
                        {bunny.images.length === 0 ? (
                            <p className="col-span-4 text-gray-400 italic">No images uploaded</p>
                        ) : (
                            bunny.images.map((img, index) => (
                                <div key={index} className="relative w-44 h-44 rounded-lg overflow-hidden border">
                                    <img src={URL.createObjectURL(img)} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl"
                                    >
                                        ✖
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button onClick={handleSubmit} className="bg-black text-white px-4 py-2 rounded hover:opacity-80">
                        Save Bunny
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewBunny;
