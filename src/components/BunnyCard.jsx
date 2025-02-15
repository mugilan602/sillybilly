import React from "react";
import { motion } from "framer-motion";

const BunnyCard = ({ data, index }) => {
    return (
        <div className="sm:max-w-3xl sm:mx-auto sm:p-6">
            {/* Ensure flex-row and alternate layout for odd and even indexes */}
            <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} ${index % 2 === 0 ? "sm:space-x-12" : "sm:ml-5"} items-center`}>

                {/* Image Section */}
                <motion.div
                    className="w-full sm:w-1/2 flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={data.images[0]}
                        alt="Bunny"
                        className="w-full h-64 lg:w-full sm:h-80 rounded-lg object-cover border"
                    />
                </motion.div>

                {/* Text Section */}
                <div style={{ fontFamily: "Futura LT Light, sans-serif" }} className="mt-4 sm:mt-0 sm:w-1/2 text-black flex flex-col text-lg sm:text-2xl space-y-4">
                    <p>Breed: {data.breed}</p>
                    <p>Pedigreed Parents:{data.parents}</p>
                    <p>Gender: {data.gender}</p>
                    <p>Date of Birth: {data.dateOfBirth}</p>
                    <p>Take home date:{data.takeHomeDate}</p>
                    <p>Price:   {data.price}</p>
                </div>
            </div>

            {/* Small Image Gallery */}
            <div className="flex flex-col items-center space-y-4 sm:space-y-0 md:flex-row justify-between mt-6">
                {data.images.slice(1).map((img, imgIndex) => (
                    <motion.img
                        key={imgIndex}
                        src={img}
                        alt={`Bunny ${imgIndex + 2}`}
                        className="w-11/12 h-64 sm:w-52 sm:h-52 rounded-lg object-cover border"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                    />
                ))}
            </div>
            <div className="flex justify-center my-4">
                <hr className="border-t-2 border-yellow-500 w-4/5" />
            </div>

        </div>
    );
};

export default BunnyCard;
