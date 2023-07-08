import React from "react";

interface RatingStarProps {
  score: number;
}

export default function RatingStar({ score }: RatingStarProps) {
  const filledStars = Math.round(score / 2);

  return (
    <div className="rating rating-sm">
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          type="radio"
          name="rating"
          className={`mask mask-star-2  ${
            index < filledStars ? "bg-orange-400" : ""
          }`}
          checked={index === filledStars - 1}
        />
      ))}
    </div>
  );
}
