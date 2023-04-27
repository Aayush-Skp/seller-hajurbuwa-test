import Navbar from '../components/onboarding/Navbar';
import Wifi from '/public/images/wifi.svg';
import hajurbuwaNotFound from '/public/images/Old_Man_Network.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NetworkErrorPage = () => {
  const [toggle, setToggle] = useState(false)
  const router = useRouter();
  return (
    <div className="h-screen w-screen relative bg-blue-900 overflow-hidden">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start lg:px-[100px] xl:pl-[0px] 2xl:px-[200px] 3xl:px-[0px] lg:pt-[30px] lg:justify-start">
        <div className="flex justify-center lg:justify-start lg:items-start lg:w-4/5 2xl:w-1/2 items-center flex-col text-center lg:text-left mt-20 md:mt-0 px-8 md:px-[100px] lg:px-[0px] xl:px-[100px] ">
          <div className="font-bold text-[20px] md:text-[30px] 2xl:text-[40px] text-white leading-none my-2">
            Hajurbuwa is trying to reach you.
          </div>
          <div className="font-bold text-[40px] md:text-[60px] lg:text-[75px] text-white leading-none my-2">
            Network error.
          </div>
          <div className="text-[12px] md:text-[16px] lg:text-[20px] text-white my-2 leading-normal tracking-wide">
            Looks like the internet elves have gone on strike and left us with a
            network error. It&apos;s like trying to communicate with a teenager
            who&apos;s got their headphones on - you just can&apos;t get
            through!
          </div>
          <div className="flex flex-row items-center justify-start bg-black text-white px-[35px] py-[14px] mt-4 lg:mt-8 rounded-full border-white border-2">
            <div className="flex flex-col px-4">
              <div className="text-[20px] font-medium cursor-pointer" onClick={() => router.reload()}>Refresh</div>
            </div>
          </div>
        </div>
        <div className="flex relative justify-center items-center h-[400px] w-[250px] md:h-[480px] md:w-[320px] lg:mt-[200px] lg:h-[600px] lg:w-[500px] xl:mt-[0px] xl:w-[659px] xl:h-[720px]">
          <div className="h-full w-full flex">
            <Image src={Wifi} alt="500 Image" />
          </div>
          <div className="absolute h-[234px] w-[131px] md:w-[207px] md:h-[370] left-[0px] top-[100px] md:top-[50px] md:left-[-70px] lg:top-[150px] lg:left-[-100px] xl:top-[400px] xl:left-[-150px]">
            <Image src={hajurbuwaNotFound} alt="Hajurbuwa Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkErrorPage;
