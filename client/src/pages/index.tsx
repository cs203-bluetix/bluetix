import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "../mock/images/image.jpg"

export default function Home() {
  return (
    <>
      <LandingLayout>

      {/* <Head>
        <title>BlueTix</title>
        <meta name="description" content="bluetix" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar classProps="bg-opacity-70 backdrop-blur-lg absolute inset-x-0" /> */}
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
              // placeholder="  Search ..."
              className="text-xl rounded-full w-[450px] h-[50px] border border-0.5 border-black bg-blue-200 bg-opacity-50"
            />
          </div>

        </div>
      </main>
      {/* <Footer /> */}
      </LandingLayout>
    </>
  );
}
