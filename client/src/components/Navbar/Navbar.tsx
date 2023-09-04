import Link from "next/link";
import React, { useRef, useState } from "react";
import { Button } from "utils/Button";
import LoginModal from "utils/LoginModal";
import { FaBars, FaTimes } from "react-icons/fa";


interface NavbarProps {
  classProps?: string;
  // other props...
}

function Navbar(props: NavbarProps) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openModal = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div id="root" className={`${props.classProps} fixed top-0 left-0 inset-x-0 shadow-md z-50 bg-white`}>
        <nav className="md:flex justify-between items-center mx-auto max-w-screen-lg bg-white py-4 md:px-3 px-7">
          <Link href="/" className="text-3xl font-bold ">
            BlueTix
          </Link>

          <div onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden">
            {
              isOpen ? <FaTimes className="w-full h-full"/> : <FaBars className="w-full h-full"/>
            }
            </div>

          <ul className={`navbar md:flex md:items-center md:pb-0 pb-12 font-medium text-2xl md:text-[1rem] absolute md:static bg-white md:z-auto z-[-1] left-0 w-full h-screen md:w-auto md:h-auto md:pl-0 pl-9 transition-all duration-400 ease-in ${isOpen ? 'top-12' : 'top-[-1024px]'}`}>
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
            <li className="md:ml-8 md:my-0 my-12">
              <div className="hidden md:block">
              <Button onClick={toggleModal}>
                {/* <Link href="/login"> */}
                Login
                {/* </Link> */}
              </Button>
              </div>
              <div className="block md:hidden">
              <a href="#" onClick={openModal}>Login</a>

</div>
            </li>
          </ul>

          <style jsx>
            {`
            .navbar :global(li:not(:first-child)) {
              margin-top: 0;
            }

            .navbar :global(li:not(:last-child)) {
              margin-right: 1.25rem;
            }

          `}
          </style>
        </nav>
      </div>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Navbar;
