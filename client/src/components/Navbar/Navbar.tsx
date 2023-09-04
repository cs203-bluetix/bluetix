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
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

	const navRef = useRef<HTMLElement | null>(null);

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

  return (
    <>
      <div id="root" className={`props.classProps px-3 py-6 `}>
        <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-wrap justify-between items-center">
            <Link href="/" className="text-3xl font-bold">
              BlueTix
            </Link>
            <nav ref={navRef}>
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
      </div>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Navbar;
