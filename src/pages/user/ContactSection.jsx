import React, { useState } from "react";

const ContactSection = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await fetch("https://backend.sillybillysilkies.workers.dev/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message. Please try again.");
            }

            setSuccess(true);
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Header Section */}
            <div className="text-center bg-[#FFF8F1] py-5 lg:pt-10 px-4">
                <h1 className="text-2xl lg:text-3xl font-semibold text-[#404040] mb-4 font-[Poppins]">CONTACT US</h1>
                <p className="text-lg text-[#404040] max-w-3xl mx-auto font-[Open_Sans]">
                    Need some answers? Feel free to message / call us and we will be more than happy to assist in locating your ideal pet.
                </p>
                <p className="text-lg text-[#404040] max-w-2xl mx-auto mt-4 font-[Open_Sans]">
                    Visits to our farm are by prior appointment only due to strict bio-security practices in place.
                </p>
                <p className="lg:text-2xl text-[#A2672D] font-semibold mt-12 font-[Inter]">
                    Throw us a message, we promise to fetch.
                </p>
                <hr className="w-10 border-2 mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 min-h-full">
                {/* Left Section - Contact Info */}
                <div className="bg-[#E0BE9A]/80 text-[#4A3628] pl-16 py-8 flex flex-col justify-center">
                    <div>
                        <h3
                            style={{ fontFamily: "Futura LT Book" }}
                            className="text-xl font-normal mb-3 text-[#5B4D43]">Address</h3>
                        <div className="font-[Open_Sans] text-black">
                            <p>Silly Billy Silkies</p>
                            <p>Amaranth, ON Canada</p>
                        </div>

                        <h3
                            style={{ fontFamily: "Futura LT Book" }}
                            className="text-xl font-normal mt-6 mb-2 text-[#5B4D43]">Phone</h3>
                        <p className="font-[Open_Sans] text-black">416-806-3485</p>

                        <h3
                            style={{ fontFamily: "Futura LT Book" }}
                            className="text-xl font-normal mt-6 mb-2 text-[#5B4D43]">Email</h3>
                        <p className="font-[Open_Sans] text-black ">SillyBillySilkies@gmail.com</p>
                    </div>
                </div>

                {/* Middle Section - Contact Form */}
                <div className="bg-[#E0BE9A]/40  col-span-2 flex flex-col justify-center px-4 sm:px-2 py-4">
                    <form onSubmit={handleSubmit} className="flex flex-col mx-auto sm:w-8/12 justify-end">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-[#000000] font-[Inter] font-light mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="p-2 border bg-white border-black w-full"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-[#000000] font-[Inter] font-light mb-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="p-2 border bg-white border-black w-full"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className="text-[#000000] font-[Inter] font-light mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="p-2 border bg-white border-black w-full"
                                required
                            />
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className="text-[#000000] font-[Inter] font-light mb-1">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="p-2 border bg-white border-black w-full h-28"
                                required
                            ></textarea>
                        </div>

                        <div
                            onClick={handleSubmit}
                            className="relative ml-auto mt-4 w-[200px] h-[65px] cursor-pointer"
                        >
                            {/* Normal State */}
                            <img
                                src="/Images/contactButton1.svg"
                                alt="button2"
                                className="absolute inset-0 transition-opacity duration-300 opacity-100 hover:opacity-0"
                            />

                            {/* Hover State */}
                            <img
                                src="/Images/contactButtonHover1.svg"
                                alt="button2-hover"
                                className="absolute inset-0 transition-opacity duration-300 opacity-0 hover:opacity-100"
                            />
                        </div>


                        {success && <p className="text-green-600 mt-2">Message sent successfully!</p>}
                        {error && <p className="text-red-600 mt-2">{error}</p>}
                    </form>
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
