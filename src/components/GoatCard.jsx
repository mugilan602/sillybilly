import React from "react";

const GoatCard = ({ data }) => {
    return (
        <div className="relative w-full mx-auto sm:p-4 rounded-lg text-center">
            {/* Image Section */}
            <div className="border-4 p-1 border-white rounded-lg shadow-2xl overflow-hidden relative">
                <img
                    src={data.image}
                    alt="Goat"
                    className="w-full object-cover"
                />

                
            </div>
            {/* Text Box Over Image */}
            <div
                style={{ fontFamily: "Futura LT Book" }}
                className=" bg-[#E0BE9A] w-full sm:w-9/12 mx-auto mt-2 sm:mt-0 sm:relative sm:bottom-6 bg-opacity-75 text-[#404040] text-lg sm:text-lg font-thin p-3 rounded-lg shadow-md">
                <p className="font-thin">{data.breed}</p>
                {data.pedigreed && <p>Pedigreed</p>}
                {data.purebred && <p>Purebred</p>}
                <p>{data.description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}</p>
            </div>
        </div>
    );
};

export default GoatCard;
