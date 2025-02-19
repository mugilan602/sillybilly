import React from "react";
import GoatCard from "../../components/GoatCard";

function Goats() {
    const data = [
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },]

    return (
        <>
            <div className="bg-[#FAF3E0]">
                <div
                    className="flex flex-col items-center w-full lg:h-[60vh] bg-cover bg-center justify-center text-white text-3xl"
                    style={{ backgroundImage: "url('/Images/goatBG.png')" }}
                >
                    <h2 style={{ fontFamily: "Cookie, cursive" }} className="text-3xl sm:text-5xl text-center mt-4 sm:mb-5 text-[#404040]">
                        Here are some of our adult Silky Fainting Goats & Nigerian <br /> Dwarf Goats
                    </h2>
                    <p style={{ fontFamily: "Futura LT W01 Medium" }} className="text-center text-base sm:text-xl text-black my-2">
                        ** Looking for some kids to add to your farm, Please e-mail us to find out who are available **
                    </p>
                </div>
                <div
                    className="py-4 px-4 sm:pt-8 sm:p-6 max-w-3xl mx-auto">
                    <h2
                        style={{ fontFamily: "Inter" }}
                        className="text-2xl font-semibold tracking-widest text-[#A2672D] text-center">
                        MINIATURE SILKY FAINTING GOATS
                    </h2>
                    <div
                        style={{ fontFamily: "Open Sans" }}
                    >
                        <p className="mt-4 text-md text-black text-left">
                            Miniature Silky Fainting Goats are a breed of goats that originated between 1990-2000. They are a perfect cross between the Long coated Nigerian Dwarf goats and Tennessee Fainting Goat.
                            These goats will steal your heart with their pint-sized stature, carefree wispy bangs, and long and lustrous velvety hair that hangs straight from the body.
                        </p>
                        <p className="mt-4 text-md text-black text-left">
                            Yes, these goats have short lived fainting episodes when startled. There is no pain involved. They bounce back to normal within a matter of seconds.
                            This a condition known as Myotonia Congenita, a genetic mutation (a permanent alteration in the DNA) where muscle fibers stiffen momentarily, resulting in some goats toppling over. Older animals seem to adapt, sensing an oncoming episode by balancing themselves with outstretched legs, preventing a fall.
                        </p>
                        <p className="mt-4 text-md text-black text-left">
                            Mini Silky Fainting goats are a breed to consider. They’re a complete package — stunning looks and the ability to connect with humans in a deep and meaningful way.
                            They are truly a joy to be around!
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="px-3 sm:p-6 max-w-3xl mx-auto grid grid-col-1 space-y-4 sm:grid-cols-2">
                        {data.map((goat, index) => (
                            <GoatCard key={index} data={goat} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Goats;
