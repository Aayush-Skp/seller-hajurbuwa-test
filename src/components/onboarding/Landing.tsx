import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';

const Landing = () => {
  return (
    <div className="h-[800px] md:h-[990px] xl:h-[1090px] pb-96 w-full bg-blue-700 z-0">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Landing;
