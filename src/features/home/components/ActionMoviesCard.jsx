import React, { useRef } from "react";
import { IoPlay } from "react-icons/io5";
import useActionMoviesInHome from "../hooks/useActionMoviesInHome";
import { NavLink } from "react-router-dom";
import { SkeletonCarousel } from "../../../components/skeletons";
import ContentState from "../../../components/common/ContentState";

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

function ActionMovieCard({ movie }) {
  const { poster_path, title, vote_average, overview, release_date } = movie;
  const rating =
    typeof vote_average === "number" && vote_average > 0
      ? vote_average.toFixed(1)
      : "N/A";

  return (
    <div className="group relative aspect-[2/3] w-36 shrink-0 snap-start overflow-hidden rounded-xl bg-color-bg shadow-lg sm:w-40 md:w-44 lg:w-52">
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

      <div className="absolute inset-0 z-30 flex flex-col justify-end rounded-xl bg-black/80 p-3 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:p-4">
        <h2 className="mb-1 line-clamp-2 text-sm font-bold sm:text-base">
          {title}
        </h2>

        <div className="mb-2 flex items-center gap-1 text-sm text-white">
          <span className="text-base text-yellow-400">★</span>
          <span>{rating}</span>
        </div>

        <p className="mb-2 line-clamp-3 text-xs">
          {overview || "No overview available."}
        </p>

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

const ActionMoviesCard = () => {
  const { list, loading, error } = useActionMoviesInHome();
  const scrollRef = useRef(null);

  const scroll = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section
        role="status"
        aria-busy="true"
        aria-label="Loading action movies"
        className="px-4 py-10 sm:px-6 md:py-12 lg:px-10"
      >
        <SkeletonCarousel
          cardClassName="w-36 sm:w-40 md:w-44 lg:w-52"
          cardRounded="rounded-xl"
          showEyebrow={false}
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
          title="Action movies are unavailable"
          message="We couldn't load this collection. Please try again in a moment."
        />
      </section>
    );
  }

  if (!list || list.length === 0) {
    return (
      <section className="px-4 py-8 sm:px-6 lg:px-10">
        <ContentState
          title="No action movies right now"
          message="New picks will appear here soon."
        />
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 md:py-12 lg:px-10">
      <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl">
          Action Movies
        </h1>
        <NavLink
          to={`/seeall/28`}
          className="inline-flex w-fit items-center text-sm font-semibold text-white/60 transition hover:text-white hover:underline"
        >
          See all
        </NavLink>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Scroll action movies left"
          className="absolute left-0 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/20 sm:flex"
          onClick={() => scroll(-300)}
        >
          &#8592;
        </button>
        <button
          type="button"
          aria-label="Scroll action movies right"
          className="absolute right-0 top-1/2 z-40 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition duration-200 hover:bg-white/20 sm:flex"
          onClick={() => scroll(300)}
        >
          &#8594;
        </button>

        <div
          ref={scrollRef}
          className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:gap-4 sm:px-0"
        >
          {list.map((movie) => (
            <NavLink
              key={movie.id}
              to={`/movie/${movie.id}`}
              aria-label={`View film details for ${
                movie.title || movie.original_title || "Untitled"
              }`}
              className="shrink-0 snap-start"
            >
              <ActionMovieCard movie={movie} />
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionMoviesCard;
