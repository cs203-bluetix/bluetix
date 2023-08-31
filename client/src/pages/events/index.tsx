import LandingLayout from "layouts/LandingLayout";
import { mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event, EventList } from "store/types";
import { useEffect, useRef, useState } from "react";

export const getServerSideProps: GetServerSideProps<{
  events: EventList;
}> = async ({ params }) => {
  // const endpoint = `${SERVER_URL}/events`
  // const data = await axios.get(endpoint);
  // zod data validation here
  return { props: { events: mockEvents } };
};

function EventList({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [zoom, setZoom] = useState(9);

  return (
    <LandingLayout>
      {/* <div>
        {events.map((e, idx) => {
          return <EventCard key={idx} event={e} />;
        })}
      </div> */}
      {/* <Map
        mapStyle="mapbox://styles/sweic/cllp6fbsr004t01r4h00t82tr"
        mapboxAccessToken="pk.eyJ1Ijoic3dlaWMiLCJhIjoiY2xsb3kxZzEzMDByMjNxcGkwOXd6Z291ZiJ9.dENhN7jx5klw3OOXofLeMw"
      /> */}
      <div className="h-[800px] w-full">
        <div
          ref={mapContainer}
          className="map-container"
          style={{ height: "100%" }}
        />
      </div>
    </LandingLayout>
  );
}

export default EventList;

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div>
      id: {event.id}, name: {event.name}
    </div>
  );
};
