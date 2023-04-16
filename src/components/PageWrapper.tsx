import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { publicRoutes } from '../constants/publicRoutes';
import Navbar from './NavBar';
import { httpClient } from '../config/httpClient';

type PageWrapperProps = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isRoutePublic, setIsRoutePublic] = useState(true);
  const [accessObj, setAccessObj] = useState({
    user: {},
    token: '',
    grantAccess: false,
    isRoutePublic: true,
  });

  const router = useRouter();

  useEffect(() => {
    const isRoutePublic = publicRoutes.includes(router.pathname);

    setIsRoutePublic(isRoutePublic);
    // const token = localStorage.getItem('token');

    // if (token && !isRoutePublic) {
    //   setAccessObj({
    //     user: {},
    //     token,
    //     grantAccess: true,
    //     isRoutePublic: false,
    //   });
    // }

    // if (!token) {
    //   setAccessObj({
    //     user: {},
    //     token: '',
    //     grantAccess: false,
    //     isRoutePublic: true,
    //   });
    // }
  }, [router]);

  // if (!accessObj.grantAccess) return <div>Loading...</div>;

  // if (accessObj.grantAccess) {
  //   return (
  //     <div>
  //       {accessObj.isRoutePublic ? (
  //         <div>{children}</div>
  //       ) : (
  //         <div>
  //           <Navbar />
  //           {children}
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

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
