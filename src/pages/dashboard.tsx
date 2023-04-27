import React from 'react';
import LandingPage from '../components/LandingPage';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function Dashboard() {
  return (
    <div>
      <PageWrapper>
        <LandingPage />
      </PageWrapper>
      <div className="flex justify-center my-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(Dashboard);
