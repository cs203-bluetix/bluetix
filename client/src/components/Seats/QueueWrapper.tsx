import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SeatWrapper from "./SeatWrapper";
import {
  SERVER_API_QUEUE_INSERVICE_URL,
  SERVER_API_QUEUE_JOIN_URL,
} from "utils/globals";
import axios from "axios";

function QueueWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [inService, setInService] = useState(false);
  useEffect(() => {
    const getInfo = async () => {
      try {
        const params = router.query;
        if (!params || !params.slug || params.slug.length != 2) return;
        const joinEndpoint = `${SERVER_API_QUEUE_JOIN_URL}/${params.slug![0]}/${
          params.slug![1]
        }`;
        const inServiceEndpoint = `${SERVER_API_QUEUE_INSERVICE_URL}/${
          params.slug![0]
        }/${params.slug![1]}`;

        const joinCall = await axios.post(joinEndpoint, null, {
          withCredentials: true,
        });

        const inServiceCall = await axios.get(inServiceEndpoint, {
          withCredentials: true,
        });

        if (inServiceCall.status === 200 && inServiceCall.data) {
          console.log("ALLOWED");
          setInService(true);
        } else {
          router.push(`/queue/${params.slug![0]}/${params.slug![1]}`);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getInfo();
  }, [router]);
  return <>{inService && children}</>;
}

export default QueueWrapper;
