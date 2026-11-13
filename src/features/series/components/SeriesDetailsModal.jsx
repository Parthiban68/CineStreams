import React, { useEffect, useRef } from "react";
import {
  IoAlbumsOutline,
  IoCalendarOutline,
  IoCloseOutline,
  IoStar,
} from "react-icons/io5";
import {
  SkeletonBase,
  SkeletonText,
} from "../../../components/skeletons";
import ContentState from "../../../components/common/ContentState";
import useSeriesDetails from "../hooks/useSeriesDetails";
import { TV_GENRE_MAP } from "../seriesGenres";

const formatAirDate = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DetailStat = ({ label, value }) => (
  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3">
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/35">
      {label}
    </p>
    <p className="mt-1 text-sm font-semibold text-white/85">{value || "—"}</p>
  </div>
);

const SeriesDetailsSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading series details"
    className="mt-6 space-y-4"
  >
    <SkeletonText lines={3} lineClassName="h-3.5" />
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <SkeletonBase key={index} className="h-20 rounded-2xl" />
      ))}
    </div>
  </div>
);

const SeriesDetailsModal = ({ series, initialDetails, onClose }) => {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const { data: details, loading, error, refetch } = useSeriesDetails({
    seriesId: series?.id,
    initialData: initialDetails,
  });

  useEffect(() => {
    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [onClose]);

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
  const formattedAirDate = formatAirDate(firstAirDate);
  const ratingValue = details?.vote_average ?? series.vote_average;
  const rating =
    typeof ratingValue === "number" && ratingValue > 0
      ? ratingValue.toFixed(1)
      : null;
  const genres = details?.genres?.map((genre) => genre.name) || [];
  const fallbackGenres = (series.genre_ids || [])
    .map((id) => TV_GENRE_MAP[id])
    .filter(Boolean);
  const displayGenres = genres.length > 0 ? genres : fallbackGenres;
  const seasons = (details?.seasons || [])
    .filter((season) => season.season_number > 0)
    .slice(0, 8);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="series-details-title"
        onClick={(event) => event.stopPropagation()}
        className="animate-slide-up relative max-h-[92vh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-white/10 bg-color-bg shadow-2xl sm:max-h-[90vh] sm:max-w-3xl sm:rounded-3xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close series details"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/80 backdrop-blur-sm transition duration-200 hover:bg-black/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <IoCloseOutline size={22} />
        </button>

        <div className="relative h-56 overflow-hidden sm:h-64">
          {imagePath ? (
            <img
              src={`https://image.tmdb.org/t/p/original${imagePath}`}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[center_25%]"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-white/[0.08] to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-color-bg via-color-bg/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-color-bg/60 to-transparent" />
        </div>

        <div className="relative -mt-16 px-5 pb-8 sm:px-8">
          <h2
            id="series-details-title"
            className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl"
          >
            {title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/60">
            {rating && (
              <span className="inline-flex items-center gap-1 rounded-md bg-color-primary px-2 py-0.5 text-xs font-bold text-color-bg">
                <IoStar size={12} />
                {rating}
              </span>
            )}
            {formattedAirDate && (
              <span className="inline-flex items-center gap-1.5">
                <IoCalendarOutline size={14} />
                {formattedAirDate}
              </span>
            )}
            {typeof details?.number_of_seasons === "number" && (
              <span className="inline-flex items-center gap-1.5">
                <IoAlbumsOutline size={14} />
                {details.number_of_seasons}{" "}
                {details.number_of_seasons === 1 ? "season" : "seasons"}
              </span>
            )}
            {details?.status && <span>{details.status}</span>}
          </div>

          {displayGenres.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {displayGenres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          {overview && (
            <p className="mt-5 text-sm leading-6 text-white/70 sm:text-base sm:leading-7">
              {overview}
            </p>
          )}

          {loading && <SeriesDetailsSkeleton />}

          {!loading && error && (
            <div className="mt-6">
              <ContentState
                variant="error"
                title="Full details are unavailable"
                message="We couldn't load the complete series details. Please try again."
                actionLabel="Try again"
                onAction={refetch}
              />
            </div>
          )}

          {!loading && !error && details && (
            <>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailStat
                  label="Seasons"
                  value={details.number_of_seasons}
                />
                <DetailStat
                  label="Episodes"
                  value={details.number_of_episodes}
                />
                <DetailStat label="Status" value={details.status} />
                <DetailStat
                  label="Network"
                  value={details.networks?.[0]?.name}
                />
              </div>

              {seasons.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
                    Seasons
                  </h3>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {seasons.map((season) => (
                      <div
                        key={season.id || season.season_number}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white/85">
                            {season.name || `Season ${season.season_number}`}
                          </p>
                          <p className="mt-0.5 text-xs text-white/40">
                            {season.air_date
                              ? season.air_date.slice(0, 4)
                              : "Air date unavailable"}
                          </p>
                        </div>
                        {typeof season.episode_count === "number" && (
                          <span className="shrink-0 text-xs font-semibold text-white/50">
                            {season.episode_count} eps
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsModal;
