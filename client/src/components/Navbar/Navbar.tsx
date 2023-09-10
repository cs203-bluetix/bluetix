import Link from "next/link";
import React, { useRef, useState } from "react";
import LoginModal from "utils/LoginModal";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserInfo } from "store/types";
import { Button, Menu } from "@mantine/core";
import {
  IconBookUpload,
  IconCalendarEvent,
  IconLogout,
  IconSettings,
  IconShoppingBag,
  IconShoppingBagCheck,
  IconUserCircle,
} from "@tabler/icons-react";
import { useAuthStore } from "store/auth";

interface NavbarProps {
  classProps?: string;
  user: UserInfo | null;
  // other props...
}

function Navbar({ classProps, user }: NavbarProps) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        id="root"
        className={`${classProps} sticky inset-x-0 left-0 top-0 z-50 bg-white shadow-md`}
      >
        <nav className="mx-auto flex max-w-screen-lg items-center justify-between bg-white px-7 py-4 md:flex md:px-3">
          <Link href="/" className="text-3xl font-bold ">
            BlueTix
          </Link>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer gap-4 md:gap-12"
          >
            <div className="md:hidden">
              {isOpen ? (
                <FaTimes className="h-full w-full" />
              ) : (
                <FaBars className="h-full w-full" />
              )}
            </div>
            <ul className="flex">
              <div
                className={`navbar duration-400 absolute left-0 z-[-1] h-screen w-full bg-white pb-12 pl-9 text-2xl font-medium transition-all ease-in md:static md:z-auto md:flex md:h-auto md:w-auto md:items-center md:pb-0 md:pl-0 md:text-[1rem] ${
                  isOpen ? "top-12" : "top-[-1024px]"
                }`}
              >
                <li className="my-12 md:my-0 md:ml-8">
                  <Link href="/aboutus">About</Link>
                </li>
                <li className="my-12 md:my-0 md:ml-8">
                  <Link href="/events">Events</Link>
                </li>
                <li className="my-12 md:my-0 md:ml-8">
                  <Link href="/venues">Venues</Link>
                </li>
                <li className="my-12 md:my-0 md:ml-8">
                  <Link href="/faq">FAQ</Link>
                </li>
              </div>
            </ul>
            {user ? (
              <UserOptions user={user} />
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;

const UserOptions = ({ user }: { user: UserInfo }) => {
  const { logoutUser } = useAuthStore();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <div className="mt-0.5 flex h-full items-center">
          <IconUserCircle
            className="stroke-gray-500 hover:stroke-gray-700"
            size={28}
          />
        </div>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User</Menu.Label>
        <Menu.Item icon={<IconShoppingBagCheck size={16} />}>Orders</Menu.Item>
        <Menu.Item icon={<IconSettings size={16} />}>Settings</Menu.Item>
        <Menu.Item onClick={() => logoutUser()} icon={<IconLogout size={16} />}>
          Logout
        </Menu.Item>
        {user.isCreator && (
          <>
            <Menu.Divider />
            <Menu.Label>Creator</Menu.Label>
            <Link href="/creators">
              <Menu.Item icon={<IconBookUpload size={16} />}>NFT</Menu.Item>
            </Link>
            <Menu.Item icon={<IconCalendarEvent size={16} />}>
              My events
            </Menu.Item>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
