import React from 'react';
import deliveryIllustration from '/public/images/delivery.svg';
import Image from 'next/image';

const Intersection = () => {
  return (
    <>
      <div className="absolute h-[2306px] w-[2306px] rounded-full bg-white top-[567px] left-[-658px] z-10 overflow-hidden"></div>
      <div className="absolute top-[496px] z-10">
        <Image src={deliveryIllustration} alt={'Delivery'} />
      </div>
    </>
  );
};

export default Intersection;
