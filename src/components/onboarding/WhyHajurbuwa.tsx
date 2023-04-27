import Image from 'next/image';
import React from 'react';
import nationwideExposure from '/public/icons/nationwide_exposure.svg';
import sellerProtection from '/public/icons/seller_protection.svg';
import easyProductListing from '/public/icons/easy_product_listing.svg';
import bestTradePractices from '/public/icons/best_trade_practices.svg';
import easyAndSecurePayments from '/public/icons/easy_and_secure_payment.svg';
import bestInClassLogistics from '/public/icons/best_in_class_logistics.svg';

const features = [
  {
    id: 1,
    name: 'Nationwide Exposure',
    image: nationwideExposure,
  },
  {
    id: 2,
    name: 'Seller Protection',
    image: sellerProtection,
  },
  {
    id: 3,
    name: 'Easy Product Listing',
    image: easyProductListing,
  },
  {
    id: 4,
    name: 'Best Trade Practices',
    image: bestTradePractices,
  },
  {
    id: 5,
    name: 'Easy & Secure Payment',
    image: easyAndSecurePayments,
  },
  {
    id: 6,
    name: 'Best-in-Class Logistics',
    image: bestInClassLogistics,
  },
];

const WhyHajurbuwa = () => {
  return (
    <div id="why" className="relative h-[1017px] md:h-[500px] lg:h-[500px] px-[40px] mt-[112px] md:mt-[250px] xl:mt-0 z-20 text-black">
      <div className="text-center xl:text-left font-medium text-3xl md:px-[100px]">
        Why Sell on <span className="font-bold xl:font-medium">Hajurbuwa?</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-4 gap-10 lg:gap-18 pl-2 lg:px-[100px] pt-6">
        {features.map((feature) => {
          const { id, name, image } = feature;
          return <Feature key={id} icon={image} name={name} />;
        })}
      </div>
    </div>
  );
};

type FeatureProps = {
  key: number;
  name: string;
  icon: any;
};

const Feature = (props: FeatureProps) => {
  const { name, icon } = props;
  return (
      <div className="flex justify-start items-center">
      <Image src={icon} alt={name} />
      <div className="ml-4 font-bold text-lg lg:text-2xl py-8">{name}</div>
    </div>
  );
};
export default WhyHajurbuwa;
