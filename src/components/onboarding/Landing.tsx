import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

interface LandingProps {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Landing = React.forwardRef<HTMLDivElement, LandingProps>(
  function Land({toggle,setToggle}, ref) {
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
