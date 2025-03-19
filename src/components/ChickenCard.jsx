import React from "react";

const ChickenCard = ({ data }) => {
    return (
        <div className="max-w-5xl mx-auto sm:p-6 rounded-lg text-center">
            {/* Title */}
            <div
                style={{ fontFamily: "Futura LT W01 Medium",}}
                className="sm:px-7 font-extralight sm:w-2/4 sm:mx-auto py-2 bg-[#D4A373] text-black text-xl sm:text-3xl mb-2 rounded-lg text-center"
            >
                {data.title}
            </div>


            {/* Top Images */}
            <div className="flex flex-col sm:flex-row justify-center space-y-8 sm:space-y-0 mt-4">
                {data.images.slice(0, 3).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Chicken ${index + 1}`}
                        className="h-80 w-5/6 mx-auto sm:w-72 sm:h-80 object-cover"
                    />
                ))}
            </div>

            {/* Circular Images */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-8 sm:space-y-0 sm:space-x-10 mt-8">
                {data.images.slice(3, 6).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Feature ${index + 1}`}
                        className="h-52 w-52 sm:w-72 sm:h-72 rounded-full object-cover border"
                    />
                ))}
            </div>

            {/* Description */}
            <p
                style={{ fontFamily: "Open Sans" }}
                className="text-black max-w-4xl mx-auto lg:text-lg mt-8 px-1 sm:px-8">
                {data.description}
            </p>

            {/* Bottom Line */}
            <div className="w-2/5 border-b-2 border-[#D4A373] mt-10 mx-auto"></div>
        </div>
    );
};

export default ChickenCard;
