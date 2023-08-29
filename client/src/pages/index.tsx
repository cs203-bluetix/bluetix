import Head from "next/head";
import Link from "next/link";
import LandingLayout from "layouts/LandingLayout";
import image from "../mock/images/image.jpg"

export default function Home() {
  return (
    <>
      <LandingLayout>
        <main className="container mx-auto flex py-16 items-center justify-center flex-col ">
          <div  className="h-screen w-screen bg-cover z-0" style={{backgroundImage : `url(${image.src})`}}>
          </div>
        </main>
      </LandingLayout>
    </>
  );
}
