import React from 'react';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';
import Reviews from '../components/reviews';

function ReviewsManagement() {
  return (
    <PageWrapper>
      <Header header="Review Management" />
      <div className="flex justify-center">
        <div className="w-4/5">
          <Reviews />
        </div>
      </div>
    </PageWrapper>
  );
}

export default authenticatedRoute(ReviewsManagement);
