import React from 'react';
import LandingPage from '../components/LandingPage';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Head from 'next/head';

function Dashboard() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <div>
        <PageWrapper>
          <LandingPage />
        </PageWrapper>
      </div>
    </>
  );
}

export default authenticatedRoute(Dashboard);
