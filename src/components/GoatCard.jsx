import React from "react";

const GoatCard = ({ data }) => {
    return (
        <div className="max-w-md mx-auto sm:p-4 rounded-lg text-center">
            {/* Image Section */}
            <div className="border-4 border-white rounded-lg overflow-hidden">
                <img
                    src={data.image}
                    alt="Goat"
                    className="w-full h-52 sm:h-64 object-cover"
                />
            </div>

            {/* Text Box */}
            <div
                style={{ fontFamily: "Futura LT W01 Medium", }}

                className="bg-[#D4A373] text-black text-lg sm:text-lg font-thin p-4 rounded-lg mt-4 sm:mt-[-20px] mx-auto w-4/5 shadow-md">
                <p>{data.title}</p>
                <p>{data.description}</p>
            </div>
        </div>
    );
};

export default GoatCard;
