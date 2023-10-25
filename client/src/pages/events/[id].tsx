import { Button, Menu, Card, Image, Badge } from "@mantine/core";
import axios from "axios";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import React from "react";
import { Event, Session } from "store/types";
import { getReadableDate } from "utils/getSimpleDate";
import { CDN_API_URL, SERVER_API_URL } from "utils/globals";

function Event({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LandingLayout title={`BlueTix - ${event.name}`} withNavbar withFooter>
      <Section>
        <div className="h-fit w-full">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="mx-auto w-full sm:px-6 xl:px-8">
              <Image
                className="mt-4 mb-4"
                radius="lg"
                src={`${CDN_API_URL}/events/${event.image_url}`}
                alt={event.name}
                height={500}>
              </Image>


              <div className="flex">
                <div className="w-[70%] mt-4">
                  <div className="gap-4  mb-6">
                  <h1 className="font-bold text-6xl">{event.name}</h1>
                  <div>
                    <span className="text-lg font-semibold">
                      {getReadableDate(event.sessions[0]?.date!).formattedDate} - {getReadableDate(event.sessions[event.sessions.length-1]?.date!).formattedDate}
                    </span>
                    <Badge className="ml-4" size="xl" color="orange">{event.venue.name}</Badge>
                  </div>
                  </div>
                  
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold">Event Details</h2>
                    <p className="mt-2 leading-relaxed text-gray-600">{event.description}</p>
                  </div>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold">Ticket Pricing</h2>
                    <p className="mt-2 leading-relaxed text-gray-600">{event.ticket_pricing}</p>
                  </div>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold">FAQ</h2>
                    <p className="mt-2 leading-relaxed text-gray-600">{event.faq}</p>
                  </div>
                  <div className="mb-10">
                    <h2 className="text-2xl font-bold">Admissions Policy</h2>
                    <p className="mt-2 leading-relaxed text-gray-600">{event.admission_policy}</p>
                  </div>
                </div>
                <div className="w-[30%] mt-4">
                  
                <div className="sticky top-32">
                      <Menu >
                        <Menu.Target >
                          <div className="px-6">
                          <Button color="orange" size="xl" mx="lg" fullWidth>
                            Buy Tickets
                          </Button>
                          </div>
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
                </div>
              </div>

              {/* <div className="sticky top-0  mx-auto flex h-fit min-h-[72px] w-full flex-col items-center justify-between gap-4 bg-white px-2 shadow-md sm:flex-row sm:flex-row-reverse sm:px-4 md:px-6 lg:px-8">
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
              </div> */}
            </div>
          </div>
        </div>
      </Section>
    </LandingLayout>
  );
}

export default Event;


export const getServerSideProps: GetServerSideProps<{ event: Event }> = async ({
  params,
}) => {
  const eventId = params?.id as string;
  const endpoint = `${SERVER_API_URL}/api/sessions/byEventId/${eventId}`;
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

  if (!event)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  return { props: { event } };
};
