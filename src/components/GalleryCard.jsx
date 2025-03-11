import React from "react";

const GalleryCard = ({ data }) => {
    return (
        <div className="sm:max-w-md mx-auto p-2 sm:p-4 rounded-lg text-center">
            {/* Image Section (Fixed Height) */}
            <div className="border-4 border-white rounded-lg shadow-2xl overflow-hidden h-72 sm:h-80">
                <img
                    src={data.image_url}
                    alt="Goat"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Text Box - Below Image on Mobile, Over Image on Larger Screens */}
            <div
                style={{ fontFamily: "Futura LT W01 Medium" }}
                className="w-full sm:w-10/12 mx-auto bg-[#D4A373] bg-opacity-75 text-black 
                text-lg font-thin p-3 rounded-lg shadow-md mt-3 sm:relative sm:bottom-6">
                <p className="font-thin">{data.breed}</p>
                {data.pedigreed && <p>Pedigreed</p>}
                {data.purebred && <p>Purebred</p>}
                <p>{data.description}</p>
            </div>
        </div>
    );
};

export default GalleryCard;
