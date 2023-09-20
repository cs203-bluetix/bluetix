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
} from "@tabler/icons-react";
import { useAuthStore } from "store/auth";
import { useRouter } from "next/router";

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
        <div id="root" className={`${classProps} header fixed top-0 left-0 inset-x-0 z-50`}>
          <nav className={`md:flex justify-between items-center mx-auto max-w-screen-lg py-4 md:px-3 px-7`}>
            <Link href="/" className="text-3xl font-bold ">
              BlueTix
            </Link>

            <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
              {
                isOpen ? <FaTimes className="w-full h-full" /> : <FaBars className="w-full h-full" />
              }
            </div>

            <ul className={`navbar md:flex md:items-center md:pb-0 pb-12 font-medium text-2xl md:text-[1rem] absolute md:static md:z-auto z-[-1] left-0 w-full h-screen md:w-auto md:h-auto md:pl-0 pl-9 transition-all duration-400 ease-in ${isOpen ? 'top-12' : 'top-[-1024px]'}`}>
              <li className="md:ml-8 md:my-0 my-12">
                <Link href="/aboutus">About</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-12">
                <Link href="/events">Events</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-12">
                <Link href="/venues">Venues</Link>
              </li>
              <li className="md:ml-8 md:my-0 my-12">
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
              <li className="md:ml-8 md:my-0 my-12">
                {user ? (
                  <UserOptions user={user} />
                ) : (
                  <Link href="/login">
                    <Button>Login</Button>
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
