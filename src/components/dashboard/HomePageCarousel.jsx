import { useState, useEffect } from "react";
import { X } from "lucide-react";

const API_URL = "https://backend.sillybillysilkies.workers.dev/fetch"; // Fetch images
const UPLOAD_URL = "https://backend.sillybillysilkies.workers.dev/HomepageUpload"; // Upload images
const DELETE_URL = "https://backend.sillybillysilkies.workers.dev/HomepageDelete"; // Delete images
const PAGE_TYPE = "homepage"; // Page type for API requests

const HomePageCarousel = () => {
    const [images, setImages] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleting, setDeleting] = useState(null); // Holds the ID of the deleting image

    // 🔹 Fetch Images on Page Load
    useEffect(() => {
        const fetchImages = async () => {
            setFetching(true);
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
            } finally {
                setFetching(false);
            }
        };

        fetchImages();
    }, []);

    // 🔹 Handle Image Upload
    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
            console.warn("No valid images selected.");
            return;
        }

        const formData = new FormData();
        formData.append("pageType", PAGE_TYPE); // Ensure this is included first

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        let validFiles = 0; // Track valid file count

        files.forEach((file, index) => {
            if (validTypes.includes(file.type)) {
                formData.append("file", file); // Keep "file" if backend accepts both single & multiple uploads
                validFiles++;
            } else {
                console.warn(`Invalid file type: ${file.name}`);
            }
        });

        if (validFiles === 0) {
            console.warn("No valid images to upload.");
            return;
        }

        setUploading(true);

        try {
            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to upload images: ${errorText}`);
            }

            const result = await response.json();

            if (!result.images || !Array.isArray(result.images)) {
                throw new Error("Invalid API response format");
            }

            const newImages = result.images.map((img) => ({
                id: img.id,
                url: img.url,
            }));

            setImages((prevImages) => [...prevImages, ...newImages]);
        } catch (error) {
            console.error("Error uploading images:", error);
        } finally {
            setUploading(false);
        }
    };


    // 🔹 Handle Image Deletion
    const handleDeleteImage = async (imageId) => {
        setDeleting(imageId);
        try {
            const response = await fetch(DELETE_URL, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: imageId, pageType: PAGE_TYPE }),
            });

            if (!response.ok) throw new Error("Failed to delete image");

            setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));
        } catch (error) {
            console.error("Error deleting image:", error);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-[#754E1A] text-center md:text-left">Home Page Carousel</h1>

                    {/* Upload Button */}
                    <div className="mt-3 md:mt-0">
                        <label className={`cursor-pointer ${uploading ? "bg-gray-400" : "bg-[#754E1A]"} ${uploading ? "" : "hover:bg-[#5f482a]"} text-white px-4 py-2 rounded-md  text-sm md:text-base flex items-center gap-2`}>
                            {uploading && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>}
                            {uploading ? "Uploading..." : "Upload Images"}
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} disabled={uploading} />
                        </label>
                    </div>
                </div>

                {/* 🔹 Image Grid (Display Images) */}
                {fetching ? (
                    <div className="flex justify-center items-center w-full h-32">
                        <div className="animate-spin border-4 border-gray-300 border-t-blue-500 rounded-full w-10 h-10"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                        {images.length === 0 ? (
                            <p className="text-gray-500 italic text-left w-full">No images available</p>
                        ) : (
                            images.map((img) => (
                                <div key={img.id} className="relative mt-4 w-64 sm:w-48 md:w-56 lg:w-64 h-64 sm:h-64 md:h-56 lg:h-64 border border-[#4A3B2D] overflow-visible">
                                    <img
                                        src={img.url}
                                        alt="Carousel"
                                        className={`w-full h-full object-cover ${deleting === img.id ? "opacity-50" : ""}`}
                                    />

                                    <button
                                        onClick={() => handleDeleteImage(img.id)}
                                        className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#754E1A] text-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg"
                                        disabled={deleting === img.id}
                                    >
                                        {deleting === img.id ? (
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <X className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                </div>

                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePageCarousel;
