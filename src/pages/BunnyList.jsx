import React from "react";
import BunnyCard from "../components/BunnyCard";
const bunnyData = [
    {
        breed: "Holland Lop",
        parents: "Dad",
        gender: "Female",
        dateOfBirth: "Nov 02, 2024",
        takeHomeDate: "Dec 21, 2024",
        price: "$150",
        images: [
            "/images/bunny1_main.jpg",
            "/images/bunny1_1.jpg",
            "/images/bunny1_2.jpg",
            "/images/bunny1_3.jpg"
        ]
    },
    {
        breed: "Netherland Dwarf",
        parents: "Mom & Dad",
        gender: "Male",
        dateOfBirth: "Oct 15, 2024",
        takeHomeDate: "Dec 05, 2024",
        price: "$180",
        images: [
            "/images/bunny2_main.jpg",
            "/images/bunny2_1.jpg",
            "/images/bunny2_2.jpg",
            "/images/bunny2_3.jpg"
        ]
    }
];

const BunnyList = () => {
    return (
        <div className="p-3 lg:p-6 bg-[#FFF8F1]  min-h-screen">
            {/* Header */}
            <div className="my-4">
                <h2 style={{ fontFamily: "Cookie, cursive" }} className="text-3xl sm:text-4xl text-center mb-5 text-[#A2672D]">
                    Here are a few of our babies currently available for reservation.
                </h2>
                <p style={{ fontFamily: "Futura LT W01 Medium" }} className="text-center text-xl text-gray-700 my-2">
                    ** We have more babies in the nest box, please stop by for updates **
                </p>
            </div>
            {bunnyData.map((bunny, index) => (
                <BunnyCard key={index} data={bunny} index={index} />
            ))}
        </div>
    );
};
export default BunnyList;
