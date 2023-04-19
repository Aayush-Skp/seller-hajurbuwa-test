import React from 'react';
import ReviewsManagementTable from '../components/reviews/ReviewManagementTable';
import { reviews } from '../constants/review';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function ReviewsManagement() {
  return (
    <section className="flex flex-col justify-center items-center w-full">
      <PageWrapper>
        <div className="w-4/5">
          <ReviewsManagementTable data={reviews} />
        </div>
      </PageWrapper>
    </section>
  );
}

export default authenticatedRoute(ReviewsManagement);
