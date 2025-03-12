import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons
import { motion } from "framer-motion"; // Smooth animations
import axios from "axios"; // HTTP requests
import { Pencil } from "lucide-react"; // Import pen icon

function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate(); // Hook to navigate
    const fileInputRef = useRef(null); // Reference for hidden file input
    const location = useLocation(); // Get current path

    useEffect(() => {
        const fetchProfilePic = async () => {
            try {
                const response = await axios.get("https://backend.sillybillysilkies.workers.dev/GetProfilePic");
                if (response.data.success && response.data.imageUrl) {
                    setProfilePic(response.data.imageUrl);
                    console.log(response.data.imageUrl);

                }
            } catch (error) {
                console.error("❌ Failed to fetch profile picture:", error.message);
            }
        };

        fetchProfilePic();
    }, []);
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
    const handleLogout = () => {
        try {
            localStorage.removeItem("isAdmin");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const handleIconClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get uploaded file
        if (!file) return; // If no file selected, do nothing

        const formData = new FormData();
        formData.append("pageType", "profilePic");
        formData.append("file", file);

        try {
            const response = await axios.post(
                "https://backend.sillybillysilkies.workers.dev/ProfilePicUpload",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (response.data.success) {
                console.log("✅ Profile picture uploaded successfully!");

                // Fetch updated profile picture after upload
                if (response.data.success && response.data.images.length > 0) {
                    setProfilePic(response.data.images[0].url);
                } // Assume backend returns new image URL
            } else {
                console.error("❌ Upload failed:", response.data.message);
                alert("Failed to upload profile picture.");
            }
        } catch (error) {
            console.error("❌ Error uploading file:", error);
            alert("Error uploading file. Please try again.");
        }
    };
    const isActive = (path) => location.pathname === path ? "border-[#754E1A]" : "border-transparent";

    return (
        <>
            {/* Desktop & Tablet Navbar */}
            <nav className="bg-white shadow-md flex items-end justify-between px-6 py-3">
                {/* Left Section - Branding */}
                <div className="flex sm:items-center space-x-2 relative">
                    {/* Profile Picture */}
                    {profilePic && (
                        <img src={profilePic} alt="Profile" className="h-8 w-8 rounded-full object-cover border border-gray-300" />
                    )}

                    <h1 className="text-lg font-semibold text-[#754E1A]">Silly Billy Silkies</h1>

                    {/* Pen Icon - Click to Upload */}
                    <button
                        onClick={handleIconClick}
                        className=" p-1 rounded-full cursor-pointer border-gray-300"
                    >
                        <Pencil size={16} className="text-gray-600" />
                    </button>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange} // Add actual upload logic
                    />
                </div>


                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-6 text-[#754E1A] text-sm font-medium">
                    <Link to="/admin" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin")} pb-1`}>Dashboard</Link>
                    <Link to="/admin/add-bunny" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin/add-bunny")} pb-1`}>Add new Bunny</Link>
                    <Link to="/admin/manage-listing" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin/manage-listing")} pb-1`}>Manage Listing</Link>
                    <Link to="/admin/gallery" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin/gallery")} pb-1`}>Gallery Management</Link>
                    <Link to="/admin/carousel" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin/carousel")} pb-1`}>Carousel Management</Link>
                    <Link to="/admin/forms" className={`hover:text-[#4A3B2D] border-b-2  border-[#754E1A] ${isActive("/admin/forms")} pb-1`}>Form Responses</Link>
                </div>


                {/* Mobile Menu Button */}
                <button className="absolute right-8 md:hidden text-[#4A3B2D]" onClick={() => setIsOpen(true)}>
                    <Menu size={28} />
                </button>

                {/* Save & Exit Button */}
                <div className="flex space-x-2">
                    <button onClick={handleSaveAndExit} className="hidden md:block border text-[#754E1A] cursor-pointer bg-white px-4 py-2 text-sm rounded">
                        Save & Exit
                    </button>
                    <button onClick={handleLogout} className="hidden md:block bg-[#754E1A] cursor-pointer hover:bg-[#5f482a] text-white px-4 py-2 text-sm rounded">
                        Logout
                    </button>
                </div>
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
                            <Link to="/admin/add-bunny" className="block py-2" onClick={() => setIsOpen(false)}>Add new Bunny</Link>
                            <Link to="/admin/manage-listing" className="block py-2" onClick={() => setIsOpen(false)}>Manage Listing</Link>
                            <Link to="/admin/gallery" className="block py-2" onClick={() => setIsOpen(false)}>Gallery Management</Link>
                            <Link to="/admin/carousel" className="block py-2" onClick={() => setIsOpen(false)}>Carousel Management</Link>
                            <Link to="/admin/forms" className="block py-2" onClick={() => setIsOpen(false)}>Form Responses</Link>
                        </div>

                        {/* Save & Exit Button (Visible in Mobile Menu) */}
                        <div className="flex w-full gap-4">
                            <button className="mt-8 w-full border text-[#754E1A] cursor-pointer bg-white py-3 rounded" onClick={handleSaveAndExit}>
                                Save & Exit
                            </button>
                            <button className="mt-8 w-full bg-[#754E1A] cursor-pointer hover:bg-[#5f482a] text-white  py-3 rounded" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </>
    );
}

export default AdminNavbar;
