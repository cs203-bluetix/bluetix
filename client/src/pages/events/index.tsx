import { Button, Input, Popover, RangeSlider, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconCalendarQuestion,
  IconMapPin,
  IconSearch,
} from "@tabler/icons-react";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { locations, mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event, EventList } from "store/types";
import { getReadableDate } from "utils/getSimpleDate";

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
          e.dates.some(
            (d) => new Date(d).setHours(0) <= filterDate.getTime()
          )) &&
        (!filterLocation || e.location === filterLocation) &&
        e.prices.some((p) => p <= filterPrice[1])
    );
    setEventsToDisplay(newEvents);
  }, [filterName, filterDate, filterLocation, filterPrice]);

  return (
    <LandingLayout title="BlueTix - Events">
      <Section title="Events">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex h-fit min-h-[56px] w-full max-w-[95%] flex-col items-center gap-2 rounded-xl  bg-gray-300 px-2 py-4 sm:max-w-5xl sm:flex-row sm:py-0">
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
                data={locations}
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
          <div className="bg-b1 mx-auto min-h-[600px] w-full max-w-5xl  bg-gray-200 px-4 sm:px-6 xl:max-w-6xl xl:px-8">
            <div className="grid h-full w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
              {eventsToDisplay.map((e) => {
                return <EventCard event={e} key={e.id} />;
              })}
            </div>
          </div>
        </div>
      </Section>
    </LandingLayout>
  );
}

export default EventList;

const EventCard = ({ event }: { event: Event }) => {
  const { formattedDate } = getReadableDate(event.dates[0]!);
  return (
    <Link href={`/events/${event.id}`} className="flex justify-center">
      <div className="flex h-[360px] w-[320px] flex-col  bg-white shadow-lg">
        <img src={event.image} className="aspect-video w-full" />
        <div className="mt-2 flex h-full w-full flex-col gap-2 bg-white px-2">
          <h2>{event.name}</h2>
          {formattedDate && <span>{formattedDate}</span>}
          <span>{event.location}</span>
        </div>
      </div>
    </Link>
  );
};