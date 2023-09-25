import React from "react";
import image from "../../mock/images/image.jpg"
import { Event } from "store/types";
import { Button, Paper, Title, Text, Group, Card} from "@mantine/core";

type LandingCardProps = {
    event: Event;
};

const LandingCard: React.FC<LandingCardProps> = ({ event }) => {
    return (

        <a href="/events">
        <Card
            shadow="md"
            p="xl"
            my="lg"
            radius="md"
            style={{ backgroundImage: `url(${'images/event.jpeg'})` }}
            className="h-[400px] flex flex-col justify-between items-start bg-cover bg-center transition-transform duration-500 transform hover:scale-105"
        >
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gradient-to-b from-transparent via-transparent to-black" />
            <div className="h-full relative flex flex-col justify-between z-1">

                <div className="mt-2 font-extrabold text-white text-4xl mt-auto">
                    {event.name}
                </div>
            </div>
            <div></div>
        </Card>
        </a>
        // <div className="flex items-center bg-white border border-2 border-black rounded-lg transition-transform duration-500 transform hover:scale-105 shadow-lg">
        //     <div className="">
        //         <a href="/">
        //             <div className="rounded-t-lg">
        //                 <img
        //                     src={image.src}
        //                     className="rounded-t-lg"
        //                     alt=""
        //                 />
        //             </div>
        //         </a>
        //         <div className="justify-items-center text-center py-2">
        //             <div className="text-2xl font-semibold ">
        //                 {event.name}
        //             </div>
        //             <div className="text-xl ">
        //                 {event.description}
        //             </div>
        //         </div>

        //     </div>

        // </div>

    );
};
export default LandingCard;