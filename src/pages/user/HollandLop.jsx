import React, { useEffect, useState } from "react";
import BunnyCard from "../../components/BunnyCard";

const HollandLop = () => {
    const [bunnies, setBunnies] = useState([]);
    const [isSoldOut, setIsSoldOut] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    useEffect(() => {
        async function fetchBunnyData() {
            console.log("📡 Fetching Holland Lop data from /data/breeds/holland_lop.json...");

            try {
                const response = await fetch("/data/breeds/holland_lop.json");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.bunnies || !Array.isArray(data.bunnies)) {
                    throw new Error("Invalid JSON structure: Missing 'bunnies' array.");
                }

                console.log("✅ Successfully fetched bunny data:", data.bunnies);
                // setBunnies(data.bunnies);
                const bunnies = data.bunnies;
                const sortedBunnies = bunnies.sort((a,b)=> a.order-b.order)
                console.log(sortedBunnies);
                setBunnies(sortedBunnies);
                // Check if all bunnies are sold
                const allSold = data.bunnies.every((bunny) => bunny.status === "sold");
                setIsSoldOut(allSold);
            } catch (error) {
                console.error("❌ Error fetching Holland Lop data:", error.message);
            }
        }

        fetchBunnyData();
    }, []);

    console.log("🐰 Current bunnies state:", bunnies);

    return (
        <div className="relative p-3 lg:p-6 bg-[#FFF8F1] min-h-screen">
            {/* Sold Out Overlay */}
            {isSoldOut && (
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-6xl sm:text-7xl font-bold uppercase rotate-[-15deg] px-6 py-2 opacity-90 z-10">
                    **SOLD OUT**
                </div>
            )}

            {/* Header */}
            <div className="my-4">
                <h2 style={{ fontFamily: "Cookie, cursive" }} className="text-3xl sm:text-5xl text-center mb-8 text-[#A2672D]">
                    Here are a few of our babies currently available for reservation.
                </h2>
                <p style={{ fontFamily: "Futura LT W01 Medium" }} className="text-center text-2xl text-[#404040]  mb-8">
                    ** We have more babies in the nest box, please stop by for updates **
                </p>
            </div>

            {/* Bunny Cards */}
            {bunnies.length > 0 ? (
                bunnies.map((bunny, index) => <BunnyCard key={bunny.id} data={bunny} index={index} />)
            ) : (
                <p className="text-center text-gray-500">Loading bunnies...</p>
            )}
        </div>
    );
};

export default HollandLop;
