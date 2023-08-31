import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="fixed w-full h-16 px-3 z-50 bg-transparent text-[#3D7BBD] -z-1">
      <div className="flex flex-wrap justify-between items-center h-full w-full px-20 2xl:px-16">
        <div>  <Link href='/' className="text-4xl font-bold ml-10"> BlueTix</Link>
        </div>
        <div className="w-1/3 flex justify-between items-center">
          <Link href='/'> About Us </Link>
          <Link href='/'> Events </Link>
          <Link href='/'> Venues </Link>
          <Link href='/'> FAQ </Link>
          <button className="bg-gradient-to-br from-cyan-200 to-blue-600 opacity-80 px-4 py-1 rounded-lg">
            Log In
          </button>
        </div>


      </div>

    </nav>
  );
}

export default Navbar;
