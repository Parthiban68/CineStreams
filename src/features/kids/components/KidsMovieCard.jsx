import React from "react";
import { NavLink } from "react-router-dom";
import { IoFilmOutline, IoPlay, IoStar } from "react-icons/io5";

const KidsMovieCard = ({ movie }) => {
  const {
    id,
    title,
    original_title,
    poster_path,
    release_date,
    vote_average,
  } = movie;

  const displayTitle = title || original_title || "Untitled";
  const year = release_date ? release_date.slice(0, 4) : null;
  const rating =
    typeof vote_average === "number" && vote_average > 0
      ? vote_average.toFixed(1)
      : null;

  return (
    <NavLink
      to={`/movie/${id}`}
      className="group/card block w-[9.75rem] shrink-0 snap-start focus:outline-none sm:w-40 md:w-44 lg:w-48 2xl:w-52"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] transition duration-200 group-hover/card:ring-white/20 group-focus-visible/card:ring-kids-accent">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={displayTitle}
            className="h-full w-full object-cover transition duration-200 ease-out group-hover/card:scale-[1.04]"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/25">
            <IoFilmOutline size={34} />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {year && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
            {year}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-color-bg shadow-lg transition-transform duration-200 group-hover/card:scale-105">
            <IoPlay className="ml-0.5" size={18} />
          </span>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold text-white/90 transition-colors duration-200 group-hover/card:text-white">
          {displayTitle}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-xs text-white/45">
          {year && <span>{year}</span>}
          {year && rating && (
            <span className="h-1 w-1 rounded-full bg-white/25" />
          )}
          {rating && (
            <span className="inline-flex items-center gap-1 text-kids-sun">
              <IoStar size={11} />
              {rating}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default KidsMovieCard;
