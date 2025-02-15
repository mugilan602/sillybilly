import React from "react";

const ContactSection = () => {
    return (
        <>
            {/* Header Section */}
            <div className="text-center bg-[#FFF8F1] py-5 lg:py-10 px-4">
                <h1 className="text-2xl lg:text-3xl font-bold text-black mb-4 font-[Poppins]">CONTACT US</h1>
                <p className="text-md text-black max-w-2xl mx-auto font-[Open_Sans]">
                    Need some answers? Feel free to message / call us and we will be more than happy to assist in locating your ideal pet.
                </p>
                <p className="text-md text-black max-w-2xl mx-auto mt-4 font-[Open_Sans]">
                    Visits to our farm are by prior appointment only due to strict bio-security practices in place.
                </p>
                <p className="lg:text-2xl text-[#A2672D] font-semibold mt-4 font-[Inter]">
                    Throw us a message, we promise to fetch.
                </p>
            </div>

          
            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-full">
                {/* Left Section - Contact Info */}
                <div className="bg-[#D4A373] text-[#4A3628] p-8 flex flex-col">
                    <div>
                        <h3 className="text-lg font-semibold mb-3 font-[Inter]">Address</h3>
                        <div className="font-[Open_Sans]">
                            <p>Silly Billy Silkies</p>
                            <p>Amaranth, ON Canada</p>
                        </div>

                        <h3 className="text-lg font-semibold mt-6 mb-2 font-[Inter]">Phone</h3>
                        <p className="font-[Open_Sans]">416-806-3485</p>

                        <h3 className="text-lg font-semibold mt-6 mb-2 font-[Inter]">Email</h3>
                        <p className="font-[Open_Sans] underline">SillyBillySilkies@gmail.com</p>
                    </div>
                </div>

                {/* Middle Section - Contact Form */}
                <div className="bg-[#F3E0D0] col-span-2 flex flex-col justify-center px-4 sm:px-12 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-[#4A3628] font-medium mb-1">First Name</label>
                            <input type="text" className="p-2 border bg-white border-black rounded-sm w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#4A3628] font-medium mb-1">Last Name</label>
                            <input type="text" className="p-2 border bg-white border-black rounded-sm w-full" />
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="text-[#4A3628] font-medium mb-1">Email *</label>
                        <input type="email" className="p-2 border bg-white border-black rounded-sm w-full" />
                    </div>

                    <div className="flex flex-col mt-4">
                        <label className="text-[#4A3628] font-medium mb-1">Message</label>
                        <textarea className="p-2 border bg-white border-black rounded-sm w-full h-28"></textarea>
                    </div>

                    <button className="mt-4 bg-[#D4A373] text-white px-8 py-2 rounded-md shadow-lg hover:bg-[#B5835A] w-full sm:w-auto">
                        Send
                    </button>
                </div>

                {/* Right Section - Image */}
                <div className="h-full">
                    <img src="/Images/contact.avif" alt="Silkie Chickens" className="w-full h-full object-cover" />
                </div>
            </div>

        </>
    );
};

export default ContactSection;
