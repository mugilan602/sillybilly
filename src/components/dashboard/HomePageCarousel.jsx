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
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold mb-4">Home Page Carousel</h1>

                    <div className="mb-4">
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Upload Images
                            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                </div>
                <div className={`grid grid-cols-4 justify-items-center${images.length === 0 ? "gap-0" :" gap-4"}`}>
                    {images.length === 0 ? (
                        <p className="text-gray-500 italic ml-1">No images uploaded</p>
                    ) : (
                        images.map((img, index) => (
                            <div key={index} className="relative w-64 h-64 border rounded-lg overflow-hidden">
                                <img src={img} alt="Carousel Preview" className="w-full h-full object-cover" />
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
        </div>
    );
};

export default HomePageCarousel;