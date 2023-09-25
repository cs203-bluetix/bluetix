import {
  Button,
  Card,
  Input,
  Popover,
  RangeSlider,
  Select,
  Image,
  Text,
  Group,
  Center,
  Badge,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconCalendarQuestion,
  IconEye,
  IconMapPin,
  IconMessageCircle,
  IconSearch,
} from "@tabler/icons-react";
import LandingLayout from "layouts/LandingLayout";
import { Section } from "layouts/Section";
import { locations, mockEvents } from "mock/events";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/auth";
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
    <LandingLayout title="BlueTix - Events" withNavbar withFooter>
      <Section title="Events">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <div className="flex h-fit min-h-[56px] w-full flex-col items-center gap-2 rounded-xl  bg-gray-300 px-2 py-4 sm:max-w-5xl sm:flex-row sm:py-0">
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
          {/* <div className="bg-b1 mx-auto min-h-[600px] w-full px-4 sm:px-6 xl:max-w-6xl xl:px-8"> */}
          <div className="grid h-full w-full grid-cols-1 gap-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
            {eventsToDisplay.map((e) => {
              return <EventCard event={e} key={e.id} />;
            })}
          </div>
          {/* </div> */}
        </div>
      </Section>
    </LandingLayout>
  );
}

export default EventList;

const EventCard = ({ event }: { event: Event }) => {
  const { formattedDate } = getReadableDate(event.dates[0]!);
  return (
    <Link href={`/events/${event.id}`}>
      <Card
        className="from-gray-0 via-dark-6 duration-400 relative h-[280px] transform bg-gradient-to-t transition-transform hover:scale-105"
        p="lg"
        shadow="lg"
        radius="md"
        // component="a"
        // href={`/events/${event.id}`}
        // target="_blank"
      >
        <Image
          className="ease absolute inset-0 transform transform bg-cover transition-transform duration-500 hover:scale-105"
          src="images/event.jpeg"
          alt={event.name}
          height={280}
        />

        <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-gradient-to-b from-transparent via-transparent to-black" />

        <div className="z-1 relative flex h-full flex-col justify-end">
          <div>
            <Text size="lg" className="mb-1 text-white" fw={500} color="white">
              {event.name}
            </Text>

            <Group justify="between" gap="xs">
              <Text size="sm" color="#909296">
                {event.location}
              </Text>

              <Text size="sm" className="ml-auto" color="#909296">
                {formattedDate && <span>{formattedDate}</span>}
              </Text>
            </Group>
          </div>
        </div>
      </Card>
    </Link>

    // <Link href={`/events/${event.id}`} className="flex flex-wrap">
    //   <Card style={{ border: "none" }} shadow="sm" padding="lg" radius="md" withBorder className='w-full transition-transform duration-400 transform hover:scale-105'>
    //     <Card.Section className='border-t border-gray-300'>
    //       <Image src="images/event.jpeg" alt={event.name} height={220} />
    //     </Card.Section>

    //     <Group justify="space-between" mt="md">
    //       <Text fw={500}>{event.name}</Text>
    //     </Group>

    //     <Group justify="between" gap="xs" className="position-bottom mt-auto">
    //         <Text size="sm" color="#bl">
    //           {event.location}
    //         </Text>

    //         <Text size="sm" className="ml-auto" color="#909296">
    //           {formattedDate && <span>{formattedDate}</span>}
    //         </Text>
    //       </Group>
    //   </Card>
    // </Link>

    // <Link href={`/events/${event.id}`} className="flex justify-center">
    //   <div className="flex h-[360px] w-[320px] flex-col  bg-white shadow-lg">
    //     <img src={event.image} className="aspect-video w-full" />
    //     <div className="mt-2 flex h-full w-full flex-col gap-2 bg-white px-2">
    //       <h2>{event.name}</h2>
    //       {formattedDate && <span>{formattedDate}</span>}
    //       <span>{event.location}</span>
    //     </div>
    //   </div>
    // </Link>
  );
};
