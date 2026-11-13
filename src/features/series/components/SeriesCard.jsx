import React from "react";
import { NavLink } from "react-router-dom";
import { IoFilmOutline, IoPlay, IoStar } from "react-icons/io5";
import { TV_GENRE_MAP } from "../seriesGenres";

const SeriesCard = ({ series, className = "" }) => {
  const {
    name,
    original_name,
    poster_path,
    first_air_date,
    vote_average,
    genre_ids,
  } = series;

  const displayTitle = name || original_name || "Untitled";
  const year = first_air_date ? first_air_date.slice(0, 4) : null;
  const rating =
    typeof vote_average === "number" && vote_average > 0
      ? vote_average.toFixed(1)
      : null;
  const genre = (genre_ids || [])
    .map((id) => TV_GENRE_MAP[id])
    .filter(Boolean)[0];

  return (
    <NavLink
      to={`/series/${series.id}`}
      aria-label={`View series details for ${displayTitle}`}
      className={`group/card block w-full min-w-0 text-left focus:outline-none ${className}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06] transition duration-200 group-hover/card:ring-white/20 group-focus-visible/card:ring-color-primary">
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={displayTitle}
            className="h-full w-full object-cover transition duration-300 ease-out group-hover/card:scale-[1.04]"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/25">
            <IoFilmOutline size={34} />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {rating && (
          <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 text-[10px] font-bold text-color-primary backdrop-blur-sm">
            <IoStar size={10} />
            {rating}
          </span>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 group-focus-visible/card:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-color-bg shadow-lg">
            <IoPlay size={13} />
            View Series
          </span>
        </div>
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="line-clamp-1 text-sm font-semibold text-white/90 transition-colors duration-200 group-hover/card:text-white">
          {displayTitle}
        </h3>
        <div className="mt-1 flex min-w-0 items-center gap-2 text-xs text-white/45">
          {year && <span className="shrink-0">{year}</span>}
          {year && genre && (
            <span className="h-1 w-1 shrink-0 rounded-full bg-white/25" />
          )}
          {genre && <span className="truncate">{genre}</span>}
        </div>
      </div>
    </NavLink>
  );
};

export default SeriesCard;
