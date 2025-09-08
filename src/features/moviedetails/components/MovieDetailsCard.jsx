import React from "react";
import { useParams } from "react-router-dom";
import fetchMovieDetails from "../hooks/useMovieDetails";

const MovieDetailsCard = () => {
  const { id } = useParams();
  const { list, loading, error } = fetchMovieDetails(id);
  if (loading || list === null)
    return <p className="text-center text-white text-2xl mt-6">Loading...</p>;
  if (error) return <p className="text-center text-gray-500">error</p>;

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden shadow-2xl bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${list.backdrop_path}`}
          alt="Show Background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10 " />
      </div>

      {/* Main Content (Left-aligned) */}
      <div className="flex justify-start items-center px-10 space-x-10">
        <div className="z-10 flex flex-col items-center space-y-3">
          <img
            src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
            alt="Bodies"
            className="w-[22rem] h-[33rem] rounded-xl object-cover border-4 border-white/60 shadow-lg"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-10 py-10 min-h-screen max-w-[80%]">
          <span className="uppercase text-lg font-semibold text-color-primary tracking-widest">
            CineStream
          </span>
          <h1 className="text-[3rem] font-extrabold text-white drop-shadow-l">
            {list.original_title}
          </h1>
          <p className="-mt-3 text-lg mb-5 text-white/70">{list.tagline}</p>
          {/* Meta badges and info */}
          <div className="flex items-center gap-3 mb-5">
            <span className="flex items-center bg-yellow-400/90 rounded px-2 py-0.5 font-bold text-base text-gray-900 shadow backdrop-blur-md">
              IMDb&nbsp;{list.vote_average.toFixed(1)}
            </span>
            <span className="text-white/70 text-base">
              {list.original_language}
            </span>
            <span className="text-white/70 text-base">{list.release_date}</span>
            <span className="text-white/70 text-base">{list.runtime} mins</span>
          </div>
          {/* Description */}
          <p className="text-white/90 text-base max-w-lg mb-5">
            {list.overview}
          </p>
          {/* Genres */}
          <div className="flex gap-2 mb-6">
            {list.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-white/25 text-white text-base px-3 py-1 rounded-full"
              >
                {genre.name}
              </span>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex gap-4">
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
      </div>

      {/* Side mini-poster carousel (Right, optional) */}
    </div>
  );
};

export default MovieDetailsCard;
