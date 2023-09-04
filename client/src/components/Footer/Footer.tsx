import React from "react";
import { Facebook, Instagram, Pinterest, Youtube } from "react-bootstrap-icons";
import { BsCCircle } from "react-icons/bs";

const Footer = () => {
  const dummyUrl = "http://localhost:3000/404"; // Replace with a valid 404 URL
  return (
    <div className="bg-[#3D7BBD] p-8 z-50 text-white w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="pb-5">
          <div className="py-2 uppercase text-2xl font-bold">About</div>
          <a href={dummyUrl}>
          <div className="py-2">About Us</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Contact Us</div>
          </a>
        </div>
        <div className="pb-5">
          <a href={dummyUrl}>
          <div className="py-2 uppercase text-2xl font-bold">Categories</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Trending</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Music</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Sports</div>
          </a>
          <a href={dummyUrl}>
          <div className="py-2">Local acts</div>
          </a>
        </div>
        <div className="pb-5">
        <a href={dummyUrl}>
          <div className="py-2 uppercase text-2xl font-bold">Find Us</div>
        </a>
          <div className="flex py-2">
          <a href={dummyUrl} className="me-6">
            <Facebook />
          </a>
          <a href={dummyUrl} className="me-6">
            <Instagram />
          </a>
          <a href={dummyUrl} className="me-6">
            <Pinterest />
          </a>
          <a href={dummyUrl}>
            <Youtube />
          </a>
          </div>
        </div>
        <div className="pb-5">
            <div className="text-darkgrey py-2 uppercase">Join Us</div>
            <div className="py-2">Sign up here</div>
          <input
            type="text"
            placeholder="Enter your email address"
            className="p-2 focus:border-grey focus:border focus:ring-0 my-2 text-sm w-full border-grey border"
          />
          <button className="box-border text-sm my-2 py-2 px-6 border-[1px] tracking-[1px] flex border-solid border-white">
          <a href={dummyUrl}>
            <div className="uppercase flex items-center justify-center">
              Sign Up
            </div>
          </a>
          </button>
        </div>
      </div>
      <div className="flex mt-10">
        <span className="flex items-center pe-3">
          <BsCCircle />{" "}
        </span>
        <span className="text-xs uppercase text-center">
          {" "}
          2023 BlueTix
        </span>
      </div>
    </div>
  );
};

export default Footer;
