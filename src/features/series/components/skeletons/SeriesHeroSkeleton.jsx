import React from "react";
import {
  SkeletonBase,
  SkeletonButton,
  SkeletonText,
} from "../../../../components/skeletons";

const SeriesHeroSkeleton = () => (
  <section className="relative flex min-h-[560px] items-end overflow-hidden sm:min-h-[600px] lg:min-h-[68vh]">
    <SkeletonBase className="absolute inset-0 h-full w-full" />
    <div className="absolute inset-0 bg-gradient-to-r from-color-bg via-color-bg/80 to-color-bg/10" />
    <div className="absolute inset-0 bg-gradient-to-t from-color-bg via-color-bg/35 to-transparent" />

    <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 md:pb-20 lg:px-14 lg:pb-24">
      <div className="max-w-3xl">
        <SkeletonBase className="h-7 w-40 rounded-full" />
        <SkeletonBase className="mt-5 h-12 w-4/5 max-w-2xl rounded-2xl sm:h-16 lg:h-20" />
        <div className="mt-5 flex flex-wrap gap-3">
          <SkeletonBase className="h-6 w-16 rounded-md" />
          <SkeletonBase className="h-6 w-14 rounded-full" />
          <SkeletonBase className="h-6 w-24 rounded-full" />
          <SkeletonBase className="h-6 w-36 rounded-full" />
        </div>
        <SkeletonText
          lines={3}
          className="mt-6 max-w-xl"
          lineClassName="h-3.5"
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <SkeletonButton className="h-11 w-36" />
          <SkeletonButton className="h-11 w-32" />
        </div>
      </div>
    </div>
  </section>
);

export default SeriesHeroSkeleton;
