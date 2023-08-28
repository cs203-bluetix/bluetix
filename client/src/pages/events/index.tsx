import LandingLayout from "layouts/LandingLayout";
import { mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event, EventList } from "store/types";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dlaWMiLCJhIjoiY2xsb3kxZzEzMDByMjNxcGkwOXd6Z291ZiJ9.dENhN7jx5klw3OOXofLeMw";
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
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/sweic/cllp8jkl3005i01nze1as5bwm",
      zoom: zoom,
    });
    map.current.on("mouseenter", "seat-dlbdij", (e: any) => {
      console.log(e);
    });
    map.current.on("load", () => {
      map.current.addLayer(
        {
          id: "terrain-data",
          type: "line",
          source: "seat-dlbdij",
          "source-layer": "contour",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ff69b4",
            "line-width": 1,
          },
        },
        "road-label-simple" // Add layer below labels
      );
    });
  });

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
