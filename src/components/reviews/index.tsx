import React, { useState } from 'react';
import ReviewsManagementTable from './ReviewManagementTable';
import { getAllReviews } from '../../services/getAllReviews';
import { reviews } from '../../constants/review';

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(true);
  // const [reviews, setReviews] = useState<any>([]);

  function getReviewsList() {
    // getAllReviews()
    //   .then((res) => {
    //     setIsLoading(false);
    //     setReviews(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     setIsLoading(false);
    //   });
  }
  return (
    <ReviewsManagementTable
      data={reviews}
      isLoading={isLoading}
      getReviewsList={getReviewsList}
    />
  );
}
