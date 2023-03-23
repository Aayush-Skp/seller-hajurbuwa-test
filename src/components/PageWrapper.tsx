import React from 'react';
import Navbar from './NavBar';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  return (
    <div className="">
      <Navbar />
      <div className="mt-[112px]">{children}</div>
    </div>
  );
};

export default PageWrapper;
