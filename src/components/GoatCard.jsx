import React from "react";

const GoatCard = ({ data }) => {
    return (
        <div className="relative max-w-2xl mx-auto sm:p-4 rounded-lg text-center">
            {/* Image Section */}
            <div className="border-4 border-white rounded-lg overflow-hidden relative">
                <img
                    src={data.image}
                    alt="Goat"
                    className="w-full h-52 sm:h-72 sm:w-80 object-cover"
                />

                
            </div>
            {/* Text Box Over Image */}
            <div
                style={{ fontFamily: "Futura LT W01 Medium" }}
                className=" bg-[#D4A373] w-11/12 mx-auto relative bottom-6 bg-opacity-75 text-black text-lg sm:text-lg font-thin p-3 rounded-lg shadow-md">
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
