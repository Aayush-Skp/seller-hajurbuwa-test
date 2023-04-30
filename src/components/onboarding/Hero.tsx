import React from 'react';
import CTA from './CTA';

const Hero = React.forwardRef<any, any>(function Hero(_, ref) {

  return (
    <div className=" w-full flex justify-evenly h-full items-center lg:items-start flex-col px-[60px] lg:px-[100px]">
      <div className="text-white text-center font-black text-[40px] md:text-[70px] lg:text-[90px] xl:text-[75px] lg:w-[687px] lg:h-[180px] lg:text-left leading-none mt-10">
        Start selling with Hajurbuwa
      </div>
      <div className="text-gray-250 text-center lg:text-left text-xs md:text-base lg:text-xl lg:w-[687px] leading-snug tracking-wider mt-4">
        Are you a seller looking for a platform to showcase your products and
        reach a wider audience and sell your products on bulk, wholesale
        business price?
      </div>
      <CTA />
      {/* <Link href="/login">
        <a>
          <div className="flex flex-row items-center justify-start text-white hover:text-black hover:bg-white px-[35px] py-[14px] mt-2 lg:mt-4 rounded-full">
            <div className="flex flex-col px-4">
              <div className="text-[20px] font-medium z-20">
                <button className="cursor-pointer">
                  Login
                </button>
              </div>
            </div>
          </div>
        </a>
      </Link> */}
    </div>
  );
});

export default Hero;
