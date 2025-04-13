import React from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  maxRating?: number;
  color?: string;
  size?: number;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5, // default to 5 stars
  color = "white", // optional color for stars
  size = 10, // size of the stars
}) => {
  return (
    <div className="flex gap-1">
      {/* Render the maxRating stars */}
      {Array.from({ length: maxRating }).map((_, index) => (
        <div
          key={index}
          className={`flex items-center p-[3px] rounded-[5px] ${
            index < rating ? "bg-[#104144]" : `bg-[${color}]`
          }`}
        >
          <Star
            fill={index < rating ? "#104144" : color} // filled for rating, unfilled for the rest
            size={size}
            stroke={index < rating ? color : "#104144"}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
