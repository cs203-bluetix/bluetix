import React from "react";
import image from "../../../public/images/landingevents.jpg"
import { Event } from "store/types";

type LandingCardProps = {
    event: Event;
};
const LandingCard: React.FC<LandingCardProps> = ({event}) => {
    return (
            <div className="flex items-center bg-white rounded-lg transition-transform duration-500 transform hover:scale-105 ">
                <div className="">
                    <a href="/">
                        <div className="rounded-lg">
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
                        <div className="text-xl ">
                            {event.description}
                        </div>
                    </div>

                </div>

            </div>

    );
};
export default LandingCard;