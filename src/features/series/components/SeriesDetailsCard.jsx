import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  IoAlbumsOutline,
  IoArrowBack,
  IoCalendarOutline,
  IoStar,
} from "react-icons/io5";
import ContentState from "../../../components/common/ContentState";
import {
  SkeletonBase,
  SkeletonText,
} from "../../../components/skeletons";
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
    className="min-h-[100svh] bg-color-bg px-4 pb-12 pt-24 sm:px-8 lg:px-14"
  >
    <div className="mx-auto w-full max-w-[1600px]">
      <SkeletonBase className="h-4 w-32 rounded-full" />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-12">
        <SkeletonBase className="aspect-[2/3] w-48 shrink-0 rounded-2xl sm:w-56 md:w-64 lg:w-[20rem] xl:w-[22rem]" />
        <div className="w-full max-w-3xl space-y-5">
          <SkeletonBase className="h-4 w-28 rounded-full" />
          <SkeletonBase className="h-12 w-4/5 rounded-2xl sm:h-14" />
          <SkeletonText lines={3} lineClassName="h-3.5" />
          <div className="flex flex-wrap gap-2">
            <SkeletonBase className="h-7 w-20 rounded-full" />
            <SkeletonBase className="h-7 w-24 rounded-full" />
            <SkeletonBase className="h-7 w-16 rounded-full" />
          </div>
          <SkeletonText lines={4} lineClassName="h-3.5" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonBase key={index} className="h-20 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SeriesDetailsCard = () => {
  const { id } = useParams();
  const { data, loading, error, refetch } = useSeriesDetails({
    seriesId: id,
  });

  if (loading) {
    return <SeriesDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-[100svh] bg-color-bg px-4 pb-12 pt-28 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-xl">
          <ContentState
            variant="error"
            title="Series details are unavailable"
            message="We couldn't load this series. Please try again in a moment."
            actionLabel="Try again"
            onAction={refetch}
          />
          <Link
            to="/series"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <IoArrowBack size={16} />
            Back to series
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-[100svh] bg-color-bg px-4 pb-12 pt-28 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-xl">
          <ContentState
            title="Series not found"
            message="This series may no longer be available."
          />
          <Link
            to="/series"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <IoArrowBack size={16} />
            Back to series
          </Link>
        </div>
      </div>
    );
  }

  const title = data.name || data.original_name || "Untitled";
  const imagePath = data.backdrop_path || data.poster_path;
  const posterPath = data.poster_path || data.backdrop_path;
  const formattedAirDate = formatAirDate(data.first_air_date);
  const rating =
    typeof data.vote_average === "number" && data.vote_average > 0
      ? data.vote_average.toFixed(1)
      : null;
  const genres =
    data.genres?.map((genre) => genre.name) ||
    (data.genre_ids || [])
      .map((genreId) => TV_GENRE_MAP[genreId])
      .filter(Boolean);
  const seasons = (data.seasons || []).filter(
    (season) => season.season_number > 0
  );

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        {imagePath ? (
          <img
            src={`https://image.tmdb.org/t/p/original${imagePath}`}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-[center_25%]"
          />
        ) : (
          <div className="h-full w-full bg-color-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-16 pt-24 sm:px-8 lg:px-14">
        <Link
          to="/series"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary"
        >
          <IoArrowBack size={16} />
          Back to series
        </Link>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="w-48 shrink-0 sm:w-56 md:w-64 lg:w-[20rem] xl:w-[22rem]">
            {posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
                alt={`${title} poster`}
                className="aspect-[2/3] w-full rounded-2xl border-4 border-white/50 object-cover shadow-2xl"
              />
            ) : (
              <div className="flex aspect-[2/3] w-full items-center justify-center rounded-2xl border-4 border-white/50 bg-white/[0.04] text-white/25">
                <IoAlbumsOutline size={48} />
              </div>
            )}
          </div>

          <div className="w-full max-w-3xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-color-primary sm:text-base">
              CineStream Series
            </span>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl xl:text-6xl">
              {title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
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
              {typeof data.number_of_seasons === "number" && (
                <span className="inline-flex items-center gap-1.5">
                  <IoAlbumsOutline size={14} />
                  {data.number_of_seasons}{" "}
                  {data.number_of_seasons === 1 ? "season" : "seasons"}
                </span>
              )}
              {data.status && <span>{data.status}</span>}
            </div>

            {genres.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/75"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
              {data.overview || "No overview available for this series."}
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <DetailStat label="Seasons" value={data.number_of_seasons} />
              <DetailStat label="Episodes" value={data.number_of_episodes} />
              <DetailStat label="Status" value={data.status} />
              <DetailStat
                label="Network"
                value={data.networks?.[0]?.name}
              />
            </div>

            {seasons.length > 0 && (
              <div className="mt-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-white/45">
                  Seasons
                </h2>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {seasons.map((season) => (
                    <div
                      key={season.id || season.season_number}
                      className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3.5 py-3"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeriesDetailsCard;
