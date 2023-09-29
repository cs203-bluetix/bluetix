import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import local from "../../public/images/local.jpg";
import international from "../../public/images/international.jpg";
import music from "../../public/images/music.jpeg";
import comedy from "../../public/images/comedy.jpg";
import sports from "../../public/images/sports.jpeg";
import LandingCard from "../components/card/landingCard";
import React, { useState, useEffect, useRef } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Event } from "store/types";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import image from "../../public/images/background.jpg";
// import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { Button, } from "@mantine/core";
import { Carousel } from '@mantine/carousel';
import Autoplay from 'embla-carousel-autoplay';
import axiosConfig from "utils/axiosConfig";

const SERVER_URL = "http://localhost:9090";

export default function Home() {
  const [events, setEvents] = useState<Event[] | null>(null); 
  useEffect(() => {
    axiosConfig.get('/api/events')
        .then((response) => {
          setEvents(response.data);
          console.log(response.data);
        })
        .catch((error) => {
            console.error('Error fetching events:', error);
        });
}, []);

  const autoplay = useRef(Autoplay({ delay: 2000 }));

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
      <LandingLayout withFooter withNavbar>
        <main>
          <div className="relative w-screen h-screen">
            <video className="brightness-50 h-screen w-screen object-cover" autoPlay muted loop>
              <source src="videos/landscapebackgroundvideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-100"></div>
          </div>

          <div className="ml-16 absolute inset-0 flex flex-col items-start justify-center text-white text-6xl font-semibold">
            <p className="mx-12 text-left backdrop-blur-none ">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premier
              </span>{" "}
              Online Platform <br></br> For All Your&nbsp;
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ticketing
              </span> <br></br>Needs
            </p>
            <br></br>

            <Button color="indigo" variant="filled" size="xl" radius="xl" className="mx-12 px-10 py-2 opacity-80">
              All Events
            </Button>
            {/* <button className=" mt-14 mx-12 mt-4 rounded-lg border bg-gradient-to-br from-blue-500 to-purple-400 px-10 py-2 text-xl font-bold text-white opacity-80">
              All Events
            </button> */}
          </div>
          <div className="absolute w-full h-[150px] bg-cover bg-no-repeat bg-center sectiondivider" style={{ backgroundImage: 'url("/assets/landing-bg3.png")' }}></div>
          <div className="w-screen h-[90vh] bg-gradient-to-b from-[#e8e9eb] via-transparent to-transparent mb-12" >
            <div className=" text-5xl font-bold text-center pt-36">
              Trending
            </div>
            <div className="text-center pb-4">
              Where the world's latest buzz meets the eager crowd.
            </div>
            {/* <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                // reverseDirection: true,
              }}
              loop={true}
              slidesPerView={3}
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
              {events.map((item, index) => (
                <SwiperSlide key={index}
                  className={`p-[30px]`}>
                  <LandingCard event={item} />
                </SwiperSlide>
              ))}
              <div className="slider-control">
                <div className="swiper-button-prev slider-arrow "></div>
                <div className="swiper-button-next slider-arrow"></div>
              </div>
            </Swiper> */}
            {events && events.length>0 ? (<Carousel
              withIndicators
              height={450}
              slideSize="33.333333%"
              slideGap="md"
              loop
              align="start"
              breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
              ]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}>
              {events.map((item, index) => (

                <Carousel.Slide>
                  <LandingCard event={item} />
                </Carousel.Slide>
              ))}
            </Carousel>) : null}

          </div>
          <div className="w-full h-[150px] bg-cover bg-no-repeat bg-center sectiondivider" style={{ backgroundImage: 'url("/assets/landing-bg1.png")' }}></div>
          <div className="w-screen h-screen pt-2 pb-4 bg-[#4c6ef5]">
            <div className="text-white text-5xl font-bold text-center pt-4">
              Categories
            </div>
            <div className="text-white text-center">
              Your guide to organized discovery, where interests find their perfect niche.
            </div>
            <div className="w-full h-full flex justify-items-center pt-6">
              <div className="grid grid-cols-6 gap-5 w-full h-full px-[150px] pb-[150px] font-bold text-2xl text-white">
                <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${local.src})` }}><Link href={"/"}>LOCAL</Link> </button>
                <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${international.src})` }}> <Link href={"/"}>INTERNATIONAL </Link></button>
                <button className="rounded-lg col-span-2 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${comedy.src})` }}> <Link href={"/"}>COMEDY</Link> </button>
                <button className="rounded-lg col-span-3 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${music.src})` }}> <Link href={"/"}>MUSIC</Link> </button>
                <button className="rounded-lg col-span-3 bg-center bg-cover transition-transform duration-500 transform hover:scale-105" style={{ backgroundImage: `url(${sports.src})` }}> <Link href={"/"}>SPORTS</Link> </button>
              </div>
            </div>
          </div>
        </main>
      </LandingLayout >
    </>
  );
}