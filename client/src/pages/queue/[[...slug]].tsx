"use client";
import { Loader } from "@mantine/core";
import axios from "axios";
import LandingLayout from "layouts/LandingLayout";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Role } from "store/types";
import {
  SERVER_API_QUEUE_INSERVICE_URL,
  SERVER_API_QUEUE_JOIN_URL,
} from "utils/globals";

function QueuePage() {
  const timerRef = useRef<any>(null);
  const router = useRouter();
  useEffect(() => {
    if (!router) return;
    const params = router.query;
    const pollForQueue = async () => {
      try {
        const inServiceEndpoint = `${SERVER_API_QUEUE_INSERVICE_URL}/${
          params.slug![0]
        }/${params.slug![1]}`;

        const inServiceCall = await axios.get(inServiceEndpoint, {
          withCredentials: true,
        });
        if (inServiceCall.status != 200) {
          toast.error("You are not in this queue!");
          router.push("/");
        }
        if (inServiceCall.status === 200 && inServiceCall.data) {
          toast.success("Redirecting you to the seat selection page!");
          router.push(`/buy/${params.slug![0]}/${params.slug![1]}`);
        }
      } catch (e) {
        console.log("idk error");
        console.log(e);
      }
    };
    timerRef.current = setInterval(pollForQueue, 3000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [router]);

  useEffect(() => {
    if (!router) return;
    const params = router.query;
    const joinQueue = async () => {
      try {
        const joinEndpoint = `${SERVER_API_QUEUE_JOIN_URL}/${params.slug![0]}/${
          params.slug![1]
        }`;
        const joinCall = await axios.post(joinEndpoint, null, {
          withCredentials: true,
        });
      } catch (e) {
        console.log(e);
      }
    };
    joinQueue();
  }, [router]);

  return (
    <LandingLayout
      strict={true}
      permissions={[Role.USER, Role.ADMIN]}
      title="Ticket Queue"
      withNavbar
      overWhite={true}
    >
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <Loader />
        <h2 className="mt-4 text-lg font-semibold text-white">
          You are now in line!
        </h2>
        <span className="text-white">
          When it is your turn, you will have 15 minutes to checkout.
        </span>
      </div>
    </LandingLayout>
  );
}

export default QueuePage;
