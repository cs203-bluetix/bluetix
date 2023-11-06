import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import AuthLayout from "./AuthLayout";
import { Role, UserInfo } from "store/types";

const inter = Inter({ subsets: ["latin"] });

export default function LandingLayout({
  children,
  title,
  permissions = [Role.GUEST],
  withNavbar,
  withFooter,
  withGrad,
  withStyle = true,
  overWhite = false,
  strict = false,
}: {
  children: React.ReactNode | ((userInfo: UserInfo) => React.ReactNode);
  title?: string;
  permissions?: Role[];
  withNavbar?: boolean;
  withFooter?: boolean;
  strict?: boolean;
  withGrad?: boolean;
  overWhite?: boolean;
  withStyle?: boolean;
}) {
  // const backgroundStyle = {
  //   background: `
  //   linear-gradient(rgba(0, 0, 0, 0), rgba(255, 165, 0, 0.1)),
  //   url('/assets/Svg1-Hero-2.svg') no-repeat center center fixed
  // `,    backgroundSize: 'cover',
  // };
  const backgroundStyle = {
    background: `
    url('/assets/Svg1-Hero-5.svg') center repeat
  `,
    backgroundSize: "cover",
  };

  return (
    <>
      <AuthLayout
        strict={strict}
        title={title ?? "BlueTix"}
        permissions={permissions}
      >
        {(user) => (
          <>
            {withNavbar && <Navbar overWhite={overWhite} user={user!} />}
            {/* <main className="bg-[#f6f2f2] bg-opacity-70"> */}
            <main className="bg-opacity-30 bg-gradient-to-br from-gray-800 to-gray-900">
              <div style={withStyle ? backgroundStyle : {}}>
                {withGrad && (
                  <div id="effect">
                    <div className="relative h-full w-full">
                      <div>
                        <section id="up" className="opacity-50"></section>
                        <section id="down" className="opacity-70"></section>
                        <section id="left" className="opacity-50"></section>
                        <section id="right" className="opacity-70"></section>
                      </div>
                    </div>
                    <div className="relative left-0 top-0 z-10 h-full w-full">
                      {typeof children === "function"
                        ? children(user!)
                        : children}
                    </div>
                  </div>
                )}
                {!withGrad && (
                  <div>
                    {typeof children === "function"
                      ? children(user!)
                      : children}
                  </div>
                )}
              </div>
            </main>
            {withFooter && <Footer />}
          </>
        )}
      </AuthLayout>
    </>
  );
}
