import React from 'react';
import Navbar from '../onboarding/Navbar';
import Hero from './Hero';

const Landing = () => {
  return (
    <div className="relative h-[700px] w-full bg-blue-700 z-0">
      <Navbar />
      <Hero />
    </div>
  );
};

export default Landing;
