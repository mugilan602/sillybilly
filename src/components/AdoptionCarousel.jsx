import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";

function AdoptionGallery() {
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchImages() {
            try {
                const response = await fetch("/data/homepage.json"); // Fetch JSON
                const data = await response.json();
                console.log(data);

                // Directly use the URL field from JSON (since it's already absolute)
                // setImages(data.images.map(image => image.url));
                const sortedImages = data.images.sort((a, b) => a.order - b.order);
                console.log(sortedImages);
                setImages(sortedImages.map(image=>image.url));
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
                    className="text-xl md:text-4xl text-[#A2672D] text-center mb-8"
                >
                    Some kits available for adoption
                </h2>

                {/* Swiper Carousel */}
                <div className="relative max-w-8xl pt-8 px-5 overflow-x-visible bg-white mx-auto">
                    {images.length > 0 ? (
                        <>

                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                spaceBetween={20}
                                slidesPerView={1}
                                breakpoints={{
                                    640: { slidesPerView: Math.min(images.length, 2) },
                                    1024: { slidesPerView: Math.min(images.length, 5) },
                                }}
                                navigation={{
                                    nextEl: ".custom-next",
                                    prevEl: ".custom-prev",
                                }}
                                pagination={{ clickable: true, el: ".custom-pagination" }}
                                autoplay={{ delay: 2000, disableOnInteraction: false }}
                                className="pb-12"
                            >
                                {images.map((src, index) => (
                                    <SwiperSlide key={index} className="flex justify-center">
                                        <img
                                            src={src}
                                            alt={`Kit ${index + 1}`}
                                            className="w-full aspect-square object-cover shadow-md"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Loading images...</p>
                    )}

                    {/* Custom Pagination - With Spacing */}
                    <div className="custom-pagination mt-4 pb-4 flex justify-center space-x-2"></div>
                </div>
            </section>

            {/* Buttons Section */}
            <section className="font-[Open_sans] bg-[#FFF8F1] py-4 flex flex-col md:flex-row justify-center items-center gap-6 px-4 min-h-[100px]">
                <div onClick={() => navigate("/holland_lop")} className="relative w-[300px] sm:w-[500px] h-[50px]">
                    <img src="/Images/Homepage/button.svg" alt="button" className="absolute inset-0  transition-opacity duration-300 hover:opacity-0" />
                    <img src="/Images/Homepage/button_hover.svg" alt="button-hover" className="absolute inset-0   opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>

                <div onClick={() => navigate("/netherland_dwarf")} className="relative w-[300px] sm:w-[500px] h-[50px]">
                    <img src="/Images/Homepage/button2.svg" alt="button2" className="absolute inset-0  transition-opacity duration-300 hover:opacity-0" />
                    <img src="/Images/Homepage/button2hover.svg" alt="button2-hover" className="absolute inset-0  opacity-0 transition-opacity duration-300 hover:opacity-100" />
                </div>
            </section>

        </>
    );
}

export default AdoptionGallery;
