import React from 'react';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';
import Reviews from '../components/reviews';

function ReviewsManagement() {
  return (
    <div>
      <PageWrapper>
        <Header header="Review Management" />
        <div className="flex justify-center">
          <div className="w-4/5">
            <Reviews />
          </div>
        </div>
      </PageWrapper>
      <div className="flex justify-center my-6">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(ReviewsManagement);
