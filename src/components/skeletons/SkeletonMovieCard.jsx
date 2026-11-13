import React from "react";
import SkeletonBase from "./SkeletonBase";

const SkeletonMovieCard = ({
  className = "",
  rounded = "rounded-2xl",
  showMeta = true,
}) => (
  <div aria-hidden="true" className={`min-w-0 ${className}`}>
    <SkeletonBase className={`aspect-[2/3] w-full ${rounded}`} />
    {showMeta && (
      <>
        <SkeletonBase className="mt-3 h-3.5 w-4/5 rounded-full" />
        <SkeletonBase className="mt-2 h-2.5 w-1/3 rounded-full" />
      </>
    )}
  </div>
);

export default SkeletonMovieCard;
