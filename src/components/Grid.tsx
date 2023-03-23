import React from 'react';
import Card from './Card';

const Grid = () => {
  const data = [
    {
      id: 1,
      title: 'Nationwide Exposure',
      description:
        'Get nationwide exposure and sell your products to a wide range of customers.',
      imageSrc: '/images/card-1.svg',
    },
    {
      id: 2,
      title: 'Seller Protection',
      description:
        'We provide top-notch security and protection provisions for our buyers. You can freely do online trade without much worrying about the privacy breach and data security, leave that to us. We use a high degree encryption system to protect your data and transactions.',
      imageSrc: '/images/card-2.svg',
    },
    {
      id: 3,
      title: 'Easy Product Listing',
      description:
        'Through our system, we provide easy and seamless creation of products on the Hajurbuwa platform- whether it is your own products or standard branded products.',
      imageSrc: '/images/card-3.svg',
    },
    {
      id: 4,
      title: 'Best Trade Practises',
      description:
        'Assistance provided for the prevalent trade practices in the industry, which may include requirements such as minimum order quantities for baskets, creation of product assortments, payment terms, as well as the introduction of new products.',
      imageSrc: '/images/card-4.svg',
    },
    {
      id: 5,
      title: 'Easy and secure payments',
      description:
        'We have a highly encrypted system to make your payments safe, secure, and fast. Settlements with best in class terms of trade with availability of faster settlements cycles as well.',
      imageSrc: '/images/card-5.svg',
    },
    {
      id: 6,
      title: 'Return and Refund policies',
      description:
        ' When it comes to returns, we strictly follow the policies set by the seller. This means that customers must comply with the specific conditions and requirements set by the seller in order for a return to be accepted. By doing so, we ensure that the return process is fair and consistent for all customers and sellers.',
      imageSrc: '/images/card-6.svg',
    },
  ];
  return (
    <div className="grid gap-4 xxl:grid-cols-3 md:grid-cols-2 p-10">
      {data.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          imageSrc={item.imageSrc}
        />
      ))}
    </div>
  );
};

export default Grid;
