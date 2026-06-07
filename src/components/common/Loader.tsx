import React from 'react';
import Image from 'next/image';
import logo from '../../../public/icons/hajurbuwa-logo.svg';

const Loader = () => {
  return (
    <div className="flex items-center justify-center mt-[300px] motion-safe:animate-bounce">
      <Image height={300} width={300} src={logo} alt="logo" />
    </div>
  );
};

export default Loader;
