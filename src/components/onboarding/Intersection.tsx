import React from 'react';
import deliveryIllustration from '/public/images/delivery.svg';
import Image from 'next/image';

const Intersection = () => {
  return (
    <>
      <div className="absolute h-[2306px] w-[2306px] md:h-[6695px] md:w-[6695px] md:left-[-2230px] md:top-[600px] lg:h-[8927px] lg:w-[8927px] rounded-full bg-white top-[567px] left-[-658px] lg:top-[444px] lg:left-[-2324px] xl:w-[5075px] xl:h-[5075px] xl:left-[-945px] xl:top-[524px]  3xl:h-[11827px] 3xl:w-[11902px] 3xl:top-[458px] 3xl:left-[-3580px]  z-10 overflow-hidden"></div>
      <div className="absolute top-[490px] h-[502px] w-[720px] left-[-160px] md:left-[-144px] md:top-[480px] md:w-[1100px] md:h-[766px] lg:top-[457px] lg:left-[-40px] lg:h-[1024px] lg:w-[1475px] xl:left-[248px] xl:top-[350px] 3xl:w-[1961px] 3xl:h-[1358px] 3xl:top-[156px] 3xl:left-[439px] z-10">
        <Image src={deliveryIllustration} alt={'Delivery'} layout="fill" />
      </div>
    </>
  );
};

export default Intersection;
