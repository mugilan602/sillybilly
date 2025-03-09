import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function AdoptionGallery() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch("/cms/homepage.json"); // Fetch from public/cms/homepage.json
                const data = await response.json();
                setImages(data.images); // Set images from JSON
            } catch (error) {
                console.error("❌ Error fetching images:", error);
            }
        }
        fetchImages();
    }, []);

    return (
        <>
            <section className="py-6 lg:py-4 lg:px-6 md:px-16 bg-[#FFF8F1]">
                <h2
                    style={{ fontFamily: "Futura LT W01 Medium" }}
                    className="text-xl md:text-5xl text-[#A2672D] text-center mb-8"
                >
                    Some kits available for adoption
                </h2>

                {/* Swiper Carousel */}
                <div className="relative max-w-5xl mx-auto">
                    {images.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            navigation
                            pagination={{ clickable: true, el: ".custom-pagination" }}
                            autoplay={{ delay: 2000, disableOnInteraction: false }}
                            className="pb-12"
                        >
                            {images.map((src, index) => (
                                <SwiperSlide key={index} className="flex justify-center">
                                    <img
                                        src={src}
                                        alt={`Kit ${index + 1}`}
                                        className="w-full aspect-square object-cover lg:rounded-lg shadow-md"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <p className="text-center text-gray-500">Loading images...</p>
                    )}

                    {/* Custom Pagination Wrapper Below */}
                    <div className="custom-pagination mt-4 flex justify-center"></div>
                </div>
            </section>

            {/* Buttons Section */}
            <section className="font-[Open_sans] bg-[#FFF8F1] py-4 flex flex-col md:flex-row justify-center items-center gap-6 px-4">
                <button className="bg-[#3498db] text-white w-72 h-16 text-lg font-semibold rounded-md shadow-md hover:bg-[#917767] transition">
                    View all Holland Lops for adoption
                </button>
                <button className="bg-[#3498db] text-white w-72 h-16 text-lg font-semibold rounded-md shadow-md hover:bg-[#917767] transition">
                    View all Netherland Dwarfs for adoption
                </button>
            </section>
        </>
    );
}

export default AdoptionGallery;
