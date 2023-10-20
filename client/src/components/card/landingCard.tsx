import React from "react";
import image from "../../../public/images/landingevents.jpg";
import { Event } from "store/types";
import { Button, Paper, Title, Text, Group, Card } from "@mantine/core";
import { CDN_API_URL } from "utils/globals";

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
        style={{
          backgroundImage: `url(${CDN_API_URL}/events/${event.image_url})`,
        }}
        className="flex h-[380px] transform flex-col items-start justify-between bg-cover bg-center transition-transform duration-500 hover:scale-105"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="z-1 relative flex h-full flex-col justify-between">
          <div className="mt-2 mt-auto text-4xl font-extrabold text-white">
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
