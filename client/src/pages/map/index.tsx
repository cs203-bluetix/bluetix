"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import React, { useEffect } from "react";
import SeatsView from "components/Map/SeatsView";
import { SeatInfo } from "store/types";
import { mockSeats } from "mock/seats";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useStore } from "store/seat";
const LeafletMap = dynamic(() => import("../../components/Map/LeafletMap"), {
  ssr: false,
});

export const getServerSideProps: GetServerSideProps<{
  seats: SeatInfo[];
}> = async ({ params }) => {
  // const endpoint = `${SERVER_URL}/events`
  // const data = await axios.get(endpoint);
  // zod data validation here
  return { props: { seats: mockSeats } };
};

function Leaf({
  seats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const store = useStore();
  useEffect(() => {
    store.setSeats(seats);
  }, [seats]);

  return (
    <div className="flex h-screen w-full">
      <div className="w-full">
        <SeatsView />
      </div>
      <div className="h-full w-full">
        <LeafletMap />
      </div>
    </div>
  );
}

export default Leaf;
