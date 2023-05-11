import React from 'react';
import LandingPage from '../components/LandingPage';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function Dashboard() {
  return (
    <>
    <div>
      <PageWrapper>
        <LandingPage />
      </PageWrapper>
    </div>
    </>
  );
}

export default authenticatedRoute(Dashboard);
