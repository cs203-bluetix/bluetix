import React from "react";
import image from "../../mock/images/image.jpg"
import { mockEvents } from "mock/events";
import { Event } from "store/types";

type LandingCardProps = {
    event: Event;
};
const LandingCard: React.FC<LandingCardProps> = ({event}) => {
    return (
            <div className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 border border-2 border-black rounded-lg">
                <div className="">
                    <a href="/">
                        <div className="">
                            <img
                                src={image.src}
                                className="rounded-t-lg"
                                alt=""
                            />
                        </div>
                    </a>
                    <div className="justify-items-center text-center py-2">
                        <div className="text-2xl font-semibold ">
                            {event.name}
                        </div>
                        <div className="text-2xl ">
                            {event.description}
                        </div>
                    </div>

                </div>

            </div>

    );
};
export default LandingCard;