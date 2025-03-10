import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons
import { motion } from "framer-motion"; // Smooth animations
import axios from "axios"; // HTTP requests

function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // Hook to navigate

    // Save & Exit function (Triggers Cloudflare Pages deploy)
    const handleSaveAndExit = async () => {
        try {
            console.log("🔄 Triggering site redeploy...");

            // Call Cloudflare Worker Deploy Hook
            await axios.post("https://backend.sillybillysilkies.workers.dev/deploy");

            console.log("✅ Redeployment triggered successfully!");
            alert("Deployment started! The site will be updated shortly.");

            // Remove admin flag and redirect
            localStorage.removeItem("isAdmin");
            navigate("/");
        } catch (error) {
            console.error("❌ Failed to trigger redeploy:", error.message);
            alert("Failed to update site. Please try again.");
        }
    };

    return (
        <>
            {/* Desktop & Tablet Navbar */}
            <nav className="bg-white shadow-md flex items-center justify-between px-6 py-3">
                {/* Left Section - Branding */}
                <div className="flex items-center space-x-2">
                    <img src="/Logos/Logo.avif" alt="Silly Billy Silkies" className="h-8 w-8 rounded-full" />
                    <h1 className="text-lg font-semibold text-[#4A3B2D]">Silly Billy Silkies</h1>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 text-[#4A3B2D] text-sm font-medium">
                    <Link to="/admin" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Dashboard</Link>
                    <Link to="/admin/manage-listing" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Manage Listing</Link>
                    <Link to="/admin/add-bunny" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Add new Bunny</Link>
                    <Link to="/admin/gallery" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Gallery Management</Link>
                    <Link to="/admin/carousel" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Carousel Management</Link>
                    <Link to="/admin/forms" className="hover:text-black border-b-2 border-transparent hover:border-black pb-1">Form Responses</Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-[#4A3B2D]" onClick={() => setIsOpen(true)}>
                    <Menu size={28} />
                </button>

                {/* Save & Exit Button */}
                <button onClick={handleSaveAndExit} className="hidden md:block bg-black text-white px-4 py-2 text-sm rounded">
                    Save & Exit
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <>
                    {/* Dark Transparent Background */}
                    <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />

                    {/* Mobile Navigation Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg z-50 flex flex-col items-start pt-8 px-6"
                    >
                        {/* Close Button */}
                        <button className="absolute top-5 right-5 text-[#4A3B2D]" onClick={() => setIsOpen(false)}>
                            <X size={28} />
                        </button>

                        {/* Mobile Navigation Links */}
                        <div className="flex flex-col space-y-4 mt-10 w-full text-[#4A3B2D] font-medium text-lg">
                            <Link to="/admin" className="block py-2" onClick={() => setIsOpen(false)}>Dashboard</Link>
                            <Link to="/admin/manage-listing" className="block py-2" onClick={() => setIsOpen(false)}>Manage Listing</Link>
                            <Link to="/admin/add-bunny" className="block py-2" onClick={() => setIsOpen(false)}>Add new Bunny</Link>
                            <Link to="/admin/gallery" className="block py-2" onClick={() => setIsOpen(false)}>Gallery Management</Link>
                            <Link to="/admin/carousel" className="block py-2" onClick={() => setIsOpen(false)}>Carousel Management</Link>
                            <Link to="/admin/forms" className="block py-2" onClick={() => setIsOpen(false)}>Form Responses</Link>
                        </div>

                        {/* Save & Exit Button (Visible in Mobile Menu) */}
                        <button className="mt-8 w-full bg-black text-white py-3 rounded" onClick={handleSaveAndExit}>
                            Save & Exit
                        </button>
                    </motion.div>
                </>
            )}
        </>
    );
}

export default AdminNavbar;
