import React, { useRef } from "react";
import { IoPlay } from "react-icons/io5";
import useMoviesCard from "../hooks/useMoviesCard";
import { NavLink } from "react-router-dom";
import useHomeMovies from "../hooks/useHomeMovies";
import { SkeletonCarousel } from "../../../components/skeletons";
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

const formatReleaseDate = (releaseDate) => {
  if (!releaseDate) return "Unknown release";

  const date = new Date(releaseDate);
  if (Number.isNaN(date.getTime())) return "Unknown release";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function MovieCardMini({
  poster_path,
  title,
  genre_ids,
  overview,
  vote_average,
  release_date,
}) {
  const genres = genre_ids || [];
  const rating =
    typeof vote_average === "number" && vote_average > 0
      ? vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="group relative aspect-[2/3] w-36 shrink-0 snap-start overflow-hidden rounded-xl bg-white/[0.04] shadow-lg sm:w-40 md:w-44 lg:w-52">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        className="absolute inset-0 h-full w-full rounded-xl object-cover transition-transform duration-200 group-hover:scale-105"
        draggable={false}
        loading="lazy"
      />

      <div className="absolute bottom-8 left-3 right-3 z-20 line-clamp-2 text-sm font-bold text-white drop-shadow-sm sm:text-base">
        <span>{title}</span>
      </div>

      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 text-xs text-white drop-shadow-sm sm:text-sm">
        <span className="text-lg text-yellow-400">★</span>
        <span>{rating}</span>
      </div>

      <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/80 p-3 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:p-4">
        <h2 className="mb-1 line-clamp-2 text-sm font-bold sm:text-base">
          {title}
        </h2>
        <div className="mb-2 flex items-center gap-1 text-sm text-white">
          <span className="text-base text-yellow-400">★</span>
          <span>{rating}</span>
        </div>

        <p className="mb-2 line-clamp-3 text-xs">{overview}</p>
        <div className="mb-2 flex flex-wrap gap-1 justify-start">
          {genres.map((id) => (
            <span
              key={id}
              className="rounded-md bg-color-bg px-2 py-0.5 text-[10px] font-medium text-white"
            >
              {genreMap[id] || "Other"}
            </span>
          ))}
        </div>
        <div className="text-xs font-bold text-white">
          {formatReleaseDate(release_date)}
        </div>
        <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-color-bg">
          <IoPlay size={11} />
          View Film
        </span>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 rounded-b-xl bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
}

function MovieHorizontalScroll({ movies }) {
  const scrollRef = useRef(null);

  useMoviesCard(scrollRef);

  const scrollByCard = (dir) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollBy({
      left:
        dir *
        Math.max(
          scrollContainer.clientWidth * 0.8,
          scrollContainer.firstElementChild?.offsetWidth || 320
        ),
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full select-none py-4 sm:py-6">
      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:gap-4 sm:px-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie) => (
          <NavLink
            key={movie.id}
            to={`/movie/${movie.id}`}
            aria-label={`View film details for ${
              movie.title || movie.original_title || "Untitled"
            }`}
            className="shrink-0 snap-start"
          >
            <MovieCardMini {...movie} />
          </NavLink>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          type="button"
          aria-label="Scroll trending movies left"
          onClick={() => scrollByCard(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/20"
        >
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll trending movies right"
          onClick={() => scrollByCard(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/20"
        >
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function MovieCards() {
  const { list, loading, error } = useHomeMovies();

  if (loading) {
    return (
      <section
        role="status"
        aria-busy="true"
        aria-label="Loading trending movies"
        className="px-4 py-10 sm:px-6 md:py-12 lg:px-10"
      >
        <SkeletonCarousel
          cardClassName="w-36 sm:w-40 md:w-44 lg:w-52"
          cardRounded="rounded-xl"
          showEyebrow={false}
          showAction={false}
          showMeta={false}
        />
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <ContentState
          variant="error"
          title="Trending movies are unavailable"
          message="We couldn't load this collection. Please try again in a moment."
        />
      </section>
    );
  }

  if (!list || list.length === 0) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <ContentState
          title="No trending movies right now"
          message="New picks will appear here soon."
        />
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 md:py-12 lg:px-10">
      <h1 className="mb-2 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
        Trending Movies
      </h1>
      <div className="mx-auto">
        <MovieHorizontalScroll movies={list} />
      </div>
    </section>
  );
}
