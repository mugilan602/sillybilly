import React from "react";
import ChickenCard from "../../components/ChickenCard";

function Chicks() {
    const data = [
        {
            title: "Gold / Silver Laced Orpingtons",
            images: [
                "/Images/Chicks/1.2.png",
                "/Images/Chicks/1.1.png",
                "/Images/Chicks/1.3.png",
                "/Images/Chicks/1.4.png",
                "/Images/Chicks/1.5.png",
                "/Images/Chicks/1.6.png",
            ],
            description:
                "Stunning Gold Laced and Silver Laced English Orpingtons! These fluffy and huge birds are such a treat to watch wander around. Their docile and friendly personality is an added bonus. This dual-purpose bird lays medium-sized cream eggs consistently. Around 200-250 per year.",
        },
        {
            title: "Silver Laced Orpingtons",
            images: [
                "/Images/Chicks/2.1.png",
                "/Images/Chicks/2.2.png",
                "/Images/Chicks/2.3.png",
                "/Images/Chicks/2.4.png",
                "/Images/Chicks/2.5.png",
                "/Images/Chicks/2.6.png",
            ],
            description:
                "Ameraucanas are known for their friendly and calm demeanor. They are tailed, muffed and bearded. They stand out with their puffy cheeks and gorgeous blue eggs. Easy going friendly birds that are not difficult to integrate into a flock. Our coop consists of White, Self Blue / Lavender and Blue Black Splash colors. Popular for both their gorgeous medium sized blue eggs and being dual-purpose. They are hardy in cold and heat alike. Lays 200-250 eggs per year",
        },
        {
            title: "Buff Orpingtons",
            images: [
                "/Images/Chicks/3.1.png",
                "/Images/Chicks/3.2.png",
                "/Images/Chicks/3.3.png",
                "/Images/Chicks/3.4.png",
                "/Images/Chicks/3.5.png",
                "/Images/Chicks/3.6.png",
            ],
            description:
                "Copper Marans originated in France and are coveted for their chocolate  brown large eggs. These birds have feathered feet and bright orange eyes. Friendly and must have in any flock. Dual purpose bird who lays between 150-250 eggs per year.",
        },
        {
            title: "Lavender Orpingtons",
            images: [
                "/Images/Chicks/4.1.png",
                "/Images/Chicks/4.2.png",
                "/Images/Chicks/4.3.png",
                "/Images/Chicks/4.4.png",
                "/Images/Chicks/4.5.png",
                "/Images/Chicks/4.6.png",
            ],
            description:
                "Who can resist a fluffy friendly Silkie chicken? Silky soft to the touch, these birds are gentle, docile and tolerant making them an ideal family pet. They do well in heat and cold alike. They lay small light cream eggs. They lay 100-150 eggs per year.",
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
