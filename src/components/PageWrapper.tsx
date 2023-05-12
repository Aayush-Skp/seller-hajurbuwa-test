import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../constants/publicRoutes';
import Navbar from './NavBar';
import Footer from './common/Footer';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isRoutePublic, setIsRoutePublic] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const isRoutePublic = publicRoutes.includes(router.pathname);
    setIsRoutePublic(isRoutePublic);
  }, [router]);

  return (
    <>
      <div className="">
        {!isRoutePublic ? (
          <div className="flex flex-col justify-between w-full min-h-screen">
            <Navbar />
            <div className="mt-[112px] mb-[112px]">{children}</div>
            <Footer />
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </>
  );
};

export default PageWrapper;
