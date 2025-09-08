import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import fetchTrendingMovies from "../hooks/useMoviesHero";

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

function StarRating({ count = 0 }) {
  return (
    <div className="flex items-center space-x-1 my-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < count ? "text-yellow-400" : "text-gray-500"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <polygon points="10,1 12,7.5 19,7.5 13.5,12 15.5,19 10,15 4.5,19 6.5,12 1,7.5 8,7.5" />
        </svg>
      ))}
    </div>
  );
}

const MovieHero = () => {
  const { list, loading, error } = fetchTrendingMovies();
  const [selectedId, setSelectedId] = useState(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (list && list.length > 0 && selectedId === null) {
      setSelectedId(list[0].id);
    }
  }, [list, selectedId]);

  if (loading || !list || selectedId === null) {
    return <p className="text-center text-white text-2xl mt-6 ">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-gray-500">Error, {error}</p>;
  }

  const selectedMovie = list.find((m) => m.id === selectedId);
  
  const scrollByOffset = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-end bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
      }}
    >
      <div className="relative z-10 flex flex-col justify-center px-20 py-10 max-w-[60%]">
        <span className="uppercase text-lg font-semibold text-color-primary tracking-widest">
          CineStream
        </span>
        <h1 className="text-[3rem] font-extrabold text-white drop-shadow-l">
          {selectedMovie?.original_title}
        </h1>
        <p className="-mt-3 text-lg mb-7 text-white/70">
          {selectedMovie?.tagline}
        </p>
        {/* Meta badges and info */}
        <div className="flex items-center gap-3 mb-7">
          <span className="flex items-center bg-yellow-400/90 rounded px-2 py-0.5 font-bold text-base text-gray-900 shadow backdrop-blur-md">
            IMDb&nbsp;{selectedMovie?.vote_average.toFixed(1)}
          </span>
          <span className="text-white/70 text-base">
            {selectedMovie?.original_language}
          </span>
          <span className="text-white/70 text-base">
            {selectedMovie?.release_date}
          </span>
          <span className="text-white/70 text-base">
            {selectedMovie?.runtime} mins
          </span>
        </div>
        {/* Description */}
        <p className="text-white/90 text-base max-w-lg mb-7">
          {selectedMovie?.overview}
        </p>
        {/* Genres */}
        <div className="flex gap-2 mb-6">
          {selectedMovie.genre_ids.map((genre) => (
            <span
              key={genre}
              className="bg-white/25 text-white text-base px-3 py-1 rounded-full"
            >
              {genreMap[genre]}
            </span>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-4 mb-10">
          {/* Glossy white button */}
          <button className="bg-white/80 backdrop-blur-lg opacity-100 rounded-full px-6 py-2 font-semibold text-black shadow-md hover:opacity-90 transition-all flex items-center gap-2">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="text-black"
              aria-hidden="true"
            >
              <polygon points="5,4 15,10 5,16" />
            </svg>
            Watch Now
          </button>

          {/* Glossy outlined button */}
          <button className="bg-black/50 border border-white/40 backdrop-blur-lg rounded-full px-6 py-2 font-semibold text-white shadow-md hover:bg-black/50 transition-all">
            + Watchlist
          </button>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      {/* Hero Content */}
      <div className="relative z-20 w-full px-4 sm:px-2 pb-8">
      {/* Left Arrow */}
      <button
        onClick={() => scrollByOffset(-200)}
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 z-30 bg-transparent backdrop-blur-lg bg-opacity-50 rounded-full text-white hover:bg-opacity-80 transition"
        aria-label="Scroll Left"
      >
        <IoMdArrowDropleft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => scrollByOffset(200)}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 z-30 bg-transparent backdrop-blur-lg bg-opacity-50 rounded-full text-white hover:bg-opacity-80 transition"
        aria-label="Scroll Right"
      >
        <IoMdArrowDropright size={30} />
      </button>

      <div
        ref={carouselRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide py-2 px-2 sm:px-0 snap-x snap-mandatory scroll-smooth"
      >
        {list.map((movie) => (
          <div
            key={movie.id}
            onClick={() => setSelectedId(movie.id)}
            className={`flex-shrink-0 w-32 sm:w-36 md:w-40 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 
            snap-center bg-gradient-to-b from-transparent to-black relative 
            ${
              movie.id === selectedId
                ? "ring-4 ring-gray-400 shadow-lg"
                : "ring-0"
            }`}
          >
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
              className="w-full h-44 sm:h-52 object-cover rounded-xl"
              loading="lazy"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 to-transparent  p-2">
              <p
                className={`text-white text-center text-xs sm:text-sm font-semibold truncate ${
                  movie.id === selectedId ? "font-bold" : ""
                }`}
              >
                {movie.original_title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MovieHero;
