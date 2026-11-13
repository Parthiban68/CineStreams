import React from "react";
import SkeletonMovieCard from "./SkeletonMovieCard";

const SkeletonMovieGrid = ({ count = 10, className = "" }) => (
  <div
    aria-hidden="true"
    className={`grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5 lg:gap-8 ${className}`}
  >
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonMovieCard key={index} />
    ))}
  </div>
);

export default SkeletonMovieGrid;
