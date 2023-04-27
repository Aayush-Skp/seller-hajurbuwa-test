import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

const Landing = ({ toggle, setToggle }: { toggle: boolean, setToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className={`${toggle ? "h-screen" : "h-[800px]"} lg:h-[990px] xl:h-[1090px] pb-96 w-full bg-blue-700 z-0`}>
      <Navbar toggle={toggle} setToggle={setToggle} />
      <Hero />
    </div>
  );
};

export default Landing;