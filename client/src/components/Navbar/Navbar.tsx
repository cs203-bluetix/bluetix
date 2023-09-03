import Link from "next/link";
import React, { useState } from "react";
import { Button } from "utils/Button";
import LoginModal from "utils/LoginModal";


function Navbar() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
    <div id="root" className="mx-auto max-w-screen-lg px-3 absolute inset-x-0 py-4 bg-opacity-70 backdrop-blur-lg">
      <div className="flex flex-wrap justify-between items-center">
        <Link href="/" className="text-3xl font-bold">
          BlueTix
        </Link>
        <nav>
          <ul className="navbar flex items-center font-medium">
            <li>
              <Link href="/aboutus">About</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/venues">Venues</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Button onClick={toggleModal}>
                {/* <Link href="/login"> */}
                  Log In
                {/* </Link> */}
              </Button>
            </li>
          </ul>
        </nav>

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
      </div>
    </div>
    
    <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Navbar;
