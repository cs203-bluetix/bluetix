import LandingLayout from "layouts/LandingLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event, EventList } from "store/types";

export const getServerSideProps: GetServerSideProps<{
  events: EventList;
}> = async ({ params }) => {
  // const endpoint = `${SERVER_URL}/events`
  // const data = await axios.get(endpoint);
  // zod data validation here
  const mockData = [{ id: "1", name: "placeholder" }];
  return { props: { events: mockData } };
};

function EventList({
  events,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LandingLayout>
      <div>
        {events.map((e, idx) => {
          return <EventCard key={idx} event={e} />;
        })}
      </div>
    </LandingLayout>
  );
}

export default EventList;

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div>
      id: {event.id}, name: {event.name}
    </div>
  );
};
