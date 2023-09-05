import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function LandingLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="bluetix" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <Navbar />
      <main className={inter.className}>
        {children}
      </main>
      <Footer />
    </>
  );
}
