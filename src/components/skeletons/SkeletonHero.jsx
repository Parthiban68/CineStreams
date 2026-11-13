import React from "react";
import SkeletonBase from "./SkeletonBase";
import SkeletonButton from "./SkeletonButton";
import SkeletonText from "./SkeletonText";

const SkeletonHero = ({
  className = "min-h-[560px] sm:min-h-[600px] lg:min-h-[68vh]",
  titleWidth = "w-[85%] max-w-2xl",
}) => (
  <section
    aria-hidden="true"
    className={`relative flex items-end overflow-hidden bg-color-bg ${className}`}
  >
    <SkeletonBase className="absolute inset-0 rounded-none !bg-white/[0.03]" />

    <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-12 pt-32 sm:px-8 sm:pb-16 lg:px-14 lg:pb-20">
      <SkeletonBase className="h-6 w-36 rounded-full" />
      <SkeletonBase
        className={`mt-5 h-12 rounded-2xl sm:h-16 ${titleWidth}`}
      />
      <div className="mt-5 flex flex-wrap gap-3">
        <SkeletonBase className="h-5 w-16 rounded-md" />
        <SkeletonBase className="h-5 w-12 rounded-md" />
        <SkeletonBase className="h-5 w-28 rounded-md" />
      </div>
      <SkeletonText
        lines={2}
        className="mt-5 max-w-xl"
        lineClassName="h-3.5"
      />
      <div className="mt-7 flex flex-wrap gap-3">
        <SkeletonButton />
        <SkeletonButton className="h-11 w-32" />
      </div>
    </div>
  </section>
);

export default SkeletonHero;
