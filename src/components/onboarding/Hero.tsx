import React from 'react';
import CTA from './CTA';


const Hero = () => {
  return (
    <div className=" w-full flex justify-between h-[380px] items-center flex-col px-[60px]">
      <div className="text-white text-center font-black text-[40px]">
        Start selling with Hajurbuwa
      </div>
      <div className="text-gray-250 text-center text-xs leading-snug tracking-wider">
        Are you a seller looking for a platform to showcase your products and
        reach a wider audience and sell your products on bulk, wholesale
        business price?
      </div>
      <CTA/>
      <div className="font-bold text-lg text-white">
        Learn More
      </div>
    </div>
  );
};

export default Hero;
