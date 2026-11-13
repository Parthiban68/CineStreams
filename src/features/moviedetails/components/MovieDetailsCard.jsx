import React from "react";
import { useParams } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetails";
import {
  SkeletonBase,
  SkeletonButton,
  SkeletonText,
} from "../../../components/skeletons";
import ContentState from "../../../components/common/ContentState";

const formatReleaseDate = (releaseDate) => {
  if (!releaseDate) return "Release date unavailable";

  const date = new Date(releaseDate);
  if (Number.isNaN(date.getTime())) return "Release date unavailable";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MovieDetailsSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading movie details"
    className="min-h-[100svh] bg-color-bg px-4 pb-12 pt-24 sm:px-8 lg:px-14"
  >
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-12"
    >
      <SkeletonBase className="aspect-[2/3] w-48 shrink-0 rounded-2xl sm:w-56 md:w-64 lg:w-[20rem] xl:w-[22rem]" />

      <div className="w-full max-w-2xl space-y-5">
        <SkeletonBase className="h-4 w-28 rounded-full" />
        <SkeletonBase className="h-12 w-4/5 rounded-2xl sm:h-14" />
        <SkeletonText lines={3} lineClassName="h-3.5" />
        <div className="flex flex-wrap gap-2">
          <SkeletonBase className="h-7 w-20 rounded-full" />
          <SkeletonBase className="h-7 w-24 rounded-full" />
          <SkeletonBase className="h-7 w-16 rounded-full" />
        </div>
        <SkeletonText lines={3} lineClassName="h-3.5" />
        <div className="flex flex-wrap gap-3 pt-2">
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>
    </div>
  </div>
);

const MovieDetailsCard = () => {
  const { id } = useParams();
  const { list, loading, error } = useMovieDetails(id);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="px-4 pt-28 sm:px-8 lg:px-14">
        <ContentState
          variant="error"
          title="Movie details are unavailable"
          message="We couldn't load this movie. Please try again in a moment."
        />
      </div>
    );
  }

  if (!list) {
    return (
      <div className="px-4 pt-28 sm:px-8 lg:px-14">
        <ContentState
          title="Movie not found"
          message="This movie may no longer be available."
        />
      </div>
    );
  }

  const genres = list.genres || [];
  const rating =
    typeof list.vote_average === "number"
      ? list.vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-black shadow-2xl">
      <div className="absolute inset-0">
        {list.backdrop_path ? (
          <img
            src={`https://image.tmdb.org/t/p/original${list.backdrop_path}`}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-color-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col items-center justify-center gap-8 px-4 pb-12 pt-24 sm:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-14">
        <div className="w-48 shrink-0 sm:w-56 md:w-64 lg:w-[20rem] xl:w-[22rem]">
          <img
            src={
              list.poster_path
                ? `https://image.tmdb.org/t/p/original${list.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={list.original_title || list.title || "Movie poster"}
            className="aspect-[2/3] w-full rounded-2xl border-4 border-white/50 object-cover shadow-lg"
          />
        </div>

        <div className="w-full max-w-2xl text-center lg:text-left">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-color-primary sm:text-base">
            CineStream
          </span>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl">
            {list.original_title || list.title}
          </h1>
          {list.tagline && (
            <p className="mt-2 text-base text-white/70 sm:text-lg">
              {list.tagline}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 lg:justify-start">
            <span className="flex items-center rounded bg-yellow-400/90 px-2 py-0.5 text-sm font-bold text-gray-900 shadow sm:text-base">
              IMDb&nbsp;{rating}
            </span>
            {list.original_language && (
              <span className="text-sm uppercase text-white/70 sm:text-base">
                {list.original_language}
              </span>
            )}
            <span className="text-sm text-white/70 sm:text-base">
              {formatReleaseDate(list.release_date)}
            </span>
            {list.runtime ? (
              <span className="text-sm text-white/70 sm:text-base">
                {list.runtime} mins
              </span>
            ) : null}
          </div>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/90 sm:text-base lg:mx-0">
            {list.overview || "No overview available for this movie."}
          </p>

          {genres.length > 0 && (
            <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
              {genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs text-white sm:text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-md transition duration-200 hover:bg-white/90 sm:text-base"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="text-black"
                aria-hidden="true"
              >
                <polygon points="5,4 15,10 5,16" />
              </svg>
              Watch Now
            </button>

            <button
              type="button"
              className="rounded-full border border-white/40 bg-black/40 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-black/60 sm:text-base"
            >
              + Watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
