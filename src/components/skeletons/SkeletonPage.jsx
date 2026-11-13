import React from "react";
import SkeletonCarousel from "./SkeletonCarousel";
import SkeletonHero from "./SkeletonHero";
import SkeletonMovieGrid from "./SkeletonMovieGrid";
import SkeletonNavbar from "./SkeletonNavbar";

const SkeletonPage = ({
  withNavbar = false,
  showHero = true,
  carousels = 2,
  showGrid = false,
  className = "",
}) => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading content"
    className={`min-h-screen overflow-x-hidden bg-color-bg text-white ${className}`}
  >
    <div aria-hidden="true">
      {withNavbar && <SkeletonNavbar />}
      {showHero ? (
        <SkeletonHero />
      ) : (
        <div className="h-20 sm:h-24" aria-hidden="true" />
      )}

      <div className="mx-auto w-full max-w-[1600px] space-y-12 px-4 py-10 sm:space-y-14 sm:px-6 md:px-8 lg:px-12">
        {showGrid
          ? <SkeletonMovieGrid count={10} />
          : Array.from({ length: carousels }).map((_, index) => (
              <SkeletonCarousel key={index} />
            ))}
      </div>
    </div>
  </div>
);

export default SkeletonPage;
