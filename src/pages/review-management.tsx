import React from 'react';
import ReviewsManagementTable from '../components/reviews/ReviewManagementTable';
import { reviews } from '../constants/review';

export default function ReviewsManagement() {
  return (
    <div>
      <ReviewsManagementTable data={reviews} />
    </div>
  );
}
