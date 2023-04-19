import React from 'react';

const Hero = () => {
  return (
    <div className=" w-full flex justify-center h-full items-center flex-col px-[20px] lg:px-[100px] overflow-x-hidden">
      <div className="text-gray-250 uppercase text-center text-xs md:text-base lg:text-xl lg:w-[687px] leading-snug tracking-wider mt-4">
        Understanding our
      </div>
      <div className="text-white text-center font-black text-[40px] md:text-[70px] lg:text-[90px] xl:text-[75px] lg:w-[687px] lg:h-[180px] leading-none mt-5">
        Privacy Policy
      </div>
    </div>
  );
};

export default Hero;
