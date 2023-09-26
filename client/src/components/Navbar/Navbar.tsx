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

interface NavbarProps {
  classProps?: string;
  user: UserInfo | null;
}

function Navbar({ classProps, user }: NavbarProps) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const toggleModal = () => setIsModalOpen(!isModalOpen);

  // const openModal = () => {
  //   setIsOpen(!isOpen);
  //   setIsModalOpen(true);
  // };
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        id="root"
        className={`${classProps} header fixed inset-x-0 left-0 top-0 z-50`}
      >
        <nav
          className={`mx-auto max-w-[1200px] items-center justify-between px-7 py-3 md:flex md:px-5`}
        >
          <Link href="/" className="text-3xl font-bold">
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
      </div>

      {/* <LoginModal isOpen={isModalOpen} onClose={closeModal} /> */}
    </div>
  );
}

export default Navbar;

const UserOptions = ({ user }: { user: UserInfo }) => {
  const { logoutUser } = useAuthStore();
  return (
    <Menu shadow="md" width={200} zIndex={1000}>
      <Menu.Target>
        <Button variant="transparent">
        <div className="flex h-auto cursor-pointer items-center">
          <IconUserCircle
            className="hover:stroke-gray-700 user-icon"
            size={28}
          />
        </div>
        </Button>
      </Menu.Target>
      <Menu.Dropdown className="z-20">
        <Menu.Label>User</Menu.Label>
        <Menu.Item icon={<IconShoppingBagCheck size={16} />}>Orders</Menu.Item>
        <Menu.Item icon={<IconSettings size={16} />}>Settings</Menu.Item>
        <Menu.Item
          icon={<IconWallet size={16} />}
          onClick={async () => await magic?.wallet.showUI()}
        >
          Wallet
        </Menu.Item>
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
