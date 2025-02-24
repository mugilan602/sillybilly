import { useState, useEffect } from "react";

const API_URL = "https://backend.sillybillysilkies.workers.dev/images"; // Fetch images
const UPLOAD_URL = "https://backend.sillybillysilkies.workers.dev/upload"; // Upload images
const DELETE_URL = "https://backend.sillybillysilkies.workers.dev/delete"; // Delete images

const HomePageCarousel = () => {
    const [images, setImages] = useState([]);

    // 🔹 Fetch images from Cloudflare R2 on component mount
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Failed to fetch images");

                const data = await response.json();
                console.log("Fetched images:", data);

                setImages(data); // Set images with { key, url }
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // 🔹 Handle Image Upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        const formData = new FormData();

        // Append first file (you can modify this to allow multiple uploads)
        files.forEach((file) => formData.append("image", file));

        try {
            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to upload image");

            const result = await response.json();
            console.log("Uploaded image:", result);
            console.log(result);

            // Append new image to state
            setImages([...images, { key: `carousel_images/${result.filename}`, url: `https://pub-61a0ce49134240fc832eac0f30d0dabc.r2.dev/carousel_images/${result.filename}` }]);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    // 🔹 Handle Image Deletion
    const handleDeleteImage = async (fileName) => {
        try {
            console.log(`Deleting: ${fileName}`);

            const response = await fetch(DELETE_URL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filename: fileName }), // Send JSON body
            });

            if (!response.ok) throw new Error("Failed to delete image");

            // Remove image from state after successful deletion
            setImages(images.filter((img) => img.key !== `carousel_images/${fileName}`));
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
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>

                {/* 🔹 Image Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                    {images.length === 0 ? (
                        <p className="text-gray-500 italic text-center w-full">No images available</p>
                    ) : (
                        images.map((img, index) => {
                            const fileName = img.key.replace("carousel_images/", ""); // Extract file name
                            return (
                                <div key={index} className="relative w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-48 md:h-56 lg:h-64 border rounded-lg overflow-hidden">
                                    <img src={img.url} alt="Carousel" className="w-full h-full object-cover" />
                                    <button
                                        onClick={() => handleDeleteImage(fileName)}
                                        className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-bl hover:bg-red-700"
                                    >
                                        ✖
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePageCarousel;
