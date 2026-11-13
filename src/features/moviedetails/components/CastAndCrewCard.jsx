import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  SkeletonAvatar,
  SkeletonBase,
  SkeletonText,
} from "../../../components/skeletons";

const FALLBACK_AVATAR =
  "https://via.placeholder.com/160x160?text=Cast";

const formatReleaseDate = (releaseDate) => {
  if (!releaseDate) return "Not available";

  const date = new Date(releaseDate);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const InfoRow = ({ label, children }) => (
  <div className="flex gap-2">
    <span className="w-24 shrink-0 font-semibold text-white">{label}:</span>
    <span className="min-w-0 text-white/75">{children}</span>
  </div>
);

const CastSectionSkeleton = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading cast and crew"
    className="mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 md:px-8 lg:px-12"
  >
    <div
      aria-hidden="true"
      className="flex flex-col gap-8 md:flex-row md:gap-10"
    >
      <SkeletonBase className="mx-auto aspect-[2/3] w-48 shrink-0 rounded-2xl sm:w-56 md:mx-0 md:w-72" />
      <div className="flex-1 space-y-5">
        <SkeletonBase className="h-9 w-2/3 rounded-xl" />
        <SkeletonText lines={3} lineClassName="h-3.5" />
        <div className="flex gap-4 overflow-hidden pt-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex w-24 shrink-0 flex-col items-center gap-2"
            >
              <SkeletonAvatar className="h-24 w-24" />
              <SkeletonBase className="h-2.5 w-20 rounded-full" />
              <SkeletonBase className="h-2.5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CastAndCrewCard = () => {
  const { list, loading, error } = useSelector(
    (state) => state.movieDetailsById
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [drawerOpen]);

  if (loading) {
    return <CastSectionSkeleton />;
  }

  if (error || !list) {
    return null;
  }

  const cast = list.credits?.cast || [];
  const genres = list.genres || [];
  const countries = list.production_countries || [];
  const rating =
    typeof list.vote_average === "number"
      ? list.vote_average.toFixed(1)
      : "Not available";

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 bg-color-bg px-4 py-12 text-white sm:px-6 md:flex-row md:gap-10 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-xs shrink-0 md:mx-0 md:w-72 lg:w-80">
        <img
          src={
            list.poster_path
              ? `https://image.tmdb.org/t/p/original${list.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={list.original_title || list.title || "Movie poster"}
          className="aspect-[2/3] w-full rounded-2xl object-cover shadow-xl"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          {list.original_title || list.title}
        </h2>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0">
            <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-300">
              STORYLINE
            </h4>
            <p className="mb-5 text-sm leading-6 text-gray-200 sm:text-base">
              {list.overview || "No overview available for this movie."}
            </p>

            <div className="space-y-2 text-sm leading-6 text-gray-300 sm:text-[15px]">
              <InfoRow label="Rating">{rating}</InfoRow>
              <InfoRow label="Release date">
                {formatReleaseDate(list.release_date)}
              </InfoRow>
              {genres.length > 0 && (
                <InfoRow label="Genres">
                  {genres.map((genre) => genre.name).join(", ")}
                </InfoRow>
              )}
              {countries.length > 0 && (
                <InfoRow label="Countries">
                  {countries.map((country) => country.name).join(", ")}
                </InfoRow>
              )}
              {list.runtime ? (
                <InfoRow label="Duration">{list.runtime} mins</InfoRow>
              ) : null}
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h4 className="text-xl font-semibold text-gray-300 sm:text-2xl">
                Cast
              </h4>
              {cast.length > 0 && (
                <button
                  type="button"
                  onClick={toggleDrawer}
                  className="shrink-0 text-sm font-semibold text-color-primary hover:underline sm:text-base"
                >
                  See all
                </button>
              )}
            </div>

            {cast.length > 0 ? (
              <ul className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide sm:mx-0 sm:gap-5 sm:px-0">
                {cast.slice(0, 5).map((actor, index) => (
                  <li
                    key={`${actor.id}-${index}`}
                    className="flex w-24 shrink-0 flex-col items-center sm:w-28"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : FALLBACK_AVATAR
                      }
                      alt={actor.name}
                      className="h-24 w-24 rounded-full border border-gray-600 object-cover shadow-md sm:h-28 sm:w-28"
                      loading="lazy"
                    />
                    <span className="mt-2 block w-full truncate text-center text-xs font-semibold text-white">
                      {actor.name}
                    </span>
                    <span className="block w-full truncate text-center text-xs text-gray-300">
                      {actor.character}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/50">
                Cast information is not available.
              </p>
            )}
          </div>
        </div>
      </div>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end bg-black/70"
          role="dialog"
          aria-modal="true"
          aria-label="Full cast and crew"
          onClick={toggleDrawer}
        >
          <div
            className="max-h-[90vh] w-full animate-slide-up overflow-y-auto rounded-t-3xl bg-color-bg px-4 py-6 sm:px-6 sm:py-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">
                Full Cast &amp; Crew
              </h4>
              <button
                type="button"
                onClick={toggleDrawer}
                aria-label="Close cast drawer"
                className="text-2xl font-bold text-gray-400 transition hover:text-white"
              >
                &times;
              </button>
            </div>

            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {cast.map((actor, index) => (
                <li
                  key={`${actor.id}-${index}`}
                  className="flex flex-col items-center text-center"
                >
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : FALLBACK_AVATAR
                    }
                    alt={actor.name}
                    className="mb-2 h-20 w-20 rounded-full border border-gray-700 object-cover shadow-md sm:h-24 sm:w-24"
                    loading="lazy"
                  />
                  <p className="w-full truncate text-sm font-semibold text-white">
                    {actor.name}
                  </p>
                  <p className="w-full truncate text-xs text-gray-400">
                    {actor.character}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastAndCrewCard;
