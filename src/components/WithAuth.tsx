import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { httpClient } from '../config/httpClient';

export default function authenticatedRoute(Component: any = null) {
  function Auth() {
    const [access, setAccess] = useState({
      grantAccess: false,
      token: '',
    });

    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;

      token
        ? setAccess({
            grantAccess: true,
            token: token,
          })
        : router.push('/login');
    }, []);

    if (!access.grantAccess) return <div>Loading...</div>;

    return (
      <>
        <Component />
      </>
    );
  }

  return Auth;
}
