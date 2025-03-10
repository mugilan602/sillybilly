import React, { useEffect, useState } from "react";
import BunnyCard from "../../components/BunnyCard";

const HollandLop = () => {
    const [bunnies, setBunnies] = useState([]);

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
                setBunnies(data.bunnies);
            } catch (error) {
                console.error("❌ Error fetching Holland Lop data:", error.message);
            }
        }

        fetchBunnyData();
    }, []);

    console.log("🐰 Current bunnies state:", bunnies);

    return (
        <div className="p-3 lg:p-6 bg-[#FFF8F1] min-h-screen">
            {/* Header */}
            <div className="my-4">
                <h2 style={{ fontFamily: "Cookie, cursive" }} className="text-3xl sm:text-4xl text-center mb-5 text-[#A2672D]">
                    Here are a few of our babies currently available for reservation.
                </h2>
                <p style={{ fontFamily: "Futura LT W01 Medium" }} className="text-center text-xl text-gray-700 my-2">
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
