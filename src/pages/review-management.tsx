import React from 'react';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';
import Reviews from '../components/reviews';
import Head from 'next/head';

function ReviewsManagement() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <Header header="Review Management" />
        <div className="flex justify-center">
          <div className="w-4/5">
            <Reviews />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ReviewsManagement);
