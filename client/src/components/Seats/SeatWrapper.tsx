import axios from "axios";
import Loading from "components/Suspense/Loading";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useStore } from "store/seat";
import { EventSession } from "store/types";
import {
  SERVER_API_BUY_URL,
  SERVER_API_QUEUE_INSERVICE_URL,
} from "utils/globals";
import SeatsView from "./SeatsView";
import { mockEventSession } from "mock/session";
import toast from "react-hot-toast";
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});
const LeafletMapTest = dynamic(() => import("./LeafletMapTest"), {
  ssr: false,
});

function SeatWrapper() {
  const router = useRouter();
  const store = useStore();
  const timerRef = useRef<any>();
  useEffect(() => {
    const getInfo = async () => {
      // store.setEventSession(mockEventSession);
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
          sessionAddress: resp.data[0].session.transaction_addr,
        };
        store.setEventSession(eventSession);
      } else {
        router.push("/");
      }
    };
    getInfo();
  }, [router]);

  useEffect(() => {
    if (!router) return;
    const params = router.query;
    console.log("polling");
    const pollForInactivity = async () => {
      const inServiceEndpoint = `${SERVER_API_QUEUE_INSERVICE_URL}/${
        params.slug![0]
      }/${params.slug![1]}`;

      const inServiceCall = await axios.get(inServiceEndpoint, {
        withCredentials: true,
      });

      if (inServiceCall.status != 200 || !inServiceCall.data) {
        router.push(`/queue/${params.slug![0]}/${params.slug![1]}`);
        toast.error("Session has expired!");
      }
    };
    timerRef.current = setInterval(pollForInactivity, 60 * 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [router]);

  return (
    <>
      {store.eventSession ? (
        <div className="mt-[4.2rem] flex h-[calc(100vh-68px)] w-full">
          <div className="w-full min-w-[300px] max-w-[664px]">
            <SeatsView />
          </div>
          <div className="h-full w-full">
            <LeafletMapTest />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default SeatWrapper;
