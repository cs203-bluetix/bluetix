import { Button, Card, Group, Image, Input, Popover, RangeSlider, Select, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendarQuestion, IconMapPin, IconSearch } from "@tabler/icons-react";
import { Section } from "layouts/Section";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useEffect, useState } from "react";
import { Event, EventList, Session } from "store/types";
import { getReadableDate, isSameDate } from "utils/getSimpleDate";
import { CDN_API_URL, SERVER_API_URL } from "utils/globals";
import axios from "axios";
import LandingLayout from "layouts/LandingLayout";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps<{
  events: EventList;
  venues: string[];
}> = async ({ params }) => {
  const endpoint = `${SERVER_API_URL}/api/sessions`;
  const resp = await axios.get(endpoint);
  const payload: EventList = [];
  const venues: string[] = [];
  const sessionsMap: Map<string, Session[]> = new Map();
  const eventMap: Map<string, Event> = new Map();
  resp.data.map((d: any) => {
    const eventId = d.event.eventId;
    if (!sessionsMap.has(eventId)) sessionsMap.set(eventId, []);
    if (!eventMap.has(eventId)) eventMap.set(eventId, d.event);
    sessionsMap.get(eventId)?.push({
      sessionId: d.sessionId,
      date: d.date,
      start_time: d.start_time,
      end_time: d.end_time,
    });
  });

  sessionsMap.forEach((sessions, eventId) => {
    const event = eventMap.get(eventId);
    if (!event) return;
    if (!venues.includes(event.venue.name)) venues.push(event.venue.name);
    payload.push({
      ...event,
      sessions,
      prices: [20],
    });
  });

  return { props: { events: payload, venues } };
};

function EventList({ events, venues,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [filterName, setFilterName] = useState("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterLocation, setFilterLocation] = useState<string | null>(null);
  const [filterPrice, setFilterPrice] = useState<[number, number]>([0, 1000]);
  const [eventsToDisplay, setEventsToDisplay] = useState(events);
  useEffect(() => {
    const newEvents = events.filter(
      (e) =>
        (!filterName ||
          e.name.toLowerCase().includes(filterName.toLowerCase())) &&
        (!filterDate ||
          e.sessions.some((d) => isSameDate(new Date(d.date), filterDate))) &&
        (!filterLocation || e.venue.name === filterLocation) &&
        e.prices.some((p) => p <= filterPrice[1] && p >= filterPrice[0])
    );
    setEventsToDisplay(newEvents);
  }, [filterName, filterDate, filterLocation, filterPrice]);

  return (
    <LandingLayout title="BlueTix - Events" withNavbar withFooter>
      <Section title="Events">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex h-fit min-h-[56px] w-full flex-col items-center gap-2 rounded-xl  bg-gray-300 px-4 py-4 sm:max-w-7xl sm:flex-row sm:py-0">
            <div className="w-full ">
              <Input
                placeholder="Search events..."
                className="grow"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                icon={<IconSearch size={18} />}
              />
            </div>
            <div className="flex w-full  gap-2">
              <DateInput
                className="grow-0"
                icon={<IconCalendarQuestion size={18} />}
                value={filterDate}
                onChange={setFilterDate}
                placeholder="Date"
                clearable
              />
              <Select
                className="grow-[2]"
                clearable
                placeholder="Location"
                data={venues}
                value={filterLocation}
                onChange={setFilterLocation}
                icon={<IconMapPin size={18} />}
              />
              <div className="grow">
                <Popover>
                  <Popover.Target>
                    <Button variant="filled" color="blue" fullWidth>
                      Price
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className="flex w-[300px] flex-col gap-2">
                      <span className="tracking-tight">
                        Filter by price ($)
                      </span>
                      <RangeSlider
                        min={0}
                        max={1000}
                        size="sm"
                        value={filterPrice}
                        onChange={setFilterPrice}
                      />
                    </div>
                  </Popover.Dropdown>
                </Popover>
              </div>
            </div>
          </div>
          <div className="grid h-full w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {eventsToDisplay.map((e) => {
              return <EventCard event={e} key={e.eventId} />;
            })}
          </div>
        </div>
      </Section>
    </LandingLayout>
  );
}

export default EventList;

const EventCard = ({ event }: { event: Event }) => {
  const { formattedDate } = getReadableDate(event.sessions[0]?.date!);
  return (
    <Link href={`/events/${event.eventId}`}>
      <Card
        className="from-gray-0 via-dark-6 duration-400 relative h-[280px] transform bg-gradient-to-t transition-transform hover:scale-105"
        p="lg"
        shadow="lg"
        radius="md"
      >
        <Image
          className="ease absolute inset-0 transform transform bg-cover transition-transform duration-500 hover:scale-105"
          src={`${CDN_API_URL}/events/${event.image_url}`}
          alt={event.name}
          height={280}
        />

        <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-gradient-to-b from-transparent via-transparent to-black" />

        <div className="z-1 relative flex h-full flex-col justify-end">
          <div>
            <Text size="lg" className="mb-1 text-white" fw={500} color="white">
              {event.name}
            </Text>

            <Group>
              <Text size="sm" color="#909296">
                {event.venue.name}
              </Text>

              <Text size="sm" className="ml-auto" color="#909296">
                {formattedDate && <span>{formattedDate}</span>}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>
  );
};
