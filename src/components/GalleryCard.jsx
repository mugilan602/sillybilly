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
                style={{ fontFamily: "Futura LT Book" }}
                className="w-full sm:w-9/12 mx-auto bg-[#E0BE9A] bg-opacity-75 text-[#404040] 
                text-lg font-thin p-3  shadow-md mt-3 sm:relative sm:bottom-6">
                <p className="font-thin">{data.breed}</p>
                {data.pedigreed && <p>Pedigreed</p>}
                {data.purebred && <p>Purebred</p>}
                <p>
                    {data.description.split("\n").map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            <br />
                        </React.Fragment>
                    ))}
                </p>

            </div>
        </div>
    );
};

export default GalleryCard;
