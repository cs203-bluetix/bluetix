import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "../mock/images/image.jpg";
import LandingCard from "../components/card/landingCard";
import React, { useState, useEffect } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event } from "store/types";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

const SERVER_URL = "http://localhost:9090";

export const getServerSideProps: GetServerSideProps<{
  events: Event[]; // Change EventList to Event[]
}> = async () => {
  try {
    const endpoint = `${SERVER_URL}/api/events`;

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

export default function Home({ events, }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <>
      <LandingLayout>
        <main>
          <div className="flex h-screen w-screen bg-cover z-0 flex justify-between" style={{ backgroundImage: `url(${image.src})` }}>
            <div className="pl-20 items-start w-1/2 flex flex-col gap-0">
              <p className="text-6xl font-semibold text-black text-left w-full mt-[190px] mx-12">
                Premier online platform
                for all your ticketing needs
              </p>
              <button className="text-xl bg-gradient-to-br from-cyan-200 to-blue-600 opacity-80 px-10 py-2 rounded-lg mt-[90px] ml-[50px] border">
                All Events
              </button>
            </div>
            <div className="flex items-center px-20 w-1/2">
              <input
                type="text"
                name="search"
                className="text-xl rounded-full w-[450px] h-[50px] border border-0.5 border-black bg-blue-200 bg-opacity-50"
              />
            </div>
          </div>
          <div className="w-screen h-screen">
            <div className=" text-4xl font-bold text-center py-[50px]">
              Trending
            </div>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true,
              }}
              loop={true}
              slidesPerView={2.5}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next", 
                prevEl: ".swiper-button-prev", 
              }}
              modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
              {events.map((item, index) => (
            <SwiperSlide key={index}
            className="">
                  <LandingCard event={item} />
            </SwiperSlide>
             ))}
              <div className="slider-control">
                <div className="swiper-button-prev slider-arrow"></div>
                <div className="swiper-button-next slider-arrow"></div>
              </div>
            </Swiper>
          </div>
        </main>
      </LandingLayout>
    </>
  );
}
