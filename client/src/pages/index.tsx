import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "../mock/images/image.jpg";

export default function Home() {
  return (
    <>
      <LandingLayout>
        <main>
          <div className="absolute inset-0 h-full w-full bg-[rgba(0,0,0,0.5)] opacity-70 backdrop-blur-md"></div>
          <div
            className="z-0 flex flex h-screen justify-between bg-cover"
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="flex w-1/2 flex-col items-start gap-0 pl-20">
              <p className="mx-12 mt-[190px] w-full text-left text-6xl font-semibold text-white backdrop-blur-none ">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Premier
                </span>{" "}
                online platform for all your&nbsp;
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  ticketing
                </span>
                &nbsp; needs
              </p>
              <button className="ml-[50px] mt-[90px] rounded-lg border bg-gradient-to-br from-blue-500 to-purple-400 px-10 py-2 text-xl font-bold text-white opacity-80">
                All Events
              </button>
            </div>
          </div>
        </main>
      </LandingLayout>
    </>
  );
}
