import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "../mock/images/image.jpg"

export default function Home() {
  return (
    <>
      <LandingLayout>
      <main>
        <div className="absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md opacity-70"></div>
          <div className="flex h-screen bg-cover z-0 flex justify-between" style={{ backgroundImage: `url(${image.src})` }}>
            <div className="pl-20 items-start w-1/2 flex flex-col gap-0">w
              <p className="backdrop-blur-none text-6xl font-semibold text-white text-left w-full mt-[190px] mx-12 ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                Premier 
                </span> online platform
                  for all your&nbsp;
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                  ticketing 
                  </span>&nbsp;
                  needs
              </p>
              <button className="text-white font-bold text-xl bg-gradient-to-br from-blue-500 to-purple-400 opacity-80 px-10 py-2 rounded-lg mt-[90px] ml-[50px] border">
                All Events
              </button>
            </div>

        </div>
      </main>
      </LandingLayout>
    </>
  );
}
