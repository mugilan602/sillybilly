import React from 'react'
import GoatCard from '../components/GoatCard';
function Gallery() {
    const data = [
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nOrange Buck",
        },
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },
        {
            image: "goat-image.jpg", // Replace with actual image URL
            title: "Nigerian Dwarf Buck",
            description: "Butts in to help!\nFriendly playful guy",
        },
    ]

    return (
        <>
            <div className="bg-[#FAF3E0]">
                <div className="p-6 max-w-5xl mx-auto grid grid-cols-1 space-y-4 sm:grid-cols-3">
                    {data.map((goat, index) => (
                        <GoatCard key={index} data={goat} />
                    ))}
                </div>
            </div>
        </>
    );
}


export default Gallery
