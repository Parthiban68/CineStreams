import React, { useRef } from "react";
import useMoviesCard from "../hooks/useMoviesCard";
import { NavLink } from "react-router-dom";
import useHomeMovies from "../hooks/useHomeMovies";

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

// Movie Card component (unchanged)
function MovieCardMini({
  poster_path,
  title,
  genre_ids,
  overview,
  vote_average,
  release_date,
}) {
  return (
    <div className="relative w-52 h-80 rounded-xl overflow-hidden shadow-lg group">
      {/* Poster Image */}
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        draggable={false}
      />

      {/* Title - Bottom Left, with z-index */}
      <div className="absolute bottom-8 left-3 z-20 text-base font-bold text-white drop-shadow-sm ">
        <span>{title}</span>
      </div>

      {/* Rating - Bottom Left, below title, with z-index */}
      <div className="absolute bottom-2 left-3 z-20 flex items-center gap-1 text-sm text-white drop-shadow-sm">
        <span className="text-yellow-400 text-lg">★</span>
        <span>{vote_average.toFixed(1)}</span>
      </div>

      {/* Hover Details Overlay */}
      <div className="absolute inset-0 bg-black/20 text-white opacity-0 z-30 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md flex flex-col justify-end p-4 ">
        <h2 className="text-base font-bold mb-1">{title}</h2>
        <div className="flex items-center gap-1 text-base text-white mb-2">
          <span className="text-yellow-400 text-base">★</span>
          <span>{vote_average.toFixed(1)}</span>
        </div>

        <p className="text-xs mb-2 line-clamp-3">{overview}</p>
        <div className="flex flex-wrap gap-1 justify-start mb-2">
          {genre_ids.map((id) => (
            <span
              key={id}
              className="bg-color-bg text-xs font-medium text-white px-2 py-0.5 rounded-md"
            >
              {genreMap[id] || "Other"}
            </span>
          ))}
        </div>
        <div className="text-white text-xs font-bold">
          {new Date(release_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />
    </div>
  );
}

function MovieHorizontalScroll({ movies }) {
  const scrollRef = useRef(null);

  useMoviesCard(scrollRef);

  const scrollByCard = (dir) => {
    const cardWidth = 196;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir * cardWidth * 2.5,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full py-6 select-none">
      {/* Scrollable Card Row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pl-10 pr-10 gap-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((m, idx) => (
          <div key={m.title + idx} className="snap-start">
            <NavLink to={`/movie/${m.id}`}>
              <MovieCardMini {...m} />
            </NavLink>
          </div>
        ))}
      </div>

      {/* Buttons at Bottom Center */}
      <div className="flex justify-center gap-6 mt-4">
        <button
          aria-label="Scroll Left"
          onClick={() => scrollByCard(-1)}
          className="bg-white/40 backdrop-blur-lg opacity-100 rounded-full p-3 shadow-md border border-white/40"
        >
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          aria-label="Scroll Right"
          onClick={() => scrollByCard(1)}
          className="bg-white/40 backdrop-blur-lg opacity-100 rounded-full p-3 shadow-md border border-white/40"
        >
          <svg
            width={20}
            height={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function MovieCards() {
  const { list, loading, error } = useHomeMovies();

  if (loading || list === null)
    return <p className="text-center text-white text-2xl mt-6">Loading...</p>;
  if (error) return <p className="text-center text-gray-500">error</p>;
  return (
    <div className="h-auto py-12 px-5">
      <h1 className="text-3xl mb-2">Trending Movies</h1>
      <div className="mx-auto">
        <MovieHorizontalScroll movies={list} />
      </div>
    </div>
  );
}
