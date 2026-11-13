import React from "react";
import SkeletonBase from "./SkeletonBase";
import SkeletonButton from "./SkeletonButton";
import SkeletonMovieCard from "./SkeletonMovieCard";

const SkeletonCarousel = ({
  count = 6,
  className = "",
  cardClassName = "w-36 sm:w-40 md:w-44 lg:w-52",
  cardRounded = "rounded-2xl",
  showHeader = true,
  showEyebrow = true,
  showAction = true,
  showMeta = true,
  titleWidth = "w-48",
}) => (
  <section aria-hidden="true" className={className}>
    {showHeader && (
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="min-w-0 space-y-2">
          {showEyebrow && (
            <SkeletonBase className="h-2.5 w-20 rounded-full" />
          )}
          <SkeletonBase
            className={`h-7 max-w-[60vw] rounded-lg ${titleWidth}`}
          />
        </div>
        {showAction && (
          <SkeletonButton className="hidden h-9 w-24 shrink-0 sm:block" />
        )}
      </div>
    )}

    <div className="flex gap-3 overflow-hidden sm:gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={`shrink-0 ${cardClassName}`}>
          <SkeletonMovieCard rounded={cardRounded} showMeta={showMeta} />
        </div>
      ))}
    </div>
  </section>
);

export default SkeletonCarousel;
