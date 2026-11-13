import React from "react";
import {
  SkeletonBase,
  SkeletonCarousel,
  SkeletonHero,
} from "../../../../components/skeletons";

const GenreSkeleton = () => (
  <section aria-hidden="true">
    <SkeletonBase className="h-2.5 w-24 rounded-full" />
    <SkeletonBase className="mt-3 h-7 w-56 max-w-[70vw] rounded-lg" />
    <SkeletonBase className="mt-3 h-3 w-80 max-w-[80vw] rounded-full" />
    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonBase
          key={index}
          className="aspect-[16/9] rounded-2xl"
        />
      ))}
    </div>
  </section>
);

const HomePageSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading homepage"
    className="min-h-screen overflow-x-hidden bg-color-bg text-white"
  >
    <div aria-hidden="true">
      <SkeletonHero />

      <div className="mx-auto max-w-[1600px] space-y-12 px-5 py-12 sm:px-8 md:space-y-16 lg:px-14">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCarousel
            key={index}
            cardClassName="w-[9.75rem] sm:w-40 md:w-44 lg:w-48 2xl:w-52"
          />
        ))}
        <GenreSkeleton />
      </div>
    </div>
  </div>
);

export default HomePageSkeleton;
