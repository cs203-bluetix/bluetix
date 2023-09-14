import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "public/images/background.jpg";

export default function Home() {
  return (
    <>
      <LandingLayout>
        <main>
            <video className="brightness-50"autoPlay muted loop style={{ width: '100%' }}>
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

        </main>
      </LandingLayout>
    </>
  );
}
