import React from "react";
import ChickenCard from "../../components/ChickenCard";

function Chicks() {
    const data = [
        {
            title: "Gold / Silver Laced Orpingtons",
            images: [
                "image1.jpg",
                "image2.jpg",
                "image3.jpg",
                "image4.jpg",
                "image5.jpg",
                "image6.jpg",
            ],
            description:
                "Stunning Gold Laced and Silver Laced English Orpingtons! These fluffy and huge birds are such a treat to watch wander around. Their docile and friendly personality is an added bonus. This dual-purpose bird lays medium-sized cream eggs consistently. Around 200-250 per year.",
        },
        {
            title: "Silver Laced Orpingtons",
            images: [
                "image7.jpg",
                "image8.jpg",
                "image9.jpg",
                "image10.jpg",
                "image11.jpg",
                "image12.jpg",
            ],
            description:
                "Silver Laced Orpingtons are elegant and large birds with a calm demeanor. These birds are excellent layers, producing a steady supply of medium-sized cream eggs. Ideal for backyard farms and homesteads.",
        },
        {
            title: "Buff Orpingtons",
            images: [
                "image13.jpg",
                "image14.jpg",
                "image15.jpg",
                "image16.jpg",
                "image17.jpg",
                "image18.jpg",
            ],
            description:
                "Buff Orpingtons are known for their golden feathers and friendly nature. They are great family birds that lay consistent medium-sized eggs and are very easy to raise.",
        },
        {
            title: "Lavender Orpingtons",
            images: [
                "image19.jpg",
                "image20.jpg",
                "image21.jpg",
                "image22.jpg",
                "image23.jpg",
                "image24.jpg",
            ],
            description:
                "Lavender Orpingtons have a stunning soft gray appearance and an affectionate personality. They are prolific layers, producing around 200-250 eggs per year.",
        },
    ];

    return (
        <>
            <div className="p-3 lg:p-6  bg-[#FFF8F1]  min-h-screen">
                <div className="my-4">
                    <h2
                        style={{ fontFamily: "Cookie, cursive" }}
                        className="text-3xl lg:text-4xl text-center lg:mb-5 text-[#A2672D]"
                    >
                        Listed below are the chicken breeds we raise here in our farm.
                    </h2>

                    <p
                        style={{ fontFamily: "Futura LT W01 Medium" }}
                        className="text-center text-lg lg:text-xl text-gray-700 lg:mt-12"
                    >
                        ** We have hatching eggs, day old & month old chicks available. Please send us an <br />
                        email with your requirement **
                    </p>

                    <ul className="text-center text-lg lg:text-xl text-gray-700 space-y-1 lg:mt-8 list-disc list-inside">
                        <li style={{ fontFamily: "Futura LT W01 Medium" }}>
                            Fertility is always tested prior to sale of hatching eggs
                        </li>
                        <li style={{ fontFamily: "Futura LT W01 Medium" }}>
                            No guarantee on fertility of shipped hatching eggs
                        </li>
                        <li style={{ fontFamily: "Futura LT W01 Medium" }}>
                            Chicks are sold straight run
                        </li>
                    </ul>
                </div>


                <div className="space-y-10 sm:p-6">
                    {data.map((chicken, index) => (
                        <ChickenCard key={index} data={chicken} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Chicks;
