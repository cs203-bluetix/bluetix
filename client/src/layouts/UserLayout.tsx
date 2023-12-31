import Footer from "components/Footer/Footer";
import Navbar from "components/Navbar/Navbar";
import Head from "next/head";
import React from "react";
import { Inter } from "next/font/google";
import AuthLayout from "./AuthLayout";
import { Role, UserInfo } from "store/types";

export default function UserLayout({
  children,
  title,
  permissions = [Role.GUEST],
}: {
  children: JSX.Element | ((userInfo: UserInfo) => React.ReactNode);
  title?: string;
  permissions?: Role[];
}) {
  return (
    <>
      <UserLayout title={title ?? "BlueTix"} permissions={permissions}>
        {(user) => (
          <>
            <Navbar user={user!} />
            <main>
              {typeof children === "function" ? children(user!) : children}
            </main>
            <Footer />
          </>
        )}
      </UserLayout>
    </>
  );
}
