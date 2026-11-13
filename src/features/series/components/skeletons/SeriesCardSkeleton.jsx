import React from "react";
import { SkeletonMovieCard } from "../../../../components/skeletons";

const SeriesCardSkeleton = ({ className = "" }) => (
  <SkeletonMovieCard
    className={className}
    rounded="rounded-2xl"
    showMeta
  />
);

export default SeriesCardSkeleton;
