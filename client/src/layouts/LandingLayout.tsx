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
  strict = false,
}: {
  children: React.ReactNode | ((userInfo: UserInfo) => React.ReactNode);
  title?: string;
  permissions?: Role[];
  withNavbar?: boolean;
  withFooter?: boolean;
  strict?: boolean;
}) {

  // const backgroundStyle = {
  //   background: `
  //   linear-gradient(rgba(0, 0, 0, 0), rgba(255, 165, 0, 0.1)),
  //   url('/assets/Svg1-Hero-2.svg') no-repeat center center fixed
  // `,    backgroundSize: 'cover',
  // };
  const backgroundStyle = {
    background: `
    url('/assets/Svg1-Hero-2.svg') repeat center
  `,    backgroundSize: 'cover',
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
            {withNavbar && <Navbar user={user!} />}
            <main className="bg-[#f6f2f2] bg-opacity-70">
            {/* <main className="bg-gray-800"> */}
              <div style={backgroundStyle} >
              {typeof children === "function" ? children(user!) : children}
              </div>
            </main>
            {withFooter && <Footer />}
          </>
        )}
      </AuthLayout>
    </>
  );
}
