import React from 'react';
import deliveryIllustration from '/public/images/delivery.svg';
import Image from 'next/image';

const Intersection = () => {
  return (
    <>
      <div className="absolute h-[2306px] w-[2306px] md:h-[8927px] md:w-[8927px] rounded-full bg-white top-[567px] left-[-658px] md:top-[444px] md:left-[-2324px] xl:w-[5075px] xl:h-[5075px] xl:left-[-945px] xl:top-[524px] z-10 overflow-hidden"></div>
      <div className="absolute top-[490px] h-[502px] w-[720px] left-[-160px] md:top-[457px] md:left-[-40px] md:h-[1024px] md:w-[1475px] xl:left-[248px] xl:top-[350px] z-10">
        <Image src={deliveryIllustration} alt={'Delivery'} layout="fill" />
      </div>
    </>
  );
};

export default Intersection;
