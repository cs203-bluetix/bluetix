import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import local from "../../public/images/local.jpg";
import international from "../../public/images/international.jpg";
import music from "../../public/images/music.jpeg";
import comedy from "../../public/images/comedy.jpg";
import sports from "../../public/images/sports.jpeg";
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
import image from "../../public/images/background.jpg";
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


  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector('.header');
      if (headerEl && window.scrollY <= 50) {
        headerEl.classList.add('header-scrolled');
      } else if (headerEl && window.scrollY > 50) {
        headerEl.classList.remove('header-scrolled');
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <LandingLayout>
        <main>
          <video className="brightness-50" autoPlay muted loop style={{ width: '100%' }}>
            <source src="videos/landscapebackgroundvideo.mp4" type="video/mp4" />
          </video>
          <div className="ml-16 absolute inset-0 flex flex-col items-start justify-center text-white text-6xl font-semibold">
            <p className="mx-12 text-left backdrop-blur-none ">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premier
              </span>{" "}
              online platform <br></br> for all your&nbsp;
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ticketing
              </span> <br></br>needs
            </p>
            <br></br>
            <button className=" mt-14 mx-12 mt-4 rounded-lg border bg-gradient-to-br from-blue-500 to-purple-400 px-10 py-2 text-xl font-bold text-white opacity-80">
              All Events
            </button>
          </div>
        <div className="w-screen h-screen bg-cyan-100" >
          <div className=" text-6xl font-bold text-center py-[50px]">
            Trending
          </div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            slidesPerView={2.5}
            coverflowEffect={{
              rotate: 0,
              stretch: 50,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
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
                className=" p-[30px]">
                <LandingCard event={item} />
              </SwiperSlide>
            ))}
            <div className="slider-control">
              <div className="swiper-button-prev slider-arrow"></div>
              <div className="swiper-button-next slider-arrow"></div>
            </div>
          </Swiper>
        </div>
        <div className="w-screen h-screen flex justify-items-center bg-cyan-100">
          <div className="grid grid-cols-6 gap-5 w-full h-full px-[150px] pb-[150px] font-bold text-2xl text-white">
            <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${local.src})` }}><Link href={"/"}>LOCAL</Link> </button>
            <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${international.src})` }}> <Link href={"/"}>INTERNATIONAL </Link></button>
            <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${comedy.src})` }}> <Link href={"/"}>COMEDY</Link> </button>
            <button className="rounded-lg col-span-3 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${music.src})` }}> <Link href={"/"}>MUSIC</Link> </button>
            <button className="rounded-lg col-span-3 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${sports.src})` }}> <Link href={"/"}>SPORTS</Link> </button>
          </div>
        </div>
      </main>
    </LandingLayout >
    </>
  );
}