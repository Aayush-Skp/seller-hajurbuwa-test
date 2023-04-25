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
        <>
          <Navbar />
          <div className="mt-[112px]">{children}</div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default PageWrapper;
