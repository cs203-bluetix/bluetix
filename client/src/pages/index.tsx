import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import LandingCard from "../components/card/landingCard";
import React, { useState, useEffect, useRef } from "react";
import { Event } from "store/types";
import { Button, Image, Card } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import axiosConfig from "utils/axiosConfig";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [events, setEvents] = useState<Event[] | null>(null);
  useEffect(() => {
    axiosConfig
      .get("/api/events")
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const autoplay = useRef(Autoplay({ delay: 2000 }));

  useEffect(() => {
    const handleScroll = () => {
      const headerEl = document.querySelector(".header");
      if (headerEl && window.scrollY <= 50) {
        headerEl.classList.add("header-scrolled");
      } else if (headerEl && window.scrollY > 50) {
        headerEl.classList.remove("header-scrolled");
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <LandingLayout withFooter withNavbar>
        <main>
          <div className="relative h-screen w-full">
            <video
              className="h-screen w-full object-cover brightness-50"
              autoPlay
              muted
              loop
            >
              <source
                src="videos/landscapebackgroundvideo.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-100"></div>
          </div>

          <div className="absolute inset-0 ml-16 flex flex-col items-start justify-center text-6xl font-semibold text-white">
            <p className="mx-12 text-left backdrop-blur-none ">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Premier
              </span>{" "}
              Online Platform <br></br> For All Your&nbsp;
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Ticketing
              </span>{" "}
              <br></br>Needs
            </p>
            <br></br>

            <Link href={"/events"}>
              <Button
                color="orange"
                variant="filled"
                size="xl"
                radius="xl"
                className="mx-12 px-10 py-2 opacity-90"
              >
                All Events
              </Button>
            </Link>
            {/* <button className=" mt-14 mx-12 mt-4 rounded-lg border bg-gradient-to-br from-blue-500 to-purple-400 px-10 py-2 text-xl font-bold text-white opacity-80">
              All Events
            </button> */}
          </div>
          <div
            className="sectiondivider absolute h-[150px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/assets/landing-bg3.png")' }}
          ></div>
          <div className="mb-12 h-[90vh] w-full bg-gradient-to-b from-[#] via-transparent to-transparent">
            <div className=" pt-36 text-center text-5xl font-bold text-white">
              Trending
            </div>
            <div className="pb-4 text-center text-white">
              <br></br>
              Where the world's latest buzz meets the eager crowd.
            </div>
            {events ? (
              <Carousel
                withIndicators
                height={450}
                slideSize="33.333333%"
                slideGap="md"
                loop
                align="start"
                breakpoints={[
                  { maxWidth: "md", slideSize: "50%" },
                  { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
                ]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
              >
                {events.map((item, index) => (
                  <Carousel.Slide>
                    <LandingCard event={item} />
                  </Carousel.Slide>
                ))}
              </Carousel>
            ) : null}
          </div>
          <div
            className="sectiondivider h-[150px] w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("/assets/landing-bg1.png")' }}
          ></div>
          <div className="h-screen w-full bg-[#4c6ef5] pb-4 pt-2">
            <div className="pt-4 text-center text-5xl font-bold text-white">
              Categories
            </div>
            <div className="text-center text-white">
              <br></br>
              Your guide to organized discovery, where interests find their
              perfect niche.
            </div>
            <div className="flex h-full w-full justify-items-center pt-6">
              <div className="grid h-full w-full grid-cols-6 gap-5 px-[150px] pb-[150px] text-2xl font-bold text-white">
                <button
                  className="col-span-2 transform rounded-lg bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/landing/local.jpg")',
                  }}
                >
                  <Link className="h-full w-full" href={"/events"}>
                    LOCAL
                  </Link>{" "}
                </button>
                <button
                  className="col-span-2 transform rounded-lg bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/landing/international.jpg")',
                  }}
                >
                  {" "}
                  <Link href={"/events"}>INTERNATIONAL</Link>
                </button>
                <button
                  className="col-span-2 transform rounded-lg bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/landing/comedy.jpg")',
                  }}
                >
                  {" "}
                  <Link href={"/events"}>COMEDY</Link>{" "}
                </button>
                <button
                  className="col-span-3 transform rounded-lg bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/landing/music.jpeg")',
                  }}
                >
                  {" "}
                  <Link href={"/events"}>MUSIC</Link>{" "}
                </button>
                <button
                  className="col-span-3 transform rounded-lg bg-cover bg-center transition-transform duration-500 hover:scale-105"
                  style={{
                    backgroundImage: 'url("/images/landing/sports.jpeg")',
                  }}
                >
                  {" "}
                  <Link href={"/events"}>SPORTS</Link>{" "}
                </button>
              </div>
            </div>
          </div>
        </main>
      </LandingLayout>
    </>
  );
}
