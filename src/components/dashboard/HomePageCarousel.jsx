import { useState } from "react";

const HomePageCarousel = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
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

                {/* Image Grid */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center`}>
                    {images.length === 0 ? (
                        <p className="text-gray-500 italic text-center w-full">No images uploaded</p>
                    ) : (
                        images.map((img, index) => (
                            <div key={index} className="relative w-full sm:w-48 md:w-56 lg:w-64 h-48 sm:h-48 md:h-56 lg:h-64 border rounded-lg overflow-hidden">
                                <img src={img} alt="Carousel Preview" className="w-full h-full object-cover" />
                                <button
                                    onClick={() => removeImage(index)}
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
