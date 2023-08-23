import LandingLayout from "layouts/LandingLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";
import { Event } from "store/types";
export const getServerSideProps: GetServerSideProps<{ event: Event }> = async ({
  params,
}) => {
  const eventId = params?.id as string;
  // const endpoint = `${SERVER_URL}/event/${eventId}`
  // const data = await axios.get(endpoint);
  // zod data validation here
  return { props: { event: { id: eventId, name: "placeholder" } } };
};
function Event({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <LandingLayout>
      <div>
        <div>The Event ID is {router.query.id as string}</div>
        <div>The Event Name is {event.name}</div>
      </div>
    </LandingLayout>
  );
}

export default Event;
