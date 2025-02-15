import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [isBunnyHovered, setIsBunnyHovered] = useState(false);
    const [isBunnyOpen, setIsBunnyOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    }, [isOpen]);

    return (
        <nav className="bg-[#FFF8F1] shadow-md">
            <div className="mx-auto flex justify-between items-center px-6 py-4">
                <div className="flex items-center space-x-4">
                    <img src="/Logos/logo.avif" alt="Silly Billy Silkies" className="h-12 w-12 rounded-full" />
                    <h1 className="text-2xl md:text-7xl font-medium text-[#5B4D43]">Silly Billy Silkies</h1>
                </div>

                <button className="md:hidden relative w-10 h-10" onClick={() => setIsOpen(!isOpen)}>
                    <span className="sr-only">Open main menu</span>
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-5 h-5"
                        initial={false}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.span
                            className="block h-0.5 w-5 bg-current absolute"
                            initial={false}
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -6 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="block h-0.5 w-5 bg-current absolute"
                            initial={false}
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.3 }}
                        />
                        <motion.span
                            className="block h-0.5 w-5 bg-current absolute"
                            initial={false}
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 6 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>
                </button>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed top-0 right-0 w-4/5 h-full shadow-lg z-50 flex flex-col items-center pt-8 overflow-y-auto"
                >
                    <ul className="flex flex-col space-y-4 text-[#4A3B2D] font-medium mt-16 w-full px-6">
                        <li><Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li className="relative">
                            <button className="flex justify-between w-full py-2" onClick={() => setIsBunnyOpen(!isBunnyOpen)}>
                                Bunny
                                <motion.span animate={{ rotate: isBunnyOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown size={22} />
                                </motion.span>
                            </button>
                            {isBunnyOpen && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                                    <Link to="/holland_lop" className="block py-2 px-3" onClick={() => setIsOpen(false)}>Holland Lops</Link>
                                    <Link to="/Netherland-Dwarf" className="block py-2 px-3" onClick={() => setIsOpen(false)}>Netherland Dwarf</Link>
                                    <Link to="/gallery" className="block py-2 px-3" onClick={() => setIsOpen(false)}>Gallery</Link>
                                </motion.div>
                            )}
                        </li>
                    </ul>
                </motion.div>
            )}
        </nav>
    );
}

export default Navbar;
