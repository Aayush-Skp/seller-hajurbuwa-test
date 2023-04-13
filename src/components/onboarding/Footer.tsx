import phone from "/public/icons/phone.svg";
import mail from "/public/icons/mail.svg";
import hajurbuwaVector from "/public/images/hajurbuwa_vector.svg";
import facebook from "/public/icons/facebook_icon.svg";
import twitter from "/public/icons/twitter_icon.svg";
import linkedin from "/public/icons/linkedin_icon.svg";
import youtube from "/public/icons/youtube_icon.svg";
import instagram from "/public/icons/instagram_icon.svg";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="relative h-[400px] md:h-[641px] lg:h-[435px] w-full bg-blue-800 text-white p-10 md:px-[100px] z-20">
        <div className="absolute flex justify-end bottom-14 md:bottom-28 lg:bottom-4 right-2 md:right-10 h-[167px] w-[167px] md:h-[300px] md:w-[300px] lg:h-[375px] lg:w-[375px]">
          <Image src={hajurbuwaVector} alt={"hajurbuwa vector image"} />
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col justify-start items-start w-full">
          <div className="flex flex-col justify-start items-start text-left w-full">
              <div className="text-base md:text-2xl font-black mb-2">
              Platform
              </div>
              <div className="mb-2 text-xs md:text-xl">Hajurbuwa.com</div>
              <div className="mb-2 text-xs md:text-xl">Login as seller</div>
              <div className="mb-2 text-xs md:text-xl">Register as seller</div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center ml-4 h-full">
            <div className="flex flex-col justify-start items-start text-left w-full">
              <div className="text-base md:text-2xl font-black mb-2">
                Policy
              </div>
              <div className="mb-2 text-xs md:text-xl">Terms of Use</div>
              <div className="mb-2 text-xs md:text-xl">Privacy Policy</div>
              <div className="mb-2 text-xs md:text-xl">Product Listing Policy</div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row xl:flex-col justify-between md:justify-start items-center h-full mt-4 xl:mt-0 w-full md:col-span-2 xl:col-span-1">
            <div className="flex flex-col justify-start items-start text-left w-full">
              <div className="text-base md:text-2xl font-black mb-4">
                Contact Us
              </div>
              <div className="mb-2 text-xs md:text-xl flex w-full justify-start items-center">
                <Image src={phone} alt={"Phone Icon"} />
                <div className="ml-3">+977 986-3437590</div>
              </div>
              <div className="mb-2 text-xs md:text-xl flex w-full justify-start items-center">
                <Image src={mail} alt={"Mail Icon"} />
                <div className="ml-2">info@hajurbuwa.com</div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start text-left w-full mt-4 md:mt-0 xl:mt-4 h-full">
              <div className="text-base md:text-2xl font-black mb-2">
                Follow us on
              </div>
              <div className=" w-full lg:w-3/4 xl:w-1/2 flex justify-between items-end">
                <Image src={facebook} alt={facebook} />
                <Image src={twitter} alt={twitter} />
                <Image src={linkedin} alt={linkedin} />
                <Image src={youtube} alt={youtube} />
                <Image src={instagram} alt={instagram} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full text-[10px] md:text-[18px] lg:mt-12 font-medium">
          Copyright 2023 &copy; Hajurbuwa , All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;