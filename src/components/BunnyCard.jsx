import React from "react";
import { motion } from "framer-motion";

const BunnyCard = ({ data, index }) => {
    return (
        <div className="sm:max-w-3xl sm:mx-auto sm:p-6">
            {/* Ensure flex-row and alternate layout for odd and even indexes */}
            <div className={`flex flex-col sm:flex-row ${index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} ${index % 2 === 0 ? "sm:space-x-12" : "sm:ml-5"} items-center`}>

                {/* Image Section */}
                <motion.div
                    className="relative w-full sm:w-1/2 flex-shrink-0"
                    whileHover={{ scale: 1.5, zIndex: 50 }}
                    transition={{ duration: 0.3 }}
                    style={{ position: "relative", zIndex: 1 }}
                >
                    {/* Wrap Image and Label in the Same Motion.div to Scale Together */}
                    <motion.div className="relative">
                        {/* Sold Badge */}
                        {data.status === "sold" && (
                            <motion.div
                                className="absolute top-2 right-2 bg-blue-400 text-white text-sm font-bold px-3 py-1 rounded"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                SOLD
                            </motion.div>
                        )}

                        <img
                            src={data.images[0]}
                            alt="Bunny"
                            className="w-full h-64 lg:w-full sm:h-80 rounded-lg object-cover border"
                        />
                    </motion.div>
                </motion.div>

                {/* Text Section */}
                <div style={{ fontFamily: "Futura LT Light, sans-serif" }} className="mt-4 sm:mt-0 sm:w-1/2 text-black flex flex-col text-lg sm:text-2xl space-y-3">
                    <p>Breed: {data.breed}</p>
                    <p>Pedigreed Parents: {data.pedigreedParents}</p>
                    <p>Gender: {data.gender}</p>
                    <p>Color: {data.color}</p>
                    <p>Date of Birth: {data.dob}</p>
                    <p>Take home date: {data.takeHomeDate}</p>
                    <p>Price: $ {data.price}</p>
                </div>
            </div>

            {/* Small Image Gallery */}
            <div className="flex flex-col items-center space-y-4 sm:space-y-0 md:flex-row justify-between mt-6">
                {data.images.slice(1).map((img, imgIndex) => (
                    <motion.div
                        key={imgIndex}
                        className="relative"
                        whileHover={{ scale: 1.5, zIndex: 50 }}
                        transition={{ duration: 0.3 }}
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        {/* Sold Badge on Additional Images */}
                        {data.status === "sold" && (
                            <motion.div
                                className="absolute top-2 right-2 bg-blue-400 text-white text-sm font-bold px-3 py-1 rounded"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.3 }}
                            >
                                SOLD
                            </motion.div>
                        )}

                        <motion.img
                            src={img}
                            alt={`Bunny ${imgIndex + 2}`}
                            className="w-11/12 h-64 sm:w-52 sm:h-52 rounded-lg object-cover border"
                        />
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center my-4">
                <hr className="border-t-2 border-yellow-500 w-4/5" />
            </div>
        </div>
    );
};

export default BunnyCard;
