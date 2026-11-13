import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import useMoviesHero from "../hooks/useMoviesHero";
import {
  SkeletonHero,
  SkeletonMovieCard,
} from "../../../components/skeletons";
import ContentState from "../../../components/common/ContentState";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function StarRating({ count = 0 }) {
  return (
    <div className="my-2 flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${
            i < count ? "text-yellow-400" : "text-gray-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1 12,7.5 19,7.5 13.5,12 15.5,19 10,15 4.5,19 6.5,12 1,7.5 8,7.5" />
        </svg>
      ))}
    </div>
  );
}

const formatReleaseDate = (releaseDate) => {
  if (!releaseDate) return "";

  const date = new Date(releaseDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MovieHero = () => {
  const { list, loading, error } = useMoviesHero();
  const [selectedId, setSelectedId] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (list && list.length > 0 && selectedId === null) {
      setSelectedId(list[0].id);
    }
  }, [list, selectedId]);

  if (loading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="Loading featured movies"
        className="min-h-[100svh] overflow-hidden bg-color-bg"
      >
        <div aria-hidden="true">
          <SkeletonHero className="min-h-[70vh]" />
          <div className="mx-auto flex max-w-[1600px] gap-3 overflow-hidden px-4 pb-10 sm:px-8 lg:px-14">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="w-28 shrink-0 sm:w-32 md:w-36"
              >
                <SkeletonMovieCard rounded="rounded-xl" showMeta={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pt-28 sm:px-8 lg:px-14">
        <ContentState
          variant="error"
          title="Featured movies are unavailable"
          message="We couldn't load the featured collection. Please try again in a moment."
        />
      </div>
    );
  }

  if (!list || list.length === 0) {
    return (
      <div className="px-4 pt-28 sm:px-8 lg:px-14">
        <ContentState
          title="Nothing featured right now"
          message="Check back soon for new featured movies."
        />
      </div>
    );
  }

  const selectedMovie = list.find((movie) => movie.id === selectedId) || list[0];
  const rating =
    typeof selectedMovie.vote_average === "number"
      ? selectedMovie.vote_average.toFixed(1)
      : "N/A";
  const genres = selectedMovie.genre_ids || [];
  const releaseDate = formatReleaseDate(selectedMovie.release_date);

  const scrollByOffset = (direction) => {
    const container = carouselRef.current;
    if (!container) return;

    container.scrollBy({
      left:
        direction *
        Math.max(container.clientWidth * 0.8, 240),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-color-bg">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: selectedMovie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`
            : "none",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col justify-end px-4 pb-6 pt-24 sm:px-8 sm:pb-8 lg:px-14 lg:pb-10">
        <div className="max-w-xl lg:max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-color-primary sm:text-base">
            CineStream
          </span>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            {selectedMovie.original_title || selectedMovie.title}
          </h1>
          {selectedMovie.tagline && (
            <p className="mt-2 text-base text-white/70 sm:text-lg">
              {selectedMovie.tagline}
            </p>
          )}

          <StarRating count={Math.round(selectedMovie.vote_average / 2)} />

          <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="flex items-center rounded bg-yellow-400/90 px-2 py-0.5 text-sm font-bold text-gray-900 shadow sm:text-base">
              IMDb&nbsp;{rating}
            </span>
            {selectedMovie.original_language && (
              <span className="text-sm uppercase text-white/70 sm:text-base">
                {selectedMovie.original_language}
              </span>
            )}
            {releaseDate && (
              <span className="text-sm text-white/70 sm:text-base">
                {releaseDate}
              </span>
            )}
            {selectedMovie.runtime ? (
              <span className="text-sm text-white/70 sm:text-base">
                {selectedMovie.runtime} mins
              </span>
            ) : null}
          </div>

          <p className="mb-5 line-clamp-4 max-w-lg text-sm leading-6 text-white/90 sm:text-base">
            {selectedMovie.overview}
          </p>

          <div className="mb-6 flex flex-wrap gap-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/20 px-3 py-1 text-xs text-white sm:text-sm"
              >
                {genreMap[genre] || "Other"}
              </span>
            ))}
          </div>

          <div className="mb-7 flex flex-wrap gap-3">
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

        <div className="relative mt-2 sm:mt-4">
          <button
            type="button"
            onClick={() => scrollByOffset(-1)}
            className="absolute left-0 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 sm:flex"
            aria-label="Scroll featured movies left"
          >
            <IoMdArrowDropleft size={24} />
          </button>

          <button
            type="button"
            onClick={() => scrollByOffset(1)}
            className="absolute right-0 top-1/2 z-30 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/70 sm:flex"
            aria-label="Scroll featured movies right"
          >
            <IoMdArrowDropright size={24} />
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 scrollbar-hide sm:gap-4"
          >
            {list.map((movie) => {
              const isSelected = movie.id === selectedId;

              return (
                <button
                  type="button"
                  key={movie.id}
                  onClick={() => setSelectedId(movie.id)}
                  aria-pressed={isSelected}
                  aria-label={`Show ${movie.original_title || movie.title}`}
                  className={`relative w-28 shrink-0 snap-center overflow-hidden rounded-xl bg-black/40 text-left transition duration-300 hover:scale-105 sm:w-32 md:w-36 ${
                    isSelected
                      ? "ring-2 ring-color-primary ring-offset-2 ring-offset-black"
                      : "ring-0"
                  }`}
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.original_title || movie.title}
                    className="aspect-[2/3] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-2">
                    <p className="truncate text-center text-xs font-semibold text-white sm:text-sm">
                      {movie.original_title || movie.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
