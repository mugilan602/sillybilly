function AdoptionGallery() {
    const images = [
        "/Images/Adoption/kit1.png",
        "/Images/Adoption/kit2.png",
        "/Images/Adoption/kit3.png",
        "/Images/Adoption/kit4.png",
        "/Images/Adoption/kit5.png"
    ];

    return (
        <>
            <section className="py-6 lg:py-4 lg:px-6 md:px-16 bg-[#FFF8F1]">
                <h2
                    style={{ fontFamily: "Futura LT W01 Medium", }}
                    className="text-xl md:text-5xl text-[#A2672D] text-center mb-8">
                    Some kits available for adoption
                </h2>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {images.map((src, index) => (
                        <div key={index} className="relative">
                            <img
                                src={src}
                                alt={`Kit ${index + 1}`}
                                className="w-full aspect-square object-cover lg:rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </section>
            <section className="font-[Open_sans] bg-[#FFF8F1] py-8 flex flex-col md:flex-row justify-center items-center gap-6 px-4">
                <button className="bg-[#3498db] text-white w-72 h-16 text-lg font-semibold rounded-md shadow-[0px_8px_16px_rgba(0,0,0,0.5)] hover:bg-[#917767] transition">
                    View all Holland Lops for adoption
                </button>
                <button className="bg-[#3498db] text-white w-72 h-16 text-lg font-semibold rounded-md shadow-[0px_8px_16px_rgba(0,0,0,0.5)] hover:bg-[#917767] transition">
                    View all Netherland Dwarfs for adoption
                </button>

            </section>
        </>
    );
}

export default AdoptionGallery;
