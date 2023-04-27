import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../constants/publicRoutes';
import Navbar from './NavBar';

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
    <div className="">
      {!isRoutePublic ? (
        <div className="flex flex-col justify-between w-full">
          <Navbar />
          <div className="mt-[112px]">{children}</div>
        </div>
      ) : (
        <div>
          {children}
          {/* <div className="flex justify-center w-full">
            <span className="text-black">© 2023, Hajurbuwa.com</span>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PageWrapper;
