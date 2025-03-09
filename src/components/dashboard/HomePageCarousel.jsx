import { useState, useEffect } from "react";

const API_URL = "https://backend.sillybillysilkies.workers.dev/fetch"; // Fetch images
const UPLOAD_URL = "https://backend.sillybillysilkies.workers.dev/HomepageUpload"; // Upload images
const DELETE_URL = "https://backend.sillybillysilkies.workers.dev/HomepageDelete"; // Delete images
const PAGE_TYPE = "homepage"; // Page type for API requests

const HomePageCarousel = () => {
    const [images, setImages] = useState([]);

    // 🔹 Fetch Images on Page Load
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ pageType: PAGE_TYPE }),
                });

                if (!response.ok) throw new Error("Failed to fetch images");

                const data = await response.json();

                // 🔹 Extract images directly from the response
                const allImages = data.images.map((image) => ({
                    id: image.id,
                    url: image.url,
                }));

                setImages(allImages);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // 🔹 Handle Image Upload
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        formData.append("pageType", PAGE_TYPE);

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        files.forEach((file) => {
            if (validTypes.includes(file.type)) {
                formData.append("file", file);
            } else {
                console.warn(`Invalid file type: ${file.name}`);
            }
        });

        try {
            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload images");

            const result = await response.json();

            // Ensure the response has the correct structure
            if (!result.images || !Array.isArray(result.images)) {
                throw new Error("Invalid API response format");
            }

            // Correctly map each image ID from the response
            const newImages = result.images.map((img) => ({
                id: img.id, // Each image has a unique ID
                url: img.url,
            }));

            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };


    // 🔹 Handle Image Deletion
    const handleDeleteImage = async (imageId) => {
        try {
            const response = await fetch(DELETE_URL, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: imageId, pageType: PAGE_TYPE }),
            });

            if (!response.ok) throw new Error("Failed to delete image");

            setImages(images.filter((img) => img.id !== imageId)); // Remove from state
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-center md:text-left">Home Page Carousel</h1>

                    {/* Upload Button */}
                    <div className="mt-3 md:mt-0">
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm md:text-base">
                            Upload Images
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                {/* 🔹 Image Grid (Display Images) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    {images.length === 0 ? (
                        <p className="text-gray-500 italic text-center w-full">No images available</p>
                    ) : (
                        images.map((img, index) => (
                            <div key={index} className="relative w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-48 md:h-56 lg:h-64 border rounded-lg overflow-hidden">
                                <img src={img.url} alt="Carousel" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => handleDeleteImage(img.id)}
                                    className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl hover:bg-red-700"
                                >
                                    ✖
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePageCarousel;