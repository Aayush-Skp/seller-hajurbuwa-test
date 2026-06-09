import React, { useEffect, useState } from 'react';
import ReviewsManagementTable from './ReviewManagementTable';
import { getOrdersByStatus } from '../../services/orderServices';

export default function Reviews() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<any>([]);

  function getReviewsList() {
    getOrdersByStatus('/seller/get-orders?page=1&status=delivered')
      .then((res) => {
        setIsLoading(false);
        setReviews(res.data);

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getReviewsList();
  }, []);

  return (
    <ReviewsManagementTable
      data={reviews}
      isLoading={isLoading}
      getReviewsList={getReviewsList}
    />
  );
}
