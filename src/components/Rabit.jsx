import React from "react";

function Rabbit() {
    return (
        <>
            {/* Rabbit Section */}
            <div className="font-[Open_sans] py-5">
                <div className="w-full bg-[#FFF8F1]">
                    <div className="flex flex-col md:flex-row p-2 gap-6 max-w-5xl mx-auto space-y-4 lg:space-y-0 space-x-0 md:space-x-5 md:px-0 py-5">
                        {/* Image with SVG Mask */}
                        <div className=" w-5/6 mx-auto md:w-2/6 flex items-center justify-center">
                            <img
                                src="/Images/Homepage/image1.png"
                                alt="Cute Rabbit"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Text Content */}
                        <div className="text-black bg-[#E0BEA4] rounded-tl-3xl rounded-br-3xl md:w-4/6 text-center md:text-left p-2 flex items-center">
                            <div className="px-1">
                                <p className="text-md lg:text-lg mb-4">
                                    Rabbits make extraordinary pets.They are adorable, intelligent and fun to be around, often leaving you in stitches. They can provide you and your family with companionship for up to 12 years.
                                </p>
                                <p className="text-md lg:text-lg mb-4">
                                    Proper research is highly recommended prior to getting a bun into your home. A bunny is a lot different from a common pet like a dog or cat, so understanding the bunny's need (Social, emotional and care) and being able to provide would be the first step.                            </p>
                                <ul className="text-md list-disc pl-5 lg:text-lg space-y-1">
                                    <li>A bunny should not be adopted on impulse. Take your time to research.</li>
                                    <li>A bunny is not a suitable gift for a young child.</li>
                                    <li>Domesticated rabbits should never be released into the wild.</li>
                                    <li>A bunny should not be picked up by its ears.</li>
                                    <li>Carrots are high in sugar and should be fed in moderation.</li>
                                    <li>Bunnies are social animals and benefit from a friend.</li>
                                    <li>Bunnies are crepuscular and prefer to snooze during the day.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rabbit;
