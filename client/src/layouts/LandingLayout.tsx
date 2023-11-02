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
            <main className="bg-[#fafafd]">
              {typeof children === "function" ? children(user!) : children}
            </main>
            {withFooter && <Footer />}
          </>
        )}
      </AuthLayout>
    </>
  );
}
