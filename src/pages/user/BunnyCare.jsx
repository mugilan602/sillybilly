import React from 'react';

function BunnyCare() {
    const beddings = [
        {
            title: "Aspen Wood Shavings:",
            description:
                "Aspen wood shaving is a type of wood shaving litter that is safe for rabbits. It usually does a very good job at odor control. However, it’s not the most absorptive litter, which means you’ll have to use a lot of it. Aspen shavings can also have a strong scent, which can deter some rabbits from using the litter box. Pine and Cedar shavings are not safe and hence best to avoid. If you have to use Pine, you can cover it up with a thick layer or straw or shredded paper. Alternatively, horse bedding can also be used as it's absorbent, natural, and biodegradable.",
            image: "/Images/BunnyCare/aspen-wood.png",
        },
        {
            title: "Paper Based Pelleted Litter:",
            description:
                "These are typically made of 100% recycled paper that is compressed into absorptive pellets. They are great at absorbing rabbit urine, so you don’t need to use as much on a daily basis. It can absorb up to 400% more than the traditional clay or wood-based litters. Pellets are so absorbent that they do not break apart when wet or cake to the bottom of the litter pan. This leaves a much healthier environment for your rabbits and clean up is much easier.",
            image: "/Images/BunnyCare/paper-pellets.png",
        },
        {
            title: "Paper Based Litter:",
            description:
                "Yesterday’s newspaper or the most commonly sold paper-based litter from pet stores are good options. Rabbits are natural foragers and may nibble on their bedding. Choosing a bedding made from natural materials will ensure that your rabbit is not exposed to any harmful chemicals or toxins. It is cheaper and also promotes a more natural and eco-friendly living environment for your pet. I generally don’t recommend shredded newspaper because it doesn’t absorb rabbit urine easily. Last resort - Hay can be used but it is not absorbent and calls for a frequent clean up.",
            image: "/Images/BunnyCare/paper-based.png",
        },
    ];
    return (
        <>
            <div className="relative lg:bg-[#E0BE9A] w-full flex flex-col items-center justify-end">
                {/* Background Image for Large Screens */}
                <div
                    className="hidden lg:block lg:mb-20 absolute inset-0 bg-cover bg-center h-96 bg-no-repeat"
                    style={{ backgroundImage: "url('/Images/BunnyCare/bunnyCareBG.png')" }}
                ></div>

                {/* Separate Image for Mobile */}
                <div className="lg:hidden w-full">
                    <img
                        src="/Images/BunnyCare/bunnyCareBG.png"
                        alt="Bunny Care Background"
                        className="w-full h-40 object-cover"
                    />
                </div>

                {/* Content Box */}
                <div className="relative mt-5 lg:mt-36 z-10 max-w-4xl w-11/12 bg-white bg-opacity-90 p-2 sm:p-10 text-center lg:bottom-0">
                    <h2 className="text-2xl font-poppins sm:text-4xl font-light text-black">
                        Care for your new Bunny
                    </h2>
                    <p className="mt-4 text-black font-[Open_sans] lg:w-5/6 mx-auto text-sm sm:text-lg">
                        Are you thinking about adding a pet bunny to your life? Glad you are here!
                        Browse around the page and take your time to read this guide in its entirety.
                        This page contains a list of items you'll need to have for the bunny, their diet plan,
                        and the proper information to care for your new pal.
                    </p>

                    {/* Decorative Bunny Icon & Quote */}
                    <div className="flex flex-col sm:flex-row sm:space-x-5 justify-center items-center mt-6 text-center sm:text-left">
                        <p className="font-[Sail] text-lg sm:ml-4 sm:text-3xl text-gray-500 font-semibold sm:order-2 sm:mr-4">
                            A healthy bunny is a happy bunny
                        </p>
                        <img src="/Images/BunnyCare/Nose.png" alt="Bunny Nose" className="w-12 h-12 rounded-full sm:order-1 sm:w-16 sm:h-16 mt-2 sm:mt-0" />
                    </div>

                </div>
            </div>


            <div className="max-w-5xl py-8  mx-auto flex flex-col lg:flex-row items-center lg:items-stretch space-y-6 lg:space-y-0 lg:space-x-10 px-4 lg:px-6 lg:py-16">
                {/* Image Section */}
                <div className="w-full flex items-center bg-white lg:w-1/2">
                    <img
                        src="/Images/BunnyCare/bunnyShoppingList.png"
                        alt="Bunny Shopping List"
                        className="w-full shadow-md"
                    />
                </div>
                {/* Shopping List Section */}
                <div className="w-full lg:w-1/2">
                    <h2 className="font-[Inter] tracking-widest  lg:tracking-[7px] text-lg lg:text-xl font-extrabold text-center text-black uppercase mb-4">
                        Bunny Shopping List
                    </h2>
                    <ul className="font-[Open_sans] text-md list-disc pl-5 text-black">
                        <li>Enclosure / Cage / Exercise pen - Bigger & taller the better</li>
                        <li>Towel or blanket for the base</li>
                        <li>Two heavy ceramic or wide base bowls for water and Pellets</li>
                        <li>Quality Hay and Pellets</li>
                        <li>Hay Stacker</li>
                        <li>Litter Box</li>
                        <li>Litter material - Horse pellets / Shredded paper / Aspen shaving</li>
                        <li>Toys (Tunnel, Toilet paper roll, hay ball, Heavy Plastic toys)</li>
                        <li>Chew toys like cardboard, apple tree twigs, Aspen branches, Alfalfa cubes, untreated wood, toilet paper rolls, and pinecones</li>
                        <li>Hiding house - They are prey animals in the wild so naturally they love to hide</li>
                        <li>Brush / Comb</li>
                        <li>Nail Clipper</li>
                    </ul>
                </div>
            </div>


            <div className="max-w-5xl mx-auto lg:items-stretch flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-10 px-4 lg:p-6">
                {/* Health Information Section */}
                <div className="w-full lg:w-2/3">
                    <h2 className="font-[Inter] tracking-widest text-center lg:tracking-[7px] lg:text-xl text-lg  font-extrabold text-black uppercase mb-4">
                        To Keep The Bunny Healthy
                    </h2>
                    <ul className="font-[Open_sans] text-md list-disc pl-5 text-black">
                        <li>A proper balanced diet is crucial for the rabbit's health. It should consist of copious hay, fresh vegetables, and a measured amount of high-quality pellets.</li>
                        <li>Rabbits need to have their body weights equivalent in hay every day. The high fiber content helps keep their digestive tracts moving and to keep their ever-growing teeth ground down.</li>
                        <li>The most common rabbit health problems are gastrointestinal issues and dental disease. Insufficient hay is often the key contributing factor in each of these widespread problems. Feeding 80% hay is preventative health care.</li>
                        <li>Timothy hay for adult rabbits and Alfalfa hay for baby rabbits under 6 months.</li>
                        <li>No fruits, veggies, or treats until after 6 months of age.</li>
                        <li>Rabbit pellets provide the needed vitamins, calcium, and proteins. 1/4 cup per day is recommended.</li>
                        <li><strong>Rabbits should not be given excess carrots.</strong> No matter what cartoons may tell you, rabbits can get diabetes from eating them in large portions. Leafy greens, fruits, and veggies in moderation help to keep their diet balanced.</li>
                        <li>Finally, an unlimited supply of clean, fresh water should be available 24/7.</li>
                    </ul>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-3/6">
                    <img
                        src="/Images/BunnyCare/bunnyDiet.png"
                        alt="Bunny Diet Chart"
                        className="w-full h-full rounded-lg shadow-md"
                    />
                </div>
            </div >
            <div className="max-w-5xl py-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center space-y-6 lg:space-y-0 lg:space-x-6 px-3 lg:p-6">
                {/* Safe Fruits */}
                <div className="text-white rounded-lg w-full flex flex-col h-full">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest  text-lg  lg:text-xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        Safe Fruits
                    </h2>
                    <div className="bg-[#E0BE9A82] p-6 rounded-b-4xl text-black flex flex-col h-full relative">
                        <ul className="font-[Open_sans]  text-md lg:text-lg  list-disc pl-5 flex-grow">
                            <li>Bananas</li>
                            <li>Apples (Seeds removed)</li>
                            <li>Strawberry</li>
                            <li>Strawberry tops</li>
                            <li>Blueberry</li>
                            <li>Blackberry</li>
                            <li>Raspberry</li>
                            <li>Cranberry</li>
                            <li>Pineapple</li>
                            <li>Papaya</li>
                            <li>Pears</li>
                            <li>Plum</li>
                            <li>Cherry</li>
                            <li>Grapes</li>
                            <li>Melons</li>
                            <li>Apricot</li>
                        </ul>
                        <img src="/Images/BunnyCare/strictlyNo.png" alt="Strictly No" className="absolute bottom-4 right-4 rounded-full w-24 h-24" />
                    </div>
                </div>

                {/* Safe Greens */}
                <div className="text-white rounded-lg w-full flex flex-col h-full">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest  text-lg  lg:text-xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        Safe Greens
                    </h2>
                    <div className="bg-[#E0BE9A] p-6 rounded-b-3xl text-black flex flex-col h-full relative">
                        <ul className="font-[Open_sans] text-md lg:text-lg list-disc pl-5 flex-grow">
                            <li>Romaine Lettuce</li>
                            <li>Coriander</li>
                            <li>Cilantro</li>
                            <li>Mint</li>
                            <li>Kale</li>
                            <li>Bok Choy</li>
                            <li>Cucumber</li>
                            <li>Zucchini</li>
                            <li>Pumpkin</li>
                            <li>Squash</li>
                            <li>Dandelion</li>
                            <li>Basil</li>
                            <li>Parsley</li>
                            <li>Bell Pepper</li>
                            <li>Wheat Grass</li>
                            <li>Carrot Tops</li>
                            <li>Spinach</li>
                        </ul>
                        <img src="/Images/BunnyCare/strictlyNo.png" alt="Strictly No" className="absolute bottom-4 right-4 rounded-full w-24 h-24" />
                    </div>
                </div>

                {/* Strictly No */}
                <div className="text-white rounded-lg w-full flex flex-col h-full">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest  text-lg lg:text-xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        Strictly No
                    </h2>
                    <div className="bg-[#E0BE9A82] p-6 rounded-b-3xl text-black flex flex-col h-full relative">
                        <ul className="font-[Open_sans] text-md lg:text-lg list-disc pl-5 flex-grow">
                            <li>Iceberg lettuce</li>
                            <li>Excess Carrots</li>
                            <li>Rhubarb</li>
                            <li>Raw Onions, Garlic</li>
                            <li>Leeks</li>
                            <li>Cabbage</li>
                            <li>Cauliflower</li>
                            <li>Beans</li>
                            <li>Avocado</li>
                            <li>Fruit Seeds</li>
                            <li>Chocolate</li>
                            <li>Dairy, Egg and Meat</li>
                            <li>Bread</li>
                            <li>Chips</li>
                            <li>Nuts</li>
                            <li>Pasta</li>
                        </ul>
                        <img src="/Images/BunnyCare/strictlyNo.png" alt="Strictly No" className="absolute bottom-4 right-4 rounded-full w-24 h-24" />
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row justify-center items-start space-y-6 lg:space-y-0 lg:space-x-6 px-3 lg:p-6">
                {/* Cool Bunny Facts Image */}
                <div className="w-full lg:w-2/4 flex justify-center">
                    <img
                        src="/Images/BunnyCare/coolBunnyFacts.png"
                        alt="Cool Bunny Facts"
                        className="w-full rounded-lg shadow-md"
                    />
                </div>

                {/* Bunny Happiness Information */}
                <div className="w-full lg:w-2/3 bg-white">
                    <h2 className="font-[Inter] text-center tracking-widest lg:tracking-[7px] text-lg lg:text-xl  font-extrabold text-black uppercase mb-4">
                        To keep the bunny hAPPY
                    </h2>
                    <ul className="font-[Open_sans] list-disc pl-5 text-black">
                        <li>Rabbits can live between 8-10 years.</li>
                        <li>
                            Rabbits are very social and enjoy having another rabbit friend to play and cuddle with.
                            Chances of bonding 2 bunnies are greater if done early in their life.
                        </li>
                        <li>
                            If you have multiple bunnies, ensure that they like each other before keeping them in the same enclosure,
                            as they can get into a nasty fight.
                        </li>
                        <li>Rabbits enjoy attention & love interacting with their owners.</li>
                        <li>Have plenty of toys for stimulation and to prevent boredom.</li>
                        <li>Rabbits love hiding places. Sometimes, they just need a space to take a breather.</li>
                        <li>
                            Some rabbits do not enjoy being picked up. Give them time to approach you and get down to the bunny's level.
                        </li>
                        <li>Rabbits need to have their nails trimmed every 2 months. YouTube is a great resource on how to do it yourself.</li>
                        <li>
                            Rabbits startle easily and can die of fright. If you are planning to cause a lot of noise (e.g., a party, fireworks),
                            keep the bunny away from the noise.
                        </li>
                        <li>Rabbits are very sensitive to heat. They cannot be in direct sunlight and will die of heat stroke.</li>
                        <li>
                            Rabbits need at least 4 hours of exercise a day; they cannot be at their best health if kept in cramped cages all day.
                        </li>
                        <li>Bunnies will chew on threads and wires. Keep them out of your bunny’s reach!</li>
                        <li>
                            Your bunny licking you is a sign of love. Zoomies are when they run super-fast. Binkies are when they jump and kick
                            their feet out. These mean your bunny is excited and happy. A bunny flops when content and relaxed, laying stretched
                            out on their side.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-5xl py-8 mx-auto px-3 lg:p-6">
                <div className="text-white">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest  text-lg  lg:text-2xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        Periodic Care
                    </h2>
                </div>
                <div className="bg-[#E2C19B] p-3 lg:px-9 lg:py-6 rounded-b-4xl not-only:text-black">
                    <ul className="font-[open_sans] list-disc pl-4 leading-[1.35] text-md lg:text-lg">
                        <li>There is no approved/licensed rabies vaccine for rabbits. So vaccination is not mandated for bunnies in Canada.</li>
                        <li>Bunnies should be dewormed if you notice a weight loss, excess scratching, or fur loss.</li>
                        <li>Nails need to be trimmed every 2 months - Check a YouTube tutorial and follow it!</li>
                        <li>Long-haired bunnies should be brushed every week or two to remove loose fur, which could otherwise get stuck in their intestines.</li>
                        <li>No bunny baths, but spot cleaning is recommended if they get soiled.</li>
                        <li>Feeding plenty of hay and providing apple tree twigs for chewing will help to prevent their teeth from growing.</li>
                        <li>
                            Some red alert signs to watch for are grinding sound of teeth, messy poopy back, noticeable weight loss, scratching excessively, increased water consumption, and lethargy.
                            Bunnies are excellent at hiding their sickness, so if you notice any of the above, a vet visit is immediately needed.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="hidden sm:block max-w-5xl mx-auto p-6">
                <img src="/Images/BunnyCare/hay.png" alt="" />
            </div>
            <div className="max-w-5xl mx-auto px-3 lg:p-6">
                <div className="bg-[#A36D3A] lg:w-4/6 rounded-tl-4xl rounded-br-4xl mx-auto text-white rounded-t-lg shadow-md">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest lg:text-2xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase px-4 py-3">
                        ADDITIONAL CAGE SET UP IDEAS
                    </h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-8  rounded-lg text-black">
                    <img className='rounded-xl' src="/Images/BunnyCare/cage1.png" alt="" />
                    <img className='rounded-xl' src="/Images/BunnyCare/cage2.png" alt="" />
                    <img className='rounded-xl' src="/Images/BunnyCare/cage3.png" alt="" />
                    <img className='rounded-xl' src="/Images/BunnyCare/cage4.png" alt="" />
                    <img className='rounded-xl' src="/Images/BunnyCare/cage5.png" alt="" />
                    <img className='rounded-xl' src="/Images/BunnyCare/cage6.png" alt="" />
                </div>
            </div>
            <div className="max-w-5xl py-8 mx-auto px-3 lg:p-6">
                <div className="bg-[#A36D3A] rounded-tl-4xl rounded-b-4xl text-white rounded-t-lg shadow-md">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest  text-lg  lg:text-2xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        LITTER BOX TRAINING
                    </h2>
                </div>
                <div className="font-[Open_sans] lg:text-lg leading-[1.35] bg-[#EBD5B3] p-3 lg:px-6 lg:py-4 rounded-lg shadow-md text-black max-w-5xl mx-auto">

                    <h3 className="text-md lg:text-lg font-semibold mb-2">Before you begin litter training your pet rabbit, there are a few things to keep in mind:</h3>
                    <ul className="text-md list-disc pl-4 lg:pl-5 lg:space-y-1">
                        <li>By nature, most rabbits will choose to relieve themselves in the same place.</li>
                        <li>They pee and poop to mark their territory. Spaying and neutering greatly reduces this urge and therefore helps with litter training.</li>
                        <li>At times a spayed/neutered rabbit will still drop dry poops, but it will be much less than before.</li>
                        <li>Rabbits are seriously poop machines and can even poop in their sleep!</li>
                    </ul>

                    <h3 className="text-md lg:text-lg font-semibold mt-4 mb-2">How to train your rabbit:</h3>
                    <ul className="text-md list-disc pl-4 lg:pl-5 lg:space-y-1">
                        <li>
                            <strong>Set up a litter box:</strong> Use a spacious shallow box and fill it with a layer of litter about two to three inches deep.
                            Add a thick layer of hay at one end of the litter box or in a hay feeder hung directly above the litter box so your rabbit
                            can munch while still in the box. Rabbits like to eat and go to the bathroom at the same time.
                        </li>
                        <li>
                            <strong>A COMMON MISTAKE</strong> is spreading a layer of litter/bedding material along your rabbit’s enclosure floor.
                            <strong>Do NOT do this!</strong> Your bunny will be confused where to go to the bathroom! Litter goes in the litter box only.
                        </li>
                        <li>
                            <strong>Identify their preferred toileting area:</strong> Rabbits often go to the bathroom in a corner.
                            Identify the corner and set up the litter box in that corner. Bunny chooses, not you!
                        </li>
                        <li>
                            <strong>Start by adding urine-soaked bedding or poop</strong> to the litter box to show them it’s the toilet.
                            Until your bunny consistently uses the litter box, don't completely clean all of the soiled litter each day.
                            Leave a small amount of residue to help them associate the litter box with their scent.
                        </li>
                        <li>
                            <strong>Reduce their space:</strong> Keep your rabbit in their housing area during training until they use the litter box reliably.
                            Once the rabbit is consistent, you can increase their living space.
                        </li>
                        <li>
                            <strong>Reward your rabbit:</strong> Offer a treat when your rabbit uses the litter box.
                        </li>
                        <li>
                            <strong>Clean accidents:</strong> Use a pet urine cleaner or white vinegar mixed with water to clean up messes.
                        </li>
                        <li>
                            <strong>Large enclosures</strong> with multiple levels will need more than one litter box.
                        </li>
                        <li>
                            <strong>Be patient:</strong> It can take some time for your rabbit to learn new habits.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="max-w-5xl px-3 lg:p-6 text-black mx-auto">
                <div className="bg-[#A36D3A]  rounded-tl-3xl rounded-br-3xl  text-white rounded-t-lg shadow-md">
                    <h2 className="bg-[#A2672D] font-[Poppins] mb-5 tracking-widest px-2 text-lg lg:text-2xl text-center font-semibold rounded-tl-3xl rounded-br-3xl uppercase py-3">
                        BEST LITTER BOX BEDDING
                    </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {beddings.map((bedding, index) => (
                        <div key={index} className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md">
                            <img
                                src={bedding.image}
                                alt={bedding.title}
                                className="w-full h-56 object-cover rounded-md mb-3"
                            />
                            <h3 className="font-bold text-lg">{bedding.title}</h3>
                            <p className="font-[open_sans] text-md leading-[1.35]">{bedding.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default BunnyCare;
