import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
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
  IconWallet,
} from "@tabler/icons-react";
import { useAuthStore } from "store/auth";
import { useRouter } from "next/router";
import { magic } from "utils/magicSDK";
import axios from "axios";
import { SERVER_API_LOGOUT_URL } from "utils/globals";

interface NavbarProps {
  classProps?: string;
  user: UserInfo | null;
  overWhite?: boolean;
}

function Navbar({ classProps, user, overWhite = false }: NavbarProps) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div
      id="root"
      className={`${classProps} header absolute inset-x-0 left-0 top-0 z-50 ${
        overWhite && "bg-opacity-30 bg-gradient-to-br from-gray-800 to-gray-900"
      }`}
    >
      <nav
        className={`mx-auto max-w-[1280px] items-center justify-between px-7 py-3 md:flex md:px-5`}
      >
        <Link href="/" className="text-3xl font-bold text-white">
          {/* <img src="/logoblue.png" width={24} className="inline-block pb-1.5"/> */}
          <span style={{ color: "#4c6ef5" }}>Blue</span>tix
        </Link>

        <div
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-8 top-6 h-7 w-7 cursor-pointer md:hidden"
        >
          {isOpen ? (
            <FaTimes className="h-full w-full" />
          ) : (
            <FaBars className="h-full w-full" />
          )}
        </div>

        <ul
          className={`navbar duration-400 absolute left-0 z-[-1] h-screen w-full pb-12 pl-9 text-2xl font-medium transition-all ease-in md:static md:z-auto md:flex md:h-auto md:w-auto md:items-center md:pb-0 md:pl-0 md:text-[1rem] ${
            isOpen ? "top-12" : "top-[-1024px]"
          }`}
        >
          <li className="my-12 text-white md:my-0 md:ml-8">
            <Link href="/aboutus">About</Link>
          </li>
          <li className="my-12 text-white md:my-0 md:ml-8">
            <Link href="/events">Events</Link>
          </li>
          <li className="my-12 text-white md:my-0 md:ml-8">
            <Link href="/venues">Venues</Link>
          </li>
          <li className="my-12 text-white md:my-0 md:ml-8">
            <Link href="/faq">FAQ</Link>
          </li>

          {/* <li className="md:ml-8 md:my-0 my-12">
                  <div className="hidden md:block">
                    <Button onClick={toggleModal}>
                      Login
                    </Button>
                  </div>
                  <div className="block md:hidden">
                    <a href="#" onClick={openModal}>Login</a>
                  </div>
                </li> */}
          <li className="my-12 md:my-0 md:ml-8">
            {user ? (
              <UserOptions user={user} />
            ) : (
              <Link href="/login">
                <Button color="indigo" variant="filled">
                  Login
                </Button>
              </Link>
            )}
          </li>
        </ul>

        {/* <style jsx>
            {`
            .navbar :global(li:not(:first-child)) {
              margin-top: 0;
            }

            .navbar :global(li:not(:last-child)) {
              margin-right: 1.25rem;
            }

          `}
          </style> */}
      </nav>

      {/* <LoginModal isOpen={isModalOpen} onClose={closeModal} /> */}
    </div>
  );
}

export default Navbar;

const UserOptions = ({ user }: { user: UserInfo }) => {
  const { logoutUser } = useAuthStore();
  const logoutHandler = async () => {
    try {
      await axios.get(SERVER_API_LOGOUT_URL, { withCredentials: true });
      logoutUser();
    } catch (e) {
      console.log(e);
    }
  };
  const router = useRouter();
  return (
    <Menu shadow="md" width={200} zIndex={1000}>
      <Menu.Target>
        <Button variant="transparent">
          <div className="flex h-auto cursor-pointer items-center">
            <IconUserCircle
              className="user-icon hover:stroke-gray-700"
              size={28}
              stroke={1.5}
            />
          </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="z-20">
        <Menu.Label>User</Menu.Label>
        <Menu.Item
          onClick={() => router.push("/orders")}
          icon={<IconShoppingBagCheck size={16} />}
        >
          Orders
        </Menu.Item>
        <Menu.Item icon={<IconSettings size={16} />}>Settings</Menu.Item>
        <Menu.Item
          icon={<IconWallet size={16} />}
          onClick={async () => await magic?.wallet.showUI()}
        >
          Wallet
        </Menu.Item>
        <Menu.Item
          onClick={async () => await logoutHandler()}
          icon={<IconLogout size={16} />}
        >
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
