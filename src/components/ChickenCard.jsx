import React from "react";

const ChickenCard = ({ data }) => {
    return (
        <div className="w-10/12 mx-auto sm:p-7 rounded-lg text-center">
            {/* Title */}
            <div
                style={{ fontFamily: "Futura LT Book",}}
                className="sm:px-4 font-extralight sm:w-5/12 sm:mx-auto py-4 bg-[#E0BE9A] text-[#404040] text-xl sm:text-3xl mb-2 rounded-tl-xl rounded-br-xl text-center"
            >
                {data.title}
            </div>


            {/* Top Images */}
            <div className=" grid grid-cols-1 sm:grid-cols-3 justify-center space-y-8 sm:space-y-0 mt-7">
                {data.images.slice(0, 3).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Chicken ${index + 1}`}
                        className="w-5/6 mx-auto object-cover"
                    />
                ))}
            </div>

            {/* Circular Images */}
            <div className=" grid grid-cols-1 sm:grid-cols-3 space-y-8 sm:space-y-0  mt-12">
                {data.images.slice(3, 6).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Feature ${index + 1}`}
                        className="w-5/6 mx-auto  rounded-full  object-cover"
                    />
                ))}
            </div>

            {/* Description */}
            <p
                style={{ fontFamily: "Open Sans" }}
                className="text-[#404040] max-w-5xl mx-auto lg:text-xl mt-16 px-1 sm:px-8">
                {data.description}
            </p>

            {/* Bottom Line */}
            <div className="w-2/5 border-b-2 border-yellow-500 my-7 sm:my-0 sm:mt-14 mx-auto"></div>
        </div>
    );
};

export default ChickenCard;
