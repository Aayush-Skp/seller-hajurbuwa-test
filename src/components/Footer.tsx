import React from 'react';
import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="flex flex-col justify-center w-full  bg-accent-secondary px-48 h-96 xxl:px-48 xxl:h-96 xl:px-32 xl:h-96 lg:px-24 lg:h-96 md:px-20 md:h-full sm:px-18 sm:h-full xs:w-full xs:h-full xs:px-4 xxs:px-4">
        <div className="grid xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 gaps-2 xs:pt-24 xs:w-full xs:gaps-3 xxl:pl-20 xxl:max-w-screen-2xl xl:pl-18 xl:max-w-screen-2xl lg:pl-16 md:pl-14 sm: pl-12 xs:pl-4 xss:pl-2">
          <div className="flex flex-col items-start justify-start">
            <div className="text-3xl font-bold text-white pb-6 mt-3">
              Platform
            </div>
            <div className="text-white">Hajurbuwa.com</div>
            <div className="text-white">Login as Seller</div>
            <div className="text-white">Register as Seller</div>
          </div>
          <div className="flex flex-col items-start justify-start xs:mt-3">
            <div className="text-3xl font-bold text-white pb-6">About Us</div>
            <div className="text-white">Terms of Use</div>
            <div className="text-white">Privacy Policy</div>
            <div className="text-white">Product Listing Policy</div>
          </div>
          <div className="flex flex-col items-start justify-start xs:mt-3">
            <div className="text-3xl font-bold text-white pb-6">Contact</div>
            <div className="text-white">+977 986-3437590</div>
            <div className="text-white">info@hajurbuwa.com</div>
          </div>
        </div>
        <div className="flex items-between justify-between pt-10 xxl:px-20 xl:pr-18 lg:pr-16 md:pr-12 sm:pr-12 sm:flex-col sm:pl-12 xxl:flex-row xl:flex-row lg:flex-row xs:flex-col-reverse xs:pl-0">
          <div className="text-white pt-6 md:text-xl sm:text-xs">
            Copyright 2023 &copy; Hajurbuwa, All Rights Reserved.
          </div>
          <div className="flex justify-between text-white pt-6 xxl:pr-32 xl:pr-24 lg:pr-20 md:pr-18 sm:pr-16 xxl:w-1/3 xl:w-1/3 lg:w-2/3 sm:w-full sm:pb-10 xs:px-0 xs:w-full ">
            <Link
              href="https://www.facebook.com/hajurbuwa"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook className="text-5xl pl-4" />
            </Link>
            <Link
              href="https://twitter.com/hajurbuwa"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter className="text-5xl pl-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/hajurbuwa"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="text-5xl pl-4" />
            </Link>
            <Link
              href="https://www.youtube.com/channel/UCZ1Z2Z1Z2Z1Z2Z1Z2Z1Z2Z1"
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube className="text-5xl pl-4" />
            </Link>
            <Link
              href="https://www.instagram.com/hajurbuwa/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="text-5xl pl-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
