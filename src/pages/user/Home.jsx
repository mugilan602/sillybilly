import React from 'react'
import AdoptionCarousel from '../../components/AdoptionCarousel'
import Rabbit from '../../components/Rabit'

function Home() {
    return (
        <>
            <section>
                <img className="w-full mt-1 object-cover lg:h-[70vh]" src="/Images/Homepage/Landing.webp" alt="Landing Image" />
            </section>

            <section className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-5 md:gap-0">

                    {/* Title Section */}
                    <div className="bg-[#A2672D] flex items-center justify-center text-center md:text-left p-2 lg:p-8 md:col-span-2">
                        <h1 className="text-3xl font-[Dancing_script] md:text-6xl font-bold text-white">
                            How It All Began
                        </h1>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-3 flex flex-col justify-center font-[Open_Sans] bg-[#E0BE9A] text-[#404040] leading-relaxed text-md lg:text-lg p-4 lg:px-6 lg:py-16">
                        <p>
                            How did we come to name our humble establishment "Silly Billy Silkies"?
                            It all began with two charismatic Silkie roosters who came into our farm.
                            Captivated by their glistening silk cloak and compassionate personality,
                            we adopted more and more.
                        </p>
                        <br />
                        <p>
                            Then came along the Miniature Silky Fainting Goats. These goats had a silky
                            long coat of warm, soothing fur. They quickly won our hearts when they
                            tried to follow us around the farm like puppies. We gathered a herd and,
                            without even realizing it, we had gathered too many. As much as it pained us,
                            we were forced to sell some. However, people adored the quality and
                            characteristics of our goats and demanded more. In an unnatural turn of
                            events, we had created a community, and we decided to expand upon it
                            to welcome more people to the passion of raising and caring for animals.
                        </p>
                    </div>
                </div>
            </section>

            <section className="my-4 lg:py-0 md:px-0">
                {/* Image Grid */}
                <div className="lg:w-11/12 bg-[#FFF8F1] px-5 lg:px-10 py-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* FAMILY RUN FARM */}
                    <div className="bg-[#5B4D43] text-white flex flex-col justify-center items-center p-6 lg:rounded-lg shadow-md
        md:row-start-1 md:col-start-2 order-1 md:order-none relative">
                        <div className="text-center w-full">
                            <div>
                                <h3 className="text-4xl font-[Roboto] font-bold mb-16">FAMILY RUN FARM <br /> <span><hr className='w-6 mt-4 mx-auto' /></span></h3>

                            </div>
                            <p className="mt-2 font-[Overlock] text-lg">Quality Purebred <br /> Pedigreed Pets</p>
                        </div>
                    </div>

                    {/* Images with buttons */}
                    {[
                        { src: "/Images/Homepage/holland_lop.jpg", alt: "Holland Lop", link: "/holland_lop", name: "Holland Lop" },
                        { src: "/Images/Homepage/netherland_dwarf.jpg", alt: "Netherland Dwarf", link: "/netherland_dwarf", name: "Netherland Dwarf" },
                        // { src: "/Images/Chicken.png", alt: "Chicken", link: "/chicks-eggs", name: "Chicken" },
                        // { src: "/Images/hatching_eggs.png", alt: "Hatching Eggs", link: "/chicks-eggs", name: "Hatching Eggs" },
                        // { src: "/Images/goats.png", alt: "Goats", link: "/goats", name: "Goats" },
                    ].map((pet, index) => (
                        <div key={index} className="relative overflow-hidden shadow-md order-2">
                            <img
                                src={pet.src}
                                alt={pet.alt}
                                className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {/* Button inside each div - bottom left */}
                            <a href={pet.link} className="font-[Inter] absolute bottom-4 left-4 bg-[#E0BE9A] text-white px-2 py-1 lg:px-4 lg:py-2 rounded-lg text-lg lg:text-xl shadow-md hover:bg-red-400 transition">
                                {pet.name}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <section className="my-4 lg:py-0 md:px-0">
                {/* Image Grid */}
                <div className="lg:w-11/12 px-5 lg:px-10 py-8 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

                    {/* Images with buttons */}
                    {[
                        // { src: "/Images/holland_lop.png", alt: "Holland Lop", link: "/holland_lop", name: "Holland Lop" },
                        // { src: "/Images/netherland_dwarf.png", alt: "Netherland Dwarf", link: "/netherland_dwarf", name: "Netherland Dwarf" },
                        { src: "/Images/Homepage/chicken.jpg", alt: "Chicken", link: "/chicks-eggs", name: "Chicken" },
                        { src: "/Images/Homepage/hatching_eggs.jpg", alt: "Hatching Eggs", link: "/chicks-eggs", name: "Hatching Eggs" },
                        { src: "/Images/Homepage/goats.jpg", alt: "Goats", link: "/goats", name: "Goats" },
                    ].map((pet, index) => (
                        <div key={index} className="relative overflow-hidden shadow-md order-2">
                            <img
                                src={pet.src}
                                alt={pet.alt}
                                className="w-full aspect-square object-cover transition-transform duration-300 hover:scale-105"
                            />
                            {/* Button inside each div - bottom left */}
                            <a href={pet.link} className="font-[Inter] absolute bottom-4 left-4 bg-[#E0BE9A] text-white px-2 py-1 lg:px-4 lg:py-2 rounded-lg text-lg lg:text-xl shadow-md hover:bg-red-400 transition">
                                {pet.name}
                            </a>
                        </div>
                    ))}
                </div>
            </section>
            <AdoptionCarousel />
            <Rabbit />
        </>
    )
}

export default Home
