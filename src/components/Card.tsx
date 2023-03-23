import React from 'react';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  imageSrc: any;
}

const Card = ({ title, description, imageSrc }: CardProps) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md xs:h-full md:h-3/4 w-full">
      <div className=" px-4 pt-4 text-xxl font-bold text-black">{title}</div>
      <div className="flex md:flex-row xs:flex-col relative h-64 xs:h-56 w-full">
        <p className="px-4 pb-4 text-black text-sm xl:text-sm xs:text-xs ">
          {description}
        </p>
        <Image
          src={imageSrc}
          alt={title}
          className="xxl:w-full xxl:h-full xs:h-2/5 xs:w-96 md:ml-0 md:h-32 md:w-32 ld:h-40 lg:w-40 md:bottom-0 md:right-0 inset-0 relative"
          height={300}
          width={500}
        />
      </div>
    </div>
  );
};

export default Card;
