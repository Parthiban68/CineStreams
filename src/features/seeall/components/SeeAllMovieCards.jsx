import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { NavLink, useParams } from "react-router-dom";
import useSeeAllMovies from "../hooks/useSeeAllMovies";
import {
  SkeletonBase,
  SkeletonMovieGrid,
} from "../../../components/skeletons";
import ContentState from "../../../components/common/ContentState";

const SeeAllMovieCards = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const totalPages = 100;

  const { list, loading, error } = useSeeAllMovies({ id, page });

  useEffect(() => {
    setPage(1);
  }, [id]);

  if (loading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label="Loading movies"
        className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 sm:px-6 lg:px-10"
      >
        <div aria-hidden="true">
          <SkeletonBase className="h-9 w-48 rounded-xl" />
          <SkeletonBase className="mt-3 h-3 w-32 rounded-full" />
          <SkeletonMovieGrid count={10} className="mt-8" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 sm:px-6 lg:px-10">
        <ContentState
          variant="error"
          title="Movies are unavailable"
          message="We couldn't load this collection. Please try again in a moment."
        />
      </div>
    );
  }

  if (!list || list.length === 0) {
    return (
      <div className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 sm:px-6 lg:px-10">
        <ContentState
          title="No movies found"
          message="There are no movies in this collection right now."
        />
      </div>
    );
  }

  const paginationRange = () => {
    const delta = 2;
    const range = [];
    let lastPage;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
        lastPage = i;
      } else if (lastPage && i - lastPage > 1) {
        range.push("...");
        lastPage = null;
      }
    }

    return range;
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 pb-12 pt-24 sm:px-6 lg:px-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Browse Movies
        </h1>
        <p className="mt-2 text-sm text-white/50 sm:text-base">
          Discover movies by genre and explore more pages.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
        {list.map((movie) => (
          <NavLink
            key={movie.id}
            to={`/movie/${movie.id}`}
            aria-label={`View film details for ${
              movie.title || movie.original_title || "Untitled"
            }`}
            className="group min-w-0"
          >
            <article className="flex h-full flex-col">
              <div className="relative overflow-hidden rounded-2xl bg-white/[0.04] shadow-lg">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.title}
                  className="aspect-[2/3] w-full rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-color-bg shadow-lg">
                    <IoPlay size={13} />
                    View Film
                  </span>
                </div>
              </div>

              <h2 className="mt-3 truncate text-sm font-semibold text-white sm:text-base">
                {movie.title}
              </h2>
              <p className="mt-1 line-clamp-2 flex-grow text-xs leading-5 text-white/50 sm:text-sm">
                {movie.overview || "No overview available."}
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-sm font-bold text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.978a1 1 0 00.95.69h4.214c.969 0 1.371 1.24.588 1.81l-3.417 2.48a1 1 0 00-.364 1.118l1.286 3.977c.3.922-.755 1.688-1.54 1.118l-3.417-2.48a1 1 0 00-1.175 0l-3.417 2.48c-.784.57-1.838-.196-1.539-1.118l1.285-3.977a1 1 0 00-.363-1.118L2.035 9.405c-.783-.57-.38-1.81.588-1.81h4.215a1 1 0 00.95-.69l1.286-3.978z" />
                </svg>
                <span className="text-white">
                  {typeof movie.vote_average === "number" &&
                  movie.vote_average > 0
                    ? movie.vote_average.toFixed(1)
                    : "N/A"}
                </span>
              </div>
            </article>
          </NavLink>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <nav
          aria-label="Movie pages"
          className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.03] px-2 py-2 scrollbar-hide sm:px-4"
        >
          {paginationRange().map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-sm text-white/40"
              >
                ...
              </span>
            ) : (
              <button
                type="button"
                key={item}
                onClick={() => setPage(item)}
                aria-current={item === page ? "page" : undefined}
                className={`h-9 min-w-9 shrink-0 rounded-lg px-2 text-sm font-semibold transition ${
                  item === page
                    ? "bg-color-primary text-color-bg"
                    : "text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default SeeAllMovieCards;
