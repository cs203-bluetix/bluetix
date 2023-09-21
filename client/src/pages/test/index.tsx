import axios from "axios";
import LandingLayout from "layouts/LandingLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event } from "store/types"; // Import the Event type

// Define the base URL for the server
const SERVER_URL = "http://localhost:9090";

export const getServerSideProps: GetServerSideProps<{
  events: Event[]; // Change EventList to Event[]
}> = async () => {
  try {
    const endpoint = `${SERVER_URL}/api/events/`;
    
    console.log("Fetching data from:", endpoint);
    
    const response = await axios.get(endpoint);
    const events = response.data;

    console.log("Data fetched:", events);

    return { props: { events } };
  } catch (error) {
    console.error("Error fetching events:", error);
    return { props: { events: [] } };
  }
};

function EventList({
  events, 
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <LandingLayout>
      <div>
        {events.map((event, idx) => (
          <EventCard key={idx} event={event} />
        ))}
      </div>
    </LandingLayout>
  );
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <div>
      id: {event.id}, name: {event.name}
    </div>
  );
};

export default EventList;