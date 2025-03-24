import React, { useEffect, useState } from 'react';
import GalleryCard from '../../components/GalleryCard';

function Gallery() {
    const [goats, setGoats] = useState([]);
    useEffect(() => {
        async function fetchGoatData() {
            console.log("📡 Fetching goat data from /data/gallery.json...");

            try {
                const response = await fetch("/data/gallery.json");

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Raw JSON data:", data);

                if (!data.pets || typeof data.pets !== "object") {
                    throw new Error("Invalid JSON structure: Expected an object under 'pets'.");
                }

                const formattedData = Object.values(data.pets); // Convert object to array
                console.log("✅ Successfully fetched goat data:", formattedData);
                // setGoats(formattedData);
                const sortedData = formattedData.sort((a, b) => a.order - b.order);
                console.log(sortedData);
                setGoats(sortedData);
            } catch (error) {
                console.error("❌ Error fetching goat data:", error.message);
            }
        }

        fetchGoatData();
    }, []);


    return (
        <div className="p-3 lg:p-6 bg-[#FFF8F1] min-h-screen">
            <div className="my-4">
                <h2 style={{ fontFamily: "Cookie, cursive" }} className="text-3xl sm:text-4xl text-center mb-5 text-[#A2672D] leading-relaxed">
                    Here are some of our adult bunnies
                    <br />
                    and
                    <br />
                    our past babies who have found their families
                </h2>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 space-y-2 sm:grid-cols-3">
                {goats.length > 0 ? (
                    goats.map((goat, index) => <GalleryCard key={index} data={goat} />)
                ) : (
                    <p className="text-center text-gray-500">Loading goats...</p>
                )}
            </div>
        </div>
    );
}

export default Gallery;