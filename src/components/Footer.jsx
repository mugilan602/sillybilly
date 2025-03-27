import React from "react";

function Footer() {
    return (
        <footer className="bg-[#FFF8F1] pt-4">
            <div className="max-w-8xl mx-16 grid grid-cols-1 md:grid-cols-9 items-stretch">

                {/* Image 1 - Square */}
                <div className="w-full col-span-2 aspect-square">
                    <img
                        src="/Images/Footer/image1.jpg"
                        alt="Silkie 1"
                        className="w-full h-full object-cover "
                    />
                </div>

                {/* Text Section - Square */}
                <div className="w-full font-[Open_sans] flex flex-col justify-center px-6 py-8 bg-[#E0BE9A] text-[#A2672D] col-span-2 aspect-square">
                    <h2
                        style={{ fontFamily: 'Reklame Script Medium' }}
                        className="text-2xl mb-2">Silly Billy Silkies</h2>
                    <p>Amaranth, ON</p>
                    <p>Canada</p>
                    <p className="mt-4 font-semibold">SillyBillySilkies@gmail.com</p>
                    <p className="font-semibold">416-806-3485</p>
                </div>

                {/* Image 2 - Square */}
                <div className="w-full  col-span-2 aspect-square">
                    <img
                        src="/Images/Footer/image2.jpg"
                        alt="Silkie 2"
                        className="w-full h-full object-cover "
                    />
                </div>

                <div className="w-full col-span-3 ">
                    <img
                        src="/Images/Footer/image3.jpg"
                        alt="Silkie 3"
                        className="w-full h-full object-cover"
                    />
                </div>

            </div>
        </footer>
    );
}

export default Footer;
