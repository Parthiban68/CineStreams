import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import sellAllMovies from "../hooks/useSeeAllMovies";

const SeeAllMovieCards = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const totalPages = 100; // Fixed for redesign

  const { list, loading, error } = sellAllMovies({ id, page });

  if (loading || list === null)
    return <p className="text-center text-white text-2xl mt-10">Loading...</p>;
  if (error) return <p className="text-center text-gray-500">error</p>;

  const paginationRange = () => {
    const delta = 2;
    const range = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
        l = i;
      } else if (l && i - l > 1) {
        range.push("...");
        l = null;
      }
    }
    return range;
  };

  return (
    <div className="py-10 px-3 max-w-[101rem] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-20">
        {list.map((movie) => (
          <NavLink to={`/movie/${movie.id}`}>
            <div
              key={movie.id}
              className=" rounded-3xl shadow-lg p-6 flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="rounded-2xl h-80 w-54 object-cover mb-2 select-none"
                draggable={false}
              />
              <h2 className="text-lg font-extrabold mb-2 text-white truncate">
                {movie.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3 flex-grow mb-2 text-[0.75rem]">
                {movie.overview || "No overview available."}
              </p>
              <div className="flex items-center gap-2 text-yellow-500 font-bold text-base mt-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.978a1 1 0 00.95.69h4.214c.969 0 1.371 1.24.588 1.81l-3.417 2.48a1 1 0 00-.364 1.118l1.286 3.977c.3.922-.755 1.688-1.54 1.118l-3.417-2.48a1 1 0 00-1.175 0l-3.417 2.48c-.784.57-1.838-.196-1.539-1.118l1.285-3.977a1 1 0 00-.363-1.118L2.035 9.405c-.783-.57-.38-1.81.588-1.81h4.215a1 1 0 00.95-.69l1.286-3.978z" />
                </svg>
                <span className="text-white">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Pagination Bar */}
      <div className="flex justify-center mt-14">
        <nav className="inline-flex items-center bg-white/40 dark:bg-neutral-800/50 backdrop-blur-lg rounded-xl px-6 py-3 shadow-lg select-none">
          {paginationRange().map((item, index) =>
            item === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1 mx-1 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={item}
                onClick={() => setPage(item)}
                className={`px-4 py-2 mx-1 rounded-lg font-semibold transition 
                  ${
                    item === page
                      ? "bg-white/80 dark:bg-neutral-900 text-blue-600 shadow-lg"
                      : "hover:bg-white/60 hover:dark:bg-neutral-700 text-gray-900 dark:text-gray-100"
                  }
                `}
              >
                {item}
              </button>
            )
          )}
        </nav>
      </div>
    </div>
  );
};

export default SeeAllMovieCards;
