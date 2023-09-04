import React from "react";
import image from "../../mock/images/image.jpg"
import { mockEvents } from "mock/events";
import { Event } from "store/types";

type LandingCardProps = {
    // isActive: boolean;
    // className: string;
    event: Event;
    // Add the product ID prop to identify the specific product
};
const LandingCard: React.FC<LandingCardProps> = ({event}) => {
    return (
        // <div className={`landing-card ${isActive ? 'opacity-100' : 'opacity-10'} transition-opacity duration-500 `}>
            <div className="flex items-center">
                <div className="border border-1 border-black rounded-lg pb-5">
                    <a href="/">
                        <div className="">
                            <img
                                src={image.src}
                                className="w-full h-full rounded-lg"
                                alt=""
                            />
                        </div>
                    </a>
                    <div className="justify-items-center px-5">
                        <div className="text-xl font-semibold ">
                            {event.name}
                        </div>
                        <div className="text-xl font-semibold">
                            {event.eventDetails}
                        </div>
                    </div>

                </div>

            </div>
        // </div>

    );
};
export default LandingCard;