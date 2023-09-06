import { mockEvents } from "mock/events";
import { GetServerSideProps } from "next";
import { Event } from "store/types";
import React from "react";

export const getServerSideProps: GetServerSideProps<{ event: Event }> = async ({
  params,
}) => {
  const eventId = params?.id as string;
  // const endpoint = `${SERVER_URL}/event/${eventId}`
  // const data = await axios.get(endpoint);
  // zod data validation here
  const event = mockEvents.find((e) => e.id == eventId);

  if (!event)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return { props: { event } };
};
function Buy() {
  return <div>Buy</div>;
}

export default Buy;
