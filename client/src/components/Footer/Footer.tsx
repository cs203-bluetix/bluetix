import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandPinterest,
  IconBrandYoutube,
} from "@tabler/icons-react";
import React from "react";
import { BsCCircle } from "react-icons/bs";

const Footer = () => {
  const dummyUrl = "http://localhost:3000/404"; // Replace with a valid 404 URL
  return (
    <div className="z-50 bg-[#3D7BBD] p-8 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <div className="pb-5">
          <div className="py-2 text-2xl font-bold uppercase">About</div>
          <a href={dummyUrl}>
            <div className="py-2">About Us</div>
          </a>
          <a href={dummyUrl}>
            <div className="py-2">Contact Us</div>
          </a>
        </div>
        <div className="pb-5">
          <a href={dummyUrl}>
            <div className="py-2 text-2xl font-bold uppercase">Categories</div>
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
            <div className="py-2 text-2xl font-bold uppercase">Find Us</div>
          </a>
          <div className="flex py-2">
            <a href={dummyUrl} className="me-6">
              <IconBrandFacebook />
            </a>
            <a href={dummyUrl} className="me-6">
              <IconBrandInstagram />
            </a>
            <a href={dummyUrl} className="me-6">
              <IconBrandPinterest />
            </a>
            <a href={dummyUrl}>
              <IconBrandYoutube />
            </a>
          </div>
        </div>
        <div className="pb-5">
          <div className="text-darkgrey py-2 uppercase">Join Us</div>
          <div className="py-2">Sign up here</div>
          <input
            type="text"
            placeholder="Enter your email address"
            className="focus:border-grey border-grey my-2 w-full border p-2 text-sm focus:border focus:ring-0"
          />
          <button className="my-2 box-border flex border-[1px] border-solid border-white px-6 py-2 text-sm tracking-[1px]">
            <a href={dummyUrl}>
              <div className="flex items-center justify-center uppercase">
                Sign Up
              </div>
            </a>
          </button>
        </div>
      </div>
      <div className="mt-10 flex">
        <span className="flex items-center pe-3">
          <BsCCircle />{" "}
        </span>
        <span className="text-center text-xs uppercase"> 2023 BlueTix</span>
      </div>
    </div>
  );
};

export default Footer;
