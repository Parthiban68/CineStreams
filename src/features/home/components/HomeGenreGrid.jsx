import React from "react";
import { NavLink } from "react-router-dom";
import { IoArrowForward, IoGridOutline } from "react-icons/io5";

const HomeGenreGrid = ({ genres }) => {
  if (!genres?.length) return null;

  return (
    <section id="home-genres" className="scroll-mt-24">
      <div className="mb-5">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-color-primary" />
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Browse by genre
          </p>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Find your next obsession
        </h2>
        <p className="mt-1 max-w-xl text-sm text-white/45">
          Jump straight into a collection built around the stories you love.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {genres.map((genre) => (
          <NavLink
            key={genre.id}
            to={`/seeall/${genre.id}`}
            className="group/genre relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-color-primary focus-visible:ring-offset-2 focus-visible:ring-offset-color-bg"
          >
            {genre.imagePath ? (
              <img
                src={`https://image.tmdb.org/t/p/w780${genre.imagePath}`}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover transition duration-500 ease-out group-hover/genre:scale-105"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-color-primary/10 via-white/[0.03] to-white/[0.01] text-white/25">
                <IoGridOutline size={28} />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
              <span className="text-sm font-bold text-white drop-shadow-sm sm:text-base">
                {genre.name}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/75 backdrop-blur-sm transition duration-200 group-hover/genre:border-color-primary group-hover/genre:bg-color-primary group-hover/genre:text-color-bg">
                <IoArrowForward size={13} />
              </span>
            </div>
          </NavLink>
        ))}
      </div>
    </section>
  );
};

export default HomeGenreGrid;
