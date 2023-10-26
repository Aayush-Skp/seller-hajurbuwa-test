import Navbar from '../components/onboarding/Navbar';
import Vertical from '/public/images/404vertical.svg';
import Horizontal from '/public/images/404horizontal.svg';
import hajurbuwaNotFound from '/public/images/Old_Man_Glasses.svg';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="h-screen w-screen relative bg-blue-900 overflow-hidden">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start lg:px-[100px] xl:pl-[0px] 2xl:px-[200px] 3xl:px-[0px] lg:pt-[30px] lg:justify-start">
        <div className="flex justify-center lg:justify-start lg:items-start lg:w-4/5 2xl:w-1/2 items-center flex-col text-center lg:text-left mt-20 md:mt-0 px-8 md:px-[100px] lg:px-[0px] xl:px-[100px] ">
          <div className="font-bold text-[20px] md:text-[30px] 2xl:text-[40px] text-white leading-none my-2">
            You can see this?
          </div>
          <div className="font-bold text-[40px] md:text-[60px] lg:text-[75px] text-white leading-none my-2">
            But Hajurbuwa cannot.
          </div>
          <div className="text-[12px] md:text-[16px] lg:text-[20px] text-white my-2 leading-normal tracking-wide">
            The page you are looking for may have been moved, deleted, or
            possibly never existed.
          </div>
          <div className="flex flex-row items-center justify-start bg-black text-white px-[35px] py-[14px] mt-4 lg:mt-8 rounded-full border-white border-2">
            <div className="flex flex-col px-4">
             <Link href="/"><div className="text-[20px] font-medium cursor-pointer">Return Home</div></Link> 
            </div>
          </div>
        </div>
        <div className="flex relative justify-center items-center h-[400px] w-[250px] md:h-[480px] md:w-[320px] lg:mt-[200px] lg:h-[600px] lg:w-[500px] xl:mt-[0px] xl:w-[659px] xl:h-[720px]">
          <div className="h-full w-full flex xl:hidden">
            <Image src={Vertical} alt="404 Image" />
          </div>
          <div className="h-full w-full hidden xl:flex">
            <Image src={Horizontal} alt="404 Image" />
          </div>
          <div className="absolute h-[234px] w-[131px] md:w-[207px] md:h-[370] left-[0px] top-[100px] md:top-[50px] md:left-[-70px] lg:top-[150px] lg:left-[-100px] xl:top-[400px] xl:left-[-150px]">
            <Image src={hajurbuwaNotFound} alt="Hajurbuwa Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
