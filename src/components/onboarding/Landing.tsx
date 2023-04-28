import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

const Landing = React.forwardRef<any, any>(function Land(
  {
    toggle,
    setToggle,
  }: {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  },
  ref
) {
  return (
    <div
      className={`${
        toggle ? 'h-screen' : 'h-[800px]'
      } lg:h-[990px] xl:h-[1090px] pb-96 w-full bg-blue-700 z-0`}
    >
      <Navbar toggle={toggle} setToggle={setToggle} />
      <Hero ref={ref} />
    </div>
  );
});

export default Landing;
