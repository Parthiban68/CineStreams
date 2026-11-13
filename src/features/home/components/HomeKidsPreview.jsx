import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowForward, IoHappyOutline } from "react-icons/io5";
import KidsMovieCard from "../../kids/components/KidsMovieCard";

const HomeKidsPreview = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <section
      id="home-kids"
      className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-kids-accent/15 bg-gradient-to-br from-kids-accent/[0.08] via-white/[0.02] to-kids-sky/[0.05] p-5 sm:p-7 lg:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-kids-sun/[0.07] blur-3xl"
      />

      <div className="relative">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-kids-accent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-kids-accent/80">
                CineStream Kids
              </p>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Family favourites
            </h2>
            <p className="mt-1 max-w-xl text-sm text-white/45">
              Bright, adventurous stories picked for younger viewers.
            </p>
          </div>

          <NavLink
            to="/kids"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-kids-accent/25 bg-kids-accent/10 px-3.5 py-2 text-xs font-bold text-kids-accent transition duration-200 hover:bg-kids-accent hover:text-color-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-kids-accent sm:inline-flex"
          >
            <IoHappyOutline size={15} />
            Explore Kids
            <IoArrowForward size={13} />
          </NavLink>
        </div>

        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide sm:-mx-7 sm:gap-4 sm:px-7 lg:-mx-8 lg:px-8">
          {movies.slice(0, 10).map((movie) => (
            <KidsMovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <NavLink
          to="/kids"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-kids-accent/25 bg-kids-accent/10 px-4 py-2 text-xs font-bold text-kids-accent transition duration-200 hover:bg-kids-accent hover:text-color-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-kids-accent sm:hidden"
        >
          <IoHappyOutline size={15} />
          Explore Kids
          <IoArrowForward size={13} />
        </NavLink>
      </div>
    </section>
  );
};

export default HomeKidsPreview;
