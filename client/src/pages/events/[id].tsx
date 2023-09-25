import { Button, Menu } from "@mantine/core";
import axios from "axios";
import { env } from "env.mjs";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Event, Session } from "store/types";
import { getReadableDate } from "utils/getSimpleDate";
export const getServerSideProps: GetServerSideProps<{ event: Event }> = async ({
  params,
}) => {
  const eventId = params?.id as string;
  const endpoint = `${env.NEXT_PUBLIC_SERVER_URL}/api/sessions/byEventId/${eventId}`;
  const resp = await axios.get(endpoint);
  const sessions: Session[] = [];

  resp.data.map((d: any) =>
    sessions.push({
      date: d.date,
      sessionId: d.sessionId,
      start_time: d.start_time,
      end_time: d.end_time,
    })
  );

  const event: Event = {
    ...resp.data[0].event,
    sessions,
  };

  console.log(event);

  // zod data validation here

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
    <LandingLayout title={`BlueTix - ${event.name}`} withNavbar withFooter>
      <Section>
        <div className="h-fit w-full">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="mx-auto w-full max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
              <div className="h-fit bg-gray-200">
                <img src={event.image_url} className="aspect-auto w-full" />
                <div className="flex flex-col gap-4 px-2 py-4 sm:px-4 lg:px-6">
                  <h1>{event.name}</h1>
                  <span className="text-lg font-semibold">
                    {getReadableDate(event.sessions[0]?.date!).formattedDate} /{" "}
                    {event.venue.name}
                  </span>
                </div>
              </div>
              <div className="sticky top-0  mx-auto flex h-fit min-h-[72px] w-full flex-col items-center justify-between gap-4 bg-white px-2 shadow-md sm:flex-row sm:flex-row-reverse sm:px-4 md:px-6 lg:px-8">
                <div className="h-full w-full sm:max-w-[120px]">
                  <Menu>
                    <Menu.Target>
                      <Button fullWidth className="sm:max-w-[120px]">
                        Buy Tickets
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {event.sessions.map((s) => (
                        <Link href={`/buy/${event.eventId}/${s.sessionId}`}>
                          <Menu.Item>
                            {getReadableDate(s.date).formattedDate} ·{" "}
                            {s.start_time} - {s.end_time}
                          </Menu.Item>
                        </Link>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
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
                  <p className="mt-4 leading-relaxed">{event.description}</p>
                </div>
              </div>
              <div
                className="bg-gray-200 px-3  py-8 sm:px-4 sm:px-4 md:px-6 lg:px-8"
                id="pricing"
              >
                {/* TODO: change to set inner html for better formatting */}
                <div className="mx-auto max-w-5xl sm:px-6 xl:max-w-6xl xl:px-8">
                  <h2 className="text-2xl font-semibold">Ticket Pricing</h2>
                  <p className="mt-4 leading-relaxed">{event.ticket_pricing}</p>
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
                  <p className="mt-4 leading-relaxed">
                    {event.admission_policy}
                  </p>
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
