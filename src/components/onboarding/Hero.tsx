import React from 'react';
import CTA from './CTA';

const Hero = () => {
  return (
    <div className=" w-full flex justify-evenly h-full items-center md:items-start flex-col px-[60px] md:px-[100px]">
      <div className="text-white text-center font-black text-[40px] md:text-[90px] xl:text-[75px] md:w-[687px] md:h-[180px] md:text-left leading-none mt-10">
        Start selling with Hajurbuwa
      </div>
      <div className="text-gray-250 text-center md:text-left text-xs md:text-xl md:w-[687px] leading-snug tracking-wider mt-4">
        Are you a seller looking for a platform to showcase your products and
        reach a wider audience and sell your products on bulk, wholesale
        business price?
      </div>
      <CTA />
      <div className="flex flex-row items-center justify-start text-white px-[35px] py-[14px] mt-2 md:mt-4">
      <div className="flex flex-col px-4">
        <div className="text-[20px] font-medium">Learn More</div>
      </div>
    </div>
    </div>
  );
};

export default Hero;
