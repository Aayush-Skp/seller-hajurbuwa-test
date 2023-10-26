import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeroProps = {
  openOrders: number;
  todaysSales: number;
  onlineProducts: number;
};

const Hero = ({ openOrders, todaysSales, onlineProducts }: HeroProps) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    try {
      const storageValue = localStorage.getItem('userDetails');

      if (typeof storageValue === 'string') {
        const details = JSON.parse(storageValue);
        setUser(details?.first_name);
      }
    } catch (err) {}
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-72 flex">
      <div className="inset-0 absolute">
        <Image
          src="/hero.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          style={{ borderBottomLeftRadius: '15rem' }}
        />
      </div>
      <div
        className="absolute overlay inset-0 bg-accent-primary h-72 w-full overflow-hidden opacity-75"
        style={{ borderBottomLeftRadius: '15rem' }}
      ></div>
      <div className="relative content-center h-full w-full flex flex-col justify-center items-start pl-48">
        <h1 className="text-6xl w-full font-bold text-white">
          Welcome, {user}!
        </h1>
        <div className="detailsCTA flex items-start justify-start w-1/2">
          <Link href="/order-management">

            <div className="flex flex-col items-start justify-start whitespace-nowrap bg-white m-2 p-2">
              <h1 className="text-base text-black">Open Orders</h1>
              <div className="w-full flex items-center justify-between pr-2">
                <h1 className="text-xxxl w-full text-center text-black">
                  {openOrders}
                </h1>
              </div>
            </div>

          </Link>
          <Link href="/finance">

            <div className="flex flex-col items-start justify-start whitespace-nowrap bg-white m-2 p-2">
              <h1 className="text-base text-black">Today&apos;s Sales</h1>
              <div className="w-full flex items-center justify-between pr-2">
                <h1 className="text-xxxl text-center w-full text-black">{`NPR ${todaysSales}`}</h1>
              </div>
            </div>

          </Link>
          <Link href="/product-management">

            <div className="flex flex-col items-start justify-start whitespace-nowrap bg-white m-2 p-2">
              <h1 className="w-full text-base text-black">
                Total Products Online
              </h1>
              <div className="w-full flex items-center justify-between pr-2">
                <h1 className="text-xxxl w-full text-center text-black">
                  {onlineProducts}
                </h1>
              </div>
            </div>

          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
