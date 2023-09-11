import { Button } from "@mantine/core";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
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
function Event({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LandingLayout title={`BlueTix - ${event.name}`}>
      <Section>
      <div className="h-fit w-full">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="mx-auto w-full max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
            <div className="h-fit bg-gray-200">
              <img src={event.image} className="aspect-auto w-full" />
              <div className="flex flex-col gap-4 px-2 py-4 sm:px-4 lg:px-6">
                <h1>{event.name}</h1>
                <span className="text-lg font-semibold">
                  {event.dates[0]} / {event.location}
                </span>
              </div>
            </div>
            <div className="sticky top-0  mx-auto flex h-fit min-h-[72px] w-full flex-col items-center justify-between gap-4 bg-white px-2 shadow-md sm:flex-row sm:flex-row-reverse sm:px-4 md:px-6 lg:px-8">
              <div className="h-full w-full sm:max-w-[120px]">
                <Button fullWidth className="sm:max-w-[120px]">
                  <Link href={`/buy/${event.id}`}>Buy Tickets</Link>
                </Button>
              </div>
              <div className="flex grow flex-wrap justify-around gap-8 pb-4 sm:flex-nowrap sm:py-0">
                <Link
                  href="#details"
                  className="flex items-center text-center font-bold uppercase tracking-wider text-gray-400 hover:text-gray-500"
                >
                  Event Details
                </Link>
                <Link
                  className="flex items-center text-center font-bold uppercase tracking-wider text-gray-400 hover:text-gray-500"
                  href="#pricing"
                >
                  Ticket Pricing
                </Link>
                <Link
                  className="flex items-center  text-center font-bold uppercase tracking-wider text-gray-400 hover:text-gray-500"
                  href="#faq"
                >
                  FAQ
                </Link>
                <Link
                  className="flex items-center text-center font-bold uppercase tracking-wider text-gray-400 hover:text-gray-500"
                  href="#admissions"
                >
                  Admissions Policy
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full" id="content">
            <div
              className="px-3 py-8  sm:px-4 sm:px-4 md:px-6 lg:px-8"
              id="details"
            >
              <div className="mx-auto max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
                <h2 className="text-2xl font-semibold">Event Details</h2>
                <p className="mt-4 leading-relaxed">{event.eventDetails}</p>
              </div>
            </div>
            <div
              className="bg-gray-200 px-3  py-8 sm:px-4 sm:px-4 md:px-6 lg:px-8"
              id="pricing"
            >
              {/* TODO: change to set inner html for better formatting */}
              <div className="mx-auto max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
                <h2 className="text-2xl font-semibold">Ticket Pricing</h2>
                <p className="mt-4 leading-relaxed">{event.ticketPricing}</p>
              </div>
            </div>
            <div
              className="px-3  py-8 sm:px-4 sm:px-4 md:px-6 lg:px-8"
              id="faq"
            >
              <div className="mx-auto max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
                <h2 className="text-2xl font-semibold">FAQ</h2>
                <p className="mt-4 leading-relaxed">{event.faq}</p>
              </div>
            </div>
            <div
              className="bg-gray-200 px-3  py-8 sm:px-4 sm:px-4 md:px-6 lg:px-8"
              id="admissions"
            >
              <div className="mx-auto max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
                <h2 className="text-2xl font-semibold">Admissions Policy</h2>
                <p className="mt-4 leading-relaxed">{event.admissionsPolicy}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Section>
    </LandingLayout>
  );
}

export default Event;
