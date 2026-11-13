import React from "react";
import {
  SkeletonBase,
  SkeletonCarousel,
  SkeletonHero,
} from "../../../components/skeletons";

const KidsPageSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading Kids movies"
    className="min-h-screen overflow-x-hidden bg-color-bg text-white"
  >
    <div aria-hidden="true">
      <SkeletonHero />

      <div className="border-y border-white/[0.06] bg-color-bg/85">
        <div className="mx-auto flex max-w-[1600px] gap-2 overflow-hidden px-5 py-3.5 sm:px-8 lg:px-14">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBase
              key={index}
              className="h-8 w-24 shrink-0 rounded-full"
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] space-y-12 px-5 py-12 sm:px-8 md:space-y-16 lg:px-14">
        <SkeletonCarousel
          count={7}
          cardClassName="w-[9.75rem] sm:w-40 md:w-44 lg:w-48 2xl:w-52"
        />
        <SkeletonCarousel
          count={7}
          cardClassName="w-[9.75rem] sm:w-40 md:w-44 lg:w-48 2xl:w-52"
        />
      </div>
    </div>
  </div>
);

export default KidsPageSkeleton;
