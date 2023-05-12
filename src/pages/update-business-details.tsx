import React from 'react';
import UpdateBusinessDetails from '../components/login/updateBusinessInfo';
import authenticatedRoute from '../components/WithAuth';
import Head from 'next/head';

function UpdateBusinessDetailsPage() {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <UpdateBusinessDetails />
    </>
  );
}

export default authenticatedRoute(UpdateBusinessDetailsPage);
