"use client";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

import React, { useEffect } from "react";
import SeatsView from "components/Seats/SeatsView";
import { EventSession, Role, SeatInfo } from "store/types";
import { mockSeats } from "mock/seats";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useStore } from "store/seat";
import LandingLayout from "layouts/LandingLayout";
import { mockEventSession } from "mock/session";
import Loading from "components/Suspense/Loading";
const LeafletMap = dynamic(() => import("../../components/Seats/LeafletMap"), {
  ssr: false,
});


export const getServerSideProps: GetServerSideProps<{
  eventSession: EventSession;
}> = async ({ params }) => {
  // const endpoint = `${SERVER_URL}/events`
  // const data = await axios.get(endpoint);
  // zod data validation here
  return { props: { eventSession: mockEventSession } };
};

function Leaf({
  eventSession,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const store = useStore();
  useEffect(() => {
    store.setEventSession(eventSession);
  }, [eventSession]);
  
  return (
    <LandingLayout
      permissions={[Role.USER, Role.ADMIN]}
      title="Ticket Seating"
      withNavbar
    >
      {store.eventSession ? (
        <div className="flex h-[calc(100vh-68px)] w-full">
          <div className="w-full min-w-[300px] max-w-[664px]">
            <SeatsView />
          </div>
          <div className="h-full w-full">
            <LeafletMap />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </LandingLayout>
  );
}

export default Leaf;
