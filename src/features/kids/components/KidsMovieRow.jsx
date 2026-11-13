import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  IoArrowForward,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import KidsMovieCard from "./KidsMovieCard";

const KidsMovieRow = ({ category, movies }) => {
  const scrollRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scrollRow = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * Math.max(container.clientWidth * 0.8, 320),
      behavior: "smooth",
    });
  };

  return (
    <section id={`kids-${category.key}`} className="scroll-mt-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: category.accent }}
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              {category.eyebrow}
            </p>
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {category.title}
          </h2>
          {category.description && (
            <p className="mt-1 max-w-xl text-sm text-white/45">
              {category.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label={`Scroll ${category.title} left`}
              onClick={() => scrollRow(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <IoChevronBack size={16} />
            </button>
            <button
              type="button"
              aria-label={`Scroll ${category.title} right`}
              onClick={() => scrollRow(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition duration-200 hover:border-white/25 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <IoChevronForward size={16} />
            </button>
          </div>

          {category.genreId && (
            <NavLink
              to={`/seeall/${category.genreId}`}
              className="ml-1 hidden items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-white/50 transition duration-200 hover:text-white sm:inline-flex"
            >
              See all
              <IoArrowForward size={13} />
            </NavLink>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 scrollbar-hide sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:px-0"
      >
        {movies.map((movie) => (
          <KidsMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default KidsMovieRow;
