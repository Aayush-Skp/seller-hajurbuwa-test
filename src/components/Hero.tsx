import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';

type HeroProps = {
  openOrders: number;
  todaysSales: number;
  onlineProducts: number;
};

const Hero = ({ openOrders, todaysSales, onlineProducts }: HeroProps) => {
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
          Welcome, Bishal!
        </h1>
        <div className="detailsCTA flex items-start justify-start w-1/2">
          <div className="flex flex-col items-start justify-start w-96 bg-white m-2 p-2">
            <h1 className="text-base text-black">Open Orders</h1>
            <div className="w-full flex items-center justify-between pr-2">
              <h1 className="text-xxxl text-black">{openOrders}</h1>
              <FaChevronDown />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-96 bg-white m-2 p-2">
            <h1 className="text-base text-black">Today&apos;s Sales</h1>
            <div className="w-full flex items-center justify-between pr-2">
              <h1 className="text-xxxl text-black">{`NPR ${todaysSales}`}</h1>
              <FaChevronDown />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-96 bg-white m-2 p-2">
            <h1 className="text-base text-black">Total Products Online</h1>
            <div className="w-full flex items-center justify-between pr-2">
              <h1 className="text-xxxl text-black">{onlineProducts}</h1>
              <FaChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
