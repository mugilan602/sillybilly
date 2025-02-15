import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react"; // Icons for mobile menu
import { motion } from "framer-motion"; // Import Framer Motion for animation

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get the current location
    const [isBunnyHovered, setIsBunnyHovered] = useState(false);
    const [isBunnyOpen, setIsBunnyOpen] = useState(false); // Dropdown for Bunny

    // Function to determine if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Disable background scrolling when the mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <>
            {/* Top Header */}
            <header 
                style={{ fontFamily: 'League Spartan' }}
            className="bg-[#A56A3A] text-white tracking-wider text-center py-2 text-sm lg:text-xl">
                Your friend - AWAITS
            </header>

            {/* Navbar */}
            <nav className="bg-[#FFF8F1] shadow-md">
                <div className="mx-auto flex justify-between items-center px-6 py-4">
                    {/* Logo and Tagline */}
                    <div className="flex items-center space-x-4">
                        <img src="/Logos/Logo.avif" alt="Silly Billy Silkies" className="h-full w-12 sm:w-16 rounded-full" />
                        <h1
                            style={{ fontFamily: 'Reklame Script Medium' }}
                            className="text-4xl md:text-7xl font-medium text-[#5B4D43]">
                            Silly Billy Silkies
                        </h1>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#4A3B2D]"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu size={28} />
                    </button>

                    {/* Email Section - Hidden on Small Screens */}
                    <div className="hidden md:flex flex-col bg-[#E2B897] rounded-tl-3xl rounded-br-3xl px-4 py-2 shadow-md">
                        <p className="text-white text-center text-lg font-semibold">E-Mail us</p>
                        <p className="text-black text-lg">
                            SillyBillySilkies@gmail.com
                        </p>
                    </div>
                </div>

                {/* Horizontal Line */}
                <hr className="w-full border-t-2 border-[#4A3B2D]" />

                {/* Tagline */}
                <div className="px-6 md:ml-24 text-center md:text-left lg:pb-4 pt-2">
                    <p className="text-[#A2672D] font-poppins font-semibold">
                        Silkie Chicken, Silky Goats and Bunnies
                    </p>
                </div>

                {/* Desktop Navigation - Hidden on Mobile */}
                <div className="hidden font-[Open_Sans] md:flex justify-center items-center space-x-2 bg-[#E2B897] py-2 shadow-md text-[#4A3B2D] font-medium">
                    <Link to="/" className={`px-4 py-2 ${isActive("/") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}>Home</Link>

                    {/* Bunny Link with Sub-Links */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIsBunnyHovered(true)}
                        onMouseLeave={() => setIsBunnyHovered(false)}
                    >
                        <h3
                            to="/bunny"
                            className={`px-4 py-2 ${isActive("/bunny") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}
                        >
                            Bunny
                        </h3>

                        {/* Sub-Links - Centered */}
                        {isBunnyHovered && (
                            <div className="absolute top-full left-1/2 z-50 text-sm transform -translate-x-1/2 bg-[#E2B897] shadow-lg rounded-lg">
                                <Link
                                    to="/holland_lop"
                                    className="block text-center w-32 py-2 hover:bg-[#A56A3A] hover:text-white"
                                >
                                    Holland Lops
                                </Link>
                                <Link
                                    to="/netherland_dwarf"
                                    className="block text-center w-32 py-2 hover:bg-[#A56A3A] hover:text-white"
                                >
                                    Netherland Dwarf

                                </Link>
                                <Link
                                    to="/Gallery"
                                    className="block text-center w-32 py-2 hover:bg-[#A56A3A] hover:text-white"
                                >
                                    Gallery
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/bunny-care" className={`px-4 py-2 ${isActive("/bunny-care") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}>Bunny Care</Link>
                    <Link to="/chicks-eggs" className={`px-4 py-2 ${isActive("/chicks-eggs") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}>Chicks & Hatching Eggs</Link>
                    <Link to="/goats" className={`px-4 py-2 ${isActive("/goats") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}>Goats</Link>
                    <Link to="/contact" className={`px-4 py-2 ${isActive("/contact") ? "bg-[#A56A3A] text-white" : "hover:text-[#8B5A2B]"}`}>Contact Us</Link>
                </div>
            </nav>

            {/* Animated Mobile Menu */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-white/60 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed top-0 right-0 w-4/5 h-full bg-[#FFFFFF] shadow-lg z-50 flex flex-col items-center pt-8 overflow-y-auto max-h-screen"
                    >
                        {/* Close Button */}
                        <button className="absolute top-16 right-6 text-[#4A3B2D]" onClick={() => setIsOpen(false)}>
                            <X size={28} />
                        </button>

                        {/* Mobile Navigation Links */}
                        <ul className="flex flex-col space-y-1 text-[#4A3B2D] font-medium mt-16 w-full px-6">
                            <li>
                                <Link to="/" className="block w-full py-2 rounded-lg" onClick={() => setIsOpen(false)}>
                                    Home
                                </Link>
                            </li>

                            {/* Bunny Dropdown */}
                            <li className="relative">
                                <button
                                    className="flex justify-between w-full py-2 rounded-lg focus:outline-none"
                                    onClick={() => setIsBunnyOpen(!isBunnyOpen)}
                                >
                                    Bunny
                                    <motion.span
                                        animate={{ rotate: isBunnyOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown size={22} />
                                    </motion.span>
                                </button>

                                {/* Dropdown Menu */}
                                {isBunnyOpen && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full"
                                    >
                                        <Link to="/holland_lop" className="block py-2 px-3 hover:bg-[#A56A3A] hover:text-white" onClick={() => { setIsBunnyOpen(false); setIsOpen(false); }}>
                                            Holland Lops
                                        </Link>
                                        <Link to="/Netherland-Dwarf" className="block py-2 px-3 hover:bg-[#A56A3A] hover:text-white" onClick={() => { setIsBunnyOpen(false); setIsOpen(false); }}>
                                            Netherland Dwarf
                                        </Link>
                                        <Link to="/gallery" className="block py-2 px-3 hover:bg-[#A56A3A] hover:text-white" onClick={() => { setIsBunnyOpen(false); setIsOpen(false); }}>
                                            Gallery
                                        </Link>
                                    </motion.div>
                                )}
                            </li>
                            <li>
                                <Link to="/bunny-care" className="block w-full py-2 rounded-lg" onClick={() => setIsOpen(false)}>
                                    Bunny care
                                </Link>
                            </li>
                            <li>
                                <Link to="/chicks-eggs" className="block w-full py-2 rounded-lg" onClick={() => setIsOpen(false)}>
                                    Chicks & Hatching Eggs
                                </Link>
                            </li>
                            <li>
                                <Link to="/goats" className="block w-full py-2 rounded-lg" onClick={() => setIsOpen(false)}>
                                    Goats
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block w-full py-2 rounded-lg" onClick={() => setIsOpen(false)}>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                </>
            )}
        </>
    );
}

export default Navbar;