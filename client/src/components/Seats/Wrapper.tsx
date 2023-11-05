import axios from "axios";
import Loading from "components/Suspense/Loading";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStore } from "store/seat";
import { EventSession } from "store/types";
import { SERVER_API_BUY_URL } from "utils/globals";
import SeatsView from "./SeatsView";
const LeafletMap = dynamic(() => import("../../components/Seats/LeafletMap"), {
  ssr: false,
});

function Wrapper() {
  const router = useRouter();
  const store = useStore();
  useEffect(() => {
    const getInfo = async () => {
      const params = router.query;
      if (
        store.eventSession ||
        !params ||
        !params.slug ||
        params.slug.length < 2
      )
        return;
      const endpoint = `${SERVER_API_BUY_URL}/${params.slug![0]}/${
        params.slug![1]
      }`;
      const resp = await axios.get(endpoint);
      if (resp.status === 200) {
        const eventSession: EventSession = {
          event: resp.data[0].session.event,
          seats: resp.data.map((s: any) => ({
            id: s.section.id.sectionId,
            price: s.price,
            numSeats: s.num_seats_left,
            category: s.section.category,
          })),
          sessionid: resp.data[0].session.sessionId,
          date: new Date(resp.data[0].session.date).toString(),
        };
        store.setEventSession(eventSession);
      } else {
        router.push("/");
      }
    };
    getInfo();
  }, [router]);
  return (
    <>
      {store.eventSession ? (
        <div className="mt-[4.2rem] flex h-[calc(100vh-68px)] w-full">
          <div className="w-full min-w-[300px] max-w-[664px]">
            <SeatsView />
          </div>
          <div className="h-full w-full">
            <LeafletMap />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Wrapper;

// if (!params?.slug || params.slug.length < 2)
// return {
//   redirect: {
//     permanent: false,
//     destination: "/",
//   },
// };

// const endpoint = `${SERVER_API_BUY_URL}/${params.slug[0]}/${params.slug[1]}`;
// const resp = await axios.get(endpoint);
// const eventSession: EventSession = {
// event: resp.data[0].session.event,
// seats: resp.data.map((s: any) => ({
//   id: s.section.id.sectionId,
//   price: s.price,
//   numSeats: s.num_seats_left,
//   category: s.section.category,
// })),
// sessionid: resp.data[0].session.sessionId,
// date: new Date(resp.data[0].session.date).toString(),
// };
// // const endpoint = `${SERVER_URL}/events`
// // const data = await axios.get(endpoint);
// // zod data validation here
// return { props: { eventSession } };
