import phone from '/public/icons/phone.svg';
import mail from '/public/icons/mail.svg';
import hajurbuwaVector from '/public/images/hajurbuwa_vector.svg';
import facebook from '/public/icons/facebook_icon.svg';
import twitter from '/public/icons/twitter_icon.svg';
import linkedin from '/public/icons/linkedin_icon.svg';
import youtube from '/public/icons/youtube_icon.svg';
import instagram from '/public/icons/instagram_icon.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getAllPolicies } from '../../services/policyService';
import Link from 'next/link';

const Footer = ({toggle}: {toggle: boolean}) => {
  const [policies, setPolicies] = useState<any>();
  useEffect(() => {
    getAllPolicies()
      .then((res) => setPolicies(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    !toggle ? <>
      <div className="relative h-[400px] lg:h-[459px] xl:h-[381px] md:h-[520px] 3xl:h-[381px] 3xl:px-[200px] w-full bg-blue-800 text-white p-10 md:px-[100px] z-20">
        <div className="absolute flex justify-end bottom-14 lg:bottom-15 xl:bottom-0 3xl:bottom-0 md:bottom-4 right-2 lg:right-10 h-[167px] w-[167px] md:h-[300px] md:w-[300px] lg:h-[375px] lg:w-[375px] ">
          <Image src={hajurbuwaVector} alt={'hajurbuwa vector image'} />
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col justify-start items-start w-full">
            <div className="flex flex-col justify-start items-start text-left w-full">
              <div className="text-base md:text-2xl font-black mb-2">
                Platform
              </div>
              <a href="https://hajurbuwa.com" className="mb-2 text-xs md:text-xl">Hajurbuwa.com</a>
              <Link href="/login"><a><div className="mb-2 text-xs md:text-xl">Login as seller</div></a></Link>
              <Link href="/register"><a> <div className="mb-2 text-xs md:text-xl">Register as seller</div> </a></Link>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center ml-4 h-full">
            <div className="flex flex-col justify-start items-start text-left w-full mt-4">
              <div className="text-base md:text-2xl font-black mb-2">
                Policy
              </div>
              {policies &&
                policies.map((policy: any) => {
                  return (
                    <Link key={policy.id} href={`https://hajurbuwa.com/policies/${policy.slug}`}>
                    <div className="mb-2 text-xs md:text-xl cursor-pointer">
                      {policy.name}
                    </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row xl:flex-col justify-between lg:justify-start items-center h-full mt-4 xl:mt-0 w-full lg:col-span-2 xl:col-span-1">
            <div className="flex flex-col justify-start items-start text-left w-full">
              <div className="text-base md:text-2xl font-black mb-4">
                Contact Us
              </div>
              <a href="tel:+9779863437590" className="mb-2 text-xs md:text-xl flex w-full justify-start items-center cursor-pointer">
                <Image src={phone} alt={"Phone Icon"} />
                <div className="ml-3">+977 986-3437590</div>
              </a>
              <a href="mailto:info@hajurbuwa.com" className="mb-2 text-xs md:text-xl flex w-full justify-start items-center cursor-pointer">
                <Image src={mail} alt={"Mail Icon"} />
                <div className="ml-2">info@hajurbuwa.com</div>
              </a>
            </div>
            <div className="flex flex-col justify-center items-start text-left w-full mt-4 md:mt-0 xl:mt-4 h-full">
              <div className="text-base md:text-2xl font-black mb-2">
                Follow us on
              </div>
              <div className="mt-2 w-full lg:w-3/4 xl:w-1/2 flex justify-between items-end">
                <a href="https://www.facebook.com/hajurbuwab2b">
                  <Image
                    className="cursor-pointer"
                    src={facebook}
                    alt={facebook}
                  />
                </a>
                <a href="https://twitter.com/hajurbuwab2b">
                  <Image
                    className="cursor-pointer"
                    src={twitter}
                    alt={twitter}
                  />
                </a>
                <a href="https://www.linkedin.com/company/77363460">
                  <Image
                    className="cursor-pointer"
                    src={linkedin}
                    alt={linkedin}
                  />
                </a>
                <a href="https://www.youtube.com/@hajurbuwa">
                  <Image
                    className="cursor-pointer"
                    src={youtube}
                    alt={youtube}
                  />
                </a>
                <a href="https://www.instagram.com/hajurbuwab2b/">
                  <Image
                    className="cursor-pointer"
                    src={instagram}
                    alt={instagram}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full text-[10px] md:text-[18px] md:mt-12 font-medium">
          Copyright 2023 &copy; Hajurbuwa , All Rights Reserved.
        </div>
      </div>
    </>: null
  );
};

export default Footer;
