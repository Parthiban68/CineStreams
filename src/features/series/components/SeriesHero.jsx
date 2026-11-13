import React from "react";
import {
  IoAlbumsOutline,
  IoInformationCircleOutline,
  IoPlay,
  IoSparkles,
  IoStar,
} from "react-icons/io5";
import { TV_GENRE_MAP } from "../seriesGenres";

const SeriesHero = ({ series, details, onExplore, onMoreInfo }) => {
  if (!series) return null;

  const title =
    details?.name || series.name || series.original_name || "Untitled";
  const overview = details?.overview || series.overview;
  const imagePath =
    details?.backdrop_path ||
    series.backdrop_path ||
    details?.poster_path ||
    series.poster_path;
  const firstAirDate = details?.first_air_date || series.first_air_date;
  const year = firstAirDate ? firstAirDate.slice(0, 4) : null;
  const ratingValue = details?.vote_average ?? series.vote_average;
  const rating =
    typeof ratingValue === "number" && ratingValue > 0
      ? ratingValue.toFixed(1)
      : null;
  const seasonCount = details?.number_of_seasons;
  const genres = details?.genres?.map((genre) => genre.name) || [];
  const fallbackGenres = (series.genre_ids || [])
    .map((id) => TV_GENRE_MAP[id])
    .filter(Boolean);
  const displayGenres = (genres.length > 0 ? genres : fallbackGenres).slice(
    0,
    3
  );

  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden sm:min-h-[600px] lg:min-h-[68vh]">
      {imagePath ? (
        <img
          src={`https://image.tmdb.org/t/p/original${imagePath}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-color-bg to-black" />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-color-bg via-color-bg/80 to-color-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-color-bg via-color-bg/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 md:pb-20 lg:px-14 lg:pb-24">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-color-primary/30 bg-color-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-color-primary backdrop-blur-sm">
              <IoSparkles size={13} />
              Featured Series
            </span>
            {details?.status && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
                {details.status}
              </span>
            )}
          </div>

          <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
            {rating && (
              <span className="inline-flex items-center gap-1 rounded-md bg-color-primary px-2 py-0.5 text-xs font-bold text-color-bg">
                <IoStar size={12} />
                {rating}
              </span>
            )}
            {year && <span>{year}</span>}
            {seasonCount && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span className="inline-flex items-center gap-1.5">
                  <IoAlbumsOutline size={13} />
                  {seasonCount} {seasonCount === 1 ? "season" : "seasons"}
                </span>
              </>
            )}
            {displayGenres.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{displayGenres.join(" • ")}</span>
              </>
            )}
          </div>

          {overview && (
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 line-clamp-3 sm:text-base sm:leading-7">
              {overview}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExplore}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-color-bg transition duration-200 hover:bg-color-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
            >
              <IoPlay size={16} />
              Explore Series
            </button>
            <button
              type="button"
              onClick={onMoreInfo}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-white/35 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
            >
              <IoInformationCircleOutline size={18} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeriesHero;
