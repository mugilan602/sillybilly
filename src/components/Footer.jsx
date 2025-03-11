import React from "react";

function Footer() {
    return (
        <footer className="bg-[#FFF8F1] pt-4">
            <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-5 items-stretch">

                {/* Image 1 - Square */}
                <div className="w-full aspect-square">
                    <img
                        src="/Images/Footer/image1.jpg"
                        alt="Silkie 1"
                        className="w-full h-full object-cover "
                    />
                </div>

                {/* Text Section - Square */}
                <div className="w-full font-[Open_sans] flex flex-col justify-center px-6 py-8 bg-[#E0BE9A] text-[#A2672D] aspect-square">
                    <h2
                        style={{ fontFamily: 'Reklame Script Medium' }}
                        className="text-2xl mb-2">Silly Billy Silkies</h2>
                    <p>Amaranth, ON</p>
                    <p>Canada</p>
                    <p className="mt-4 font-semibold">SillyBillySilkies@gmail.com</p>
                    <p className="font-semibold">416-806-3485</p>
                </div>

                {/* Image 2 - Square */}
                <div className="w-full aspect-square">
                    <img
                        src="/Images/Footer/image2.jpg"
                        alt="Silkie 2"
                        className="w-full h-full object-cover "
                    />
                </div>

                {/* Image 3 - Rectangular (spans 2 columns on large screens, full width on mobile) */}
                <div className="w-full md:col-span-2 aspect-[2/1]">
                    <img
                        src="/Images/Footer/image3.jpg"
                        alt="Silkie 3"
                        className="w-full h-full object-cover "
                    />
                </div>

            </div>
        </footer>
    );
}

export default Footer;
