"use client";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

import SeatsView from "components/Seats/SeatsView";
import Loading from "components/Suspense/Loading";
import LandingLayout from "layouts/LandingLayout";
import { mockEventSession } from "mock/session";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect } from "react";
import { useStore } from "store/seat";
import { EventSession, Role } from "store/types";
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

  console.log(store.eventSession);
  return (
    <LandingLayout
      permissions={[Role.USER, Role.ADMIN]}
      title="Ticket Seating"
      withNavbar
    >
      {store.eventSession ? (
        <div className="mt-[4.2rem] flex h-[calc(100vh-68px)] w-full">
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
