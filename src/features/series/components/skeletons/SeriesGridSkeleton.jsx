import React from "react";
import { SkeletonMovieGrid } from "../../../../components/skeletons";

const SeriesGridSkeleton = ({
  count = 10,
  className = "",
  label = "Loading series",
}) => (
  <div role="status" aria-busy="true" aria-label={label}>
    <SkeletonMovieGrid count={count} className={className} />
  </div>
);

export default SeriesGridSkeleton;
