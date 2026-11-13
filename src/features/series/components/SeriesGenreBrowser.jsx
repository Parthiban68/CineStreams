import React from "react";
import { IoArrowForward } from "react-icons/io5";
import ContentState from "../../../components/common/ContentState";
import useSeriesGenre from "../hooks/useSeriesGenre";
import { SERIES_GENRES } from "../seriesGenres";
import SeriesCard from "./SeriesCard";
import SeriesGridSkeleton from "./skeletons/SeriesGridSkeleton";

const SeriesGenreBrowser = ({ onSelectSeries }) => {
  const {
    selectedGenre,
    results,
    loading,
    error,
    selectGenre,
    retry,
  } = useSeriesGenre();

  return (
    <section
      id="series-genres"
      aria-labelledby="series-genres-heading"
      aria-busy={loading}
      className="scroll-mt-10"
    >
      <div className="mb-5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-color-primary" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Find your next watch
          </p>
        </div>
        <h2
          id="series-genres-heading"
          className="text-xl font-bold tracking-tight text-white sm:text-2xl"
        >
          Browse by Genre
        </h2>
        <p className="mt-1 max-w-xl text-sm text-white/45">
          Pick a genre to explore popular series in that category.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SERIES_GENRES.map((genre) => {
          const isActive = selectedGenre?.id === genre.id;

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => selectGenre(genre)}
              aria-pressed={isActive}
              className={`group flex min-h-24 items-center justify-between gap-3 rounded-2xl border p-4 text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary ${
                isActive
                  ? "border-color-primary/60 bg-color-primary/10 text-white"
                  : "border-white/[0.08] bg-white/[0.03] text-white/75 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">
                  {genre.name}
                </span>
                <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-white/35">
                  Explore
                </span>
              </span>
              <IoArrowForward
                size={16}
                className="shrink-0 text-white/35 transition duration-200 group-hover:translate-x-0.5 group-hover:text-color-primary"
              />
            </button>
          );
        })}
      </div>

      {selectedGenre && (
        <div className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Selected genre
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight text-white sm:text-xl">
                Popular in {selectedGenre.name}
              </h3>
            </div>
            {!loading && !error && results && (
              <span className="shrink-0 text-xs font-medium text-white/35">
                {results.length} titles
              </span>
            )}
          </div>

          {loading && (
            <SeriesGridSkeleton
              count={10}
              label={`Loading ${selectedGenre.name} series`}
            />
          )}

          {!loading && error && (
            <ContentState
              variant="error"
              title="This genre is unavailable"
              message="We couldn't load series for this genre. Please try again."
              actionLabel="Try again"
              onAction={retry}
            />
          )}

          {!loading && !error && results?.length === 0 && (
            <ContentState
              title={`No series in ${selectedGenre.name}`}
              message="There are no series in this genre right now."
              actionLabel="Refresh"
              onAction={retry}
            />
          )}

          {!loading && !error && results?.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {results.map((series) => (
                <SeriesCard
                  key={series.id}
                  series={series}
                  onSelect={onSelectSeries}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SeriesGenreBrowser;
