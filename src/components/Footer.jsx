import React from "react";

function Footer() {
    return (
        <footer className="bg-[#FFF8F1] pt-4 md:px-12">
            <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-4">

                {/* Image 1 - Appears first on larger screens, second on mobile */}
                <div className="">
                    <img
                        src="/Images/Footer/image1.png"
                        alt="Silkie 1"
                        className="w-full h-full object-cover shadow-md"
                    />
                </div>

                {/* Text Section - Appears first on mobile, second on larger screens */}
                <div className="font-[Open_sans] flex flex-col justify-center pl-4 py-8 sm:py-0 bg-[#E0BE9A] text-[#A2672D] w-full h-full">
                    <h2
                        style={{ fontFamily: 'Reklame Script Medium' }}
                        className="text-2xl mb-2">Silly Billy Silkies</h2>
                    <p>Amaranth, ON</p>
                    <p>Canada</p>
                    <p className="mt-4 font-semibold">SillyBillySilkies@gmail.com</p>
                    <p className="font-semibold">416-806-3485</p>
                </div>

                {/* Image 2 */}
                <div className="h-full">
                    <img
                        src="/Images/Footer/image2.png"
                        alt="Silkie 2"
                        className="w-full h-full object-cover shadow-md"
                    />
                </div>

                {/* Image 3 */}
                <div className="h-full">
                    <img
                        src="/Images/Footer/image3.png"
                        alt="Silkie 3"
                        className="w-full h-full object-cover shadow-md"
                    />
                </div>

            </div>
        </footer>
    );
}

export default Footer;
