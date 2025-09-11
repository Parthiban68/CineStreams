import React, { useRef } from "react";
import comedyMoviesInHome from "../hooks/useComdeyMoviesInHome";
import { NavLink } from "react-router-dom";

function ComdeyMovieCard({ movie }) {
  const { poster_path, title, vote_average, overview, release_date } = movie;

  return (
    <div className="relative h-80 rounded-xl overflow-hidden shadow-lg group bg-color-bg min-w-56 md:min-w-52 lg:min-w-52">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 rounded-xl"
        draggable={false}
      />

      <div className="absolute bottom-8 left-3 z-20 text-base font-bold text-white drop-shadow-sm">
        <span>{title}</span>
      </div>

      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 text-sm text-white drop-shadow-sm">
        <span className="text-yellow-400 text-lg">★</span>
        <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
      </div>

      {/* Hover Details Overlay */}
      <div className="absolute inset-0 bg-black/20 text-white opacity-0 z-30 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md flex flex-col justify-end p-4 rounded-xl">
        <h2 className="text-base font-bold mb-1">{title}</h2>

        <div className="flex items-center gap-1 text-base text-white mb-2">
          <span className="text-yellow-400 text-base">★</span>
          <span>{vote_average ? vote_average.toFixed(1) : "N/A"}</span>
        </div>

        <p className="text-xs mb-2 line-clamp-3">
          {overview || "No overview available."}
        </p>

        <div className="text-white text-xs font-bold">
          {release_date
            ? new Date(release_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Unknown release"}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10 rounded-b-xl" />
    </div>
  );
}

const ComedyMovieCards = () => {
  const { list, loading, error } = comedyMoviesInHome();
  const scrollRef = useRef(null);

  const scroll = (amount) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (loading || list === null)
    return <p className="text-center text-white text-2xl mt-6">Loading...</p>;
  if (error) return <p className="text-center text-gray-500">error</p>;

  return (
    <div className="h-auto py-12 px-5">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl">Comedy Movies</h1>
        <NavLink to={`/seeall/35`} className="mr-hover:underline  text-lg font-semibold">
            See all
        </NavLink>
      </div>
      <div className="relative">
        <button
          aria-label="Scroll Left"
          className="
    absolute left-0 top-1/2 z-40 -translate-y-1/2
    bg-white/30 hover:bg-white/50
    backdrop-blur-lg
    border border-white/40
    shadow-lg
    text-gray-800 dark:text-white
    rounded-full px-3 py-2 transition
    duration-200 ease-in-out hover:scale-110
    ring-1 ring-white/30
    focus:outline-none focus:ring-2 focus:ring-white/60
    "
          onClick={() => scroll(-300)}
        >
          &#8592;
        </button>
        <button
          aria-label="Scroll Right"
          className="
    absolute right-0 top-1/2 z-40 -translate-y-1/2
    bg-white/30 hover:bg-white/50
    backdrop-blur-lg
    border border-white/40
    shadow-lg
    text-gray-800 dark:text-white
    rounded-full px-3 py-2 transition
    duration-200 ease-in-out hover:scale-110
    ring-1 ring-white/30
    focus:outline-none focus:ring-2 focus:ring-white/60
    "
          onClick={() => scroll(300)}
        >
          &#8594;
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 mx-auto"
        >
          {list.map((movie) => (
            <NavLink to={`/movie/${movie.id}`}>
              <ComdeyMovieCard key={movie.id} movie={movie} />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComedyMovieCards;
