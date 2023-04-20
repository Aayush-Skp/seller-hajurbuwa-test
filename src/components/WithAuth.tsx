import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../config/httpClient';
import { publicRoutes } from '../constants/publicRoutes';

export default function authenticatedRoute(Component: any = null) {
  function Auth() {
    const [access, setAccess] = useState({
      grantAccess: false,
      token: '',
    });

    const router = useRouter();

    useEffect(() => {
      // if (publicRoutes)
      try {
        const token = localStorage.getItem('token');

        if (token) {
          httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
          setAccess({
            grantAccess: true,
            token,
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
