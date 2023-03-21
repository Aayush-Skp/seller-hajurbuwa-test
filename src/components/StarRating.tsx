import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const stars = Array.from(Array(5).keys());
  return (
    <div className="max-w-max">
      <p className="text-center">{rating}</p>
      <div className="flex space-x-1">
        {stars.map((star) => {
          if (star + 1 <= rating) {
            console.log(star + 1, rating);
            return (
              <span key={star}>
                <AiFillStar className="text-warning-primary" />
              </span>
            );
          }

          return (
            <span key={star}>
              <AiOutlineStar className="text-gray-400" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
