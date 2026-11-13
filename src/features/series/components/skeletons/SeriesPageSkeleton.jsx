import React from "react";
import GenreSkeleton from "./GenreSkeleton";
import SeriesCarouselSkeleton from "./SeriesCarouselSkeleton";
import SeriesHeroSkeleton from "./SeriesHeroSkeleton";

const SeriesPageSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading TV series"
    className="min-h-screen overflow-x-hidden bg-color-bg text-white"
  >
    <div aria-hidden="true">
      <SeriesHeroSkeleton />

      <div className="mx-auto max-w-[1600px] space-y-12 px-5 py-12 sm:px-8 md:space-y-16 lg:px-14">
        <SeriesCarouselSkeleton />
        <SeriesCarouselSkeleton />
        <SeriesCarouselSkeleton />
        <SeriesCarouselSkeleton />
        <GenreSkeleton />
      </div>
    </div>
  </div>
);

export default SeriesPageSkeleton;
