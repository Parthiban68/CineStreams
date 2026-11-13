import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  IoArrowForward,
  IoCloseCircle,
  IoFilmOutline,
  IoSearchOutline,
  IoStar,
} from "react-icons/io5";
import useSearch from "../hooks/useSearch";

const ResultSkeleton = () => (
  <div
    aria-hidden="true"
    className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-2.5"
  >
    <div className="skeleton-shimmer h-16 w-11 shrink-0 rounded-lg bg-white/[0.05]" />
    <div className="min-w-0 flex-1 space-y-2">
      <div className="skeleton-shimmer h-3 w-3/4 rounded-full bg-white/[0.05]" />
      <div className="skeleton-shimmer h-2.5 w-1/3 rounded-full bg-white/[0.04]" />
    </div>
  </div>
);

const SearchPanel = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const { results, loading, error, retry } = useSearch(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const trimmedQuery = query.trim();
  const hasQuery = trimmedQuery.length >= 2;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      id="site-search"
      className="mx-auto w-full max-w-[1600px]"
      role="search"
      aria-label="Search CineStreams"
    >
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="site-search-input" className="sr-only">
          Search movies and TV series
        </label>
        <IoSearchOutline
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          ref={inputRef}
          id="site-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies and TV series..."
          autoComplete="off"
          className="h-12 w-full rounded-full border border-white/10 bg-white/[0.05] pl-11 pr-11 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-color-primary/50 focus:bg-white/[0.07] focus:ring-2 focus:ring-color-primary/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white/40 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <IoCloseCircle size={19} />
          </button>
        )}
      </form>

      <div className="mt-4 max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain pr-1">
        {!hasQuery && (
          <div className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-5 text-sm text-white/40">
            <IoSearchOutline size={20} className="shrink-0 text-white/25" />
            <p>
              Search the CineStreams catalogue. Type at least 2 characters to
              see films and series.
            </p>
          </div>
        )}

        {hasQuery && loading && (
          <div className="space-y-2" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, index) => (
              <ResultSkeleton key={index} />
            ))}
          </div>
        )}

        {hasQuery && !loading && error && (
          <div className="rounded-2xl border border-red-400/15 bg-red-400/[0.04] px-4 py-5 text-sm text-red-200/80">
            <p>We couldn't search right now. Please try again.</p>
            <button
              type="button"
              onClick={retry}
              className="mt-3 inline-flex h-9 items-center rounded-full bg-white px-4 text-xs font-bold text-color-bg transition hover:bg-color-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
            >
              Try again
            </button>
          </div>
        )}

        {hasQuery && !loading && !error && results.length === 0 && (
          <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-5 text-sm text-white/45">
            No films or series found for "{trimmedQuery}".
          </div>
        )}

        {hasQuery && !loading && !error && results.length > 0 && (
          <div aria-live="polite">
            <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
              Results
            </p>
            <ul className="space-y-2">
              {results.slice(0, 8).map((item) => {
                const isSeries = item.media_type === "tv";
                const title =
                  item.title || item.name || item.original_title || "Untitled";
                const date = item.release_date || item.first_air_date;
                const year = date ? date.slice(0, 4) : null;
                const rating =
                  typeof item.vote_average === "number" &&
                  item.vote_average > 0
                    ? item.vote_average.toFixed(1)
                    : null;

                const rowContent = (
                  <>
                    <div className="h-16 w-11 shrink-0 overflow-hidden rounded-lg bg-white/[0.04]">
                      {item.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                          alt=""
                          aria-hidden="true"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-white/25">
                          <IoFilmOutline size={18} />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white/90">
                        {title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/40">
                        <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]">
                          {isSeries ? "Series" : "Film"}
                        </span>
                        {year && <span>{year}</span>}
                        {rating && (
                          <span className="inline-flex items-center gap-1 text-color-primary/80">
                            <IoStar size={10} />
                            {rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <IoArrowForward
                      size={15}
                      className="shrink-0 text-white/25 transition group-hover/result:text-white/70"
                    />
                  </>
                );

                const rowClassName =
                  "group/result flex w-full items-center gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-2.5 text-left transition duration-200 hover:border-white/15 hover:bg-white/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary";

                return (
                  <li key={`${item.media_type}-${item.id}`}>
                    <NavLink
                      to={
                        isSeries
                          ? `/series/${item.id}`
                          : `/movie/${item.id}`
                      }
                      onClick={onClose}
                      aria-label={`View ${
                        isSeries ? "series" : "film"
                      } details for ${title}`}
                      className={rowClassName}
                    >
                      {rowContent}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPanel;
