import React from "react";
import { SkeletonBase } from "../../../../components/skeletons";
import SeriesCardSkeleton from "./SeriesCardSkeleton";

const SeriesCarouselSkeleton = ({ count = 7 }) => (
  <section aria-hidden="true">
    <div className="mb-5 flex items-end justify-between gap-4">
      <div className="min-w-0 space-y-2">
        <SkeletonBase className="h-2.5 w-20 rounded-full" />
        <SkeletonBase className="h-7 w-56 max-w-[60vw] rounded-lg" />
        <SkeletonBase className="h-3 w-72 max-w-[70vw] rounded-full" />
      </div>
      <div className="hidden shrink-0 items-center gap-2 md:flex">
        <SkeletonBase className="h-9 w-9 rounded-full" />
        <SkeletonBase className="h-9 w-9 rounded-full" />
      </div>
    </div>

    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-[9.75rem] shrink-0 sm:w-40 md:w-44 lg:w-48 2xl:w-52"
        >
          <SeriesCardSkeleton />
        </div>
      ))}
    </div>
  </section>
);

export default SeriesCarouselSkeleton;
