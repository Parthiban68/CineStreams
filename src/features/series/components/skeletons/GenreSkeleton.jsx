import React from "react";
import { SkeletonBase } from "../../../../components/skeletons";

const GenreSkeleton = () => (
  <section aria-hidden="true">
    <div className="mb-5 space-y-2">
      <SkeletonBase className="h-2.5 w-28 rounded-full" />
      <SkeletonBase className="h-7 w-48 rounded-lg" />
      <SkeletonBase className="h-3 w-80 max-w-full rounded-full" />
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonBase
          key={index}
          className="h-24 rounded-2xl"
        />
      ))}
    </div>
  </section>
);

export default GenreSkeleton;
