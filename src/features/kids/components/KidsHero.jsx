import React from "react";
import { NavLink } from "react-router-dom";
import {
  IoInformationCircleOutline,
  IoPlay,
  IoSparkles,
  IoStar,
} from "react-icons/io5";

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

const KidsHero = ({ movie }) => {
  if (!movie) return null;

  const title = movie.title || movie.original_title || "Untitled";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;
  const rating =
    typeof movie.vote_average === "number" && movie.vote_average > 0
      ? movie.vote_average.toFixed(1)
      : null;
  const genres = (movie.genre_ids || [])
    .map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 3);
  const imagePath = movie.backdrop_path || movie.poster_path;

  const scrollToFeatured = () => {
    document
      .getElementById("kids-featured")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden sm:min-h-[600px] lg:min-h-[68vh]">
      {imagePath && (
        <img
          src={`https://image.tmdb.org/t/p/original${imagePath}`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[center_28%]"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-color-bg via-color-bg/80 to-color-bg/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-color-bg via-color-bg/35 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-14 pt-32 sm:px-8 sm:pb-16 md:pb-20 lg:px-14 lg:pb-24">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-kids-accent/30 bg-kids-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-kids-accent backdrop-blur-sm">
              <IoSparkles size={13} />
              CineStream Kids
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
              All ages
            </span>
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
            {rating && (
              <span className="inline-flex items-center gap-1 rounded-md bg-kids-sun px-2 py-0.5 text-xs font-bold text-[#211306]">
                <IoStar size={12} />
                {rating}
              </span>
            )}
            {year && <span>{year}</span>}
            {genres.length > 0 && (
              <>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{genres.join(" • ")}</span>
              </>
            )}
          </div>

          {movie.overview && (
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 line-clamp-3 sm:text-base sm:leading-7">
              {movie.overview}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={scrollToFeatured}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-color-bg transition duration-200 hover:bg-kids-sun focus:outline-none focus-visible:ring-2 focus-visible:ring-kids-sun focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
            >
              <IoPlay size={16} />
              Explore
            </button>
            <NavLink
              to={`/movie/${movie.id}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition duration-200 hover:border-white/35 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
            >
              <IoInformationCircleOutline size={18} />
              More Info
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KidsHero;
