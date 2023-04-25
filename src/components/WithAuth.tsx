import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../config/httpClient';

export default function authenticatedRoute(Component: any = null) {
  function Auth() {
    const [access, setAccess] = useState<any>({
      grantAccess: false,
      userDetails: {},
    });

    const router = useRouter();

    useEffect(() => {
      try {
        let userDetails: any = localStorage.getItem('userDetails');

        if (typeof userDetails === 'string') {
          userDetails = JSON.parse(userDetails);
        }

        if (userDetails?.token) {
          httpClient.defaults.headers.common.Authorization = `Bearer ${userDetails?.token}`;
          setAccess({
            grantAccess: true,
            userDetails,
          });
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.log(err);
      }
    }, [router]);

    if (!access.grantAccess) return <div>Loading...</div>;

    return (
      <>
        <Component />
      </>
    );
  }

  return Auth;
}
