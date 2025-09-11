import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CastAndCrewCard = () => {
  const { list, loading, error } = useSelector(
    (state) => state.movieDetailsById
  );

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [drawerOpen]);

  if (loading || list === null)
    return <p className="text-center text-white text-2xl mt-6">Loading...</p>;
  if (error) return <p className="text-center text-gray-500">error</p>;
  const movie = {
    title: "Coco",
    poster:
      "https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
    storyline:
      "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.",
    rating: 8.4,
    releaseYear: 2017,
    genres: [
      "Animation",
      "Adventure",
      "Comedy",
      "Family",
      "Fantasy",
      "Music",
      "Mystery",
    ],
    countries: ["United States"],
    duration: "1h 45min",
    cast: [
      {
        name: "Anthony Gonzalez",
        role: "Miguel (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Anthony_Gonzalez_by_Gage_Skidmore.jpg/120px-Anthony_Gonzalez_by_Gage_Skidmore.jpg",
      },
      {
        name: "Gael García Bernal",
        role: "Héctor (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Gael_García_Bernal_-_Berlinale_2020.jpg/120px-Gael_García_Bernal_-_Berlinale_2020.jpg",
      },
      {
        name: "Benjamin Bratt",
        role: "Ernesto de la Cruz (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Benjamin_Bratt_SDCC_2015.jpg/120px-Benjamin_Bratt_SDCC_2015.jpg",
      },
      {
        name: "Alanna Ubach",
        role: "Mamá Imelda (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Alanna_Ubach_by_Gage_Skidmore.jpg/120px-Alanna_Ubach_by_Gage_Skidmore.jpg",
      },
      {
        name: "Benjamin Bratt",
        role: "Ernesto de la Cruz (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Benjamin_Bratt_SDCC_2015.jpg/120px-Benjamin_Bratt_SDCC_2015.jpg",
      },
      {
        name: "Alanna Ubach",
        role: "Mamá Imelda (voice)",
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Alanna_Ubach_by_Gage_Skidmore.jpg/120px-Alanna_Ubach_by_Gage_Skidmore.jpg",
      },
    ],
  };
  return (
    <div className="flex flex-col md:flex-row gap-10 bg-color-bg text-white px-4 py-12 md:px-16 min-h-[60vh]">
      <div className="w-full md:w-[320px] flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
          alt={movie.title}
          className="w-full h-full rounded-2xl shadow-xl"
        />
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <h2 className="text-4xl font-bold mb-2">{list.original_title}</h2>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Storyline + Info */}
          <div className="flex-1 min-w-[260px]">
            <h4 className="font-semibold mb-1 text-gray-300">STORYLINE</h4>
            <p className="mb-5 text-gray-200">{list.overview}</p>
            <div className="space-y-1 text-gray-300 text-[15px] leading-tight">
              <div>
                <span className=" font-semibold text-white w-20 inline-block">
                  Rating:
                </span>
                <span className="pl-2 text-white">{movie.rating}</span>
              </div>
              <div>
                <span className="font-semibold text-white w-20 inline-block">
                  Release date:
                </span>
                <span className="pl-2 text-white">{list.release_date}</span>
              </div>
              <div>
                <span className="font-semibold text-white w-20 inline-block">
                  Genres:
                </span>
                <span className=" text-blue-200 font-medium">
                  {list.genres.map((genre, index) => (
                    <span key={genre.id} className="px-2">
                      {genre.name}
                      {index < list.genres.length - 1 && ","}
                    </span>
                  ))}
                </span>
              </div>
              <div>
                <span className=" font-semibold text-white w-20 inline-block">
                  Countries:
                </span>
                <span className="pl-2 text-white">
                  {movie.countries.join(", ")}
                </span>
              </div>
              <div>
                <span className=" font-semibold text-white w-20 inline-block">
                  Duration:
                </span>
                <span className="pl-2 text-white">{list.runtime}</span>
              </div>
            </div>
          </div>
          {/* Cast List */}
          <div className="min-w-[180px] flex-1">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-2xl mb-1 text-gray-300">Cast</h4>
              <button
                onClick={toggleDrawer}
                className="ml-2 text-blue-400 hover:underline text-lg font-semibold"
              >
                See all
              </button>
            </div>
            <div className="flex items-center justify-between">
              <ul className="flex gap-5">
                {list.credits.cast.slice(0, 5).map((actor, idx) => (
                  <li key={idx} className="flex flex-col items-center">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                          : "https://thumbs.dreamstime.com/b/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-user-profile-vector-flat-304778094.jpg"
                      }
                      alt={actor.name}
                      className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-600"
                    />
                    <span className="font-semibold text-white text-xs mt-1 block text-center w-20 truncate">
                      {actor.name}
                    </span>
                    <span className="text-gray-300 text-xs font-normal block text-center w-20 truncate">
                      {actor.character}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Drawer */}
          {drawerOpen && (
            <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-60">
              <div className="bg-color-bg w-full max-h-[90vh] overflow-y-auto rounded-t-3xl px-6 py-8 animate-slide-up">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-semibold text-white text-lg">
                    Full Cast & Crew
                  </h4>
                  <button
                    onClick={toggleDrawer}
                    aria-label="Close cast drawer"
                    className="text-gray-400 hover:text-white text-2xl font-bold"
                  >
                    &times;
                  </button>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-6">
                  {list.credits.cast.map((actor, idx) => (
                    <li
                      key={idx}
                      className="flex flex-col items-center text-center"
                    >
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                            : "https://thumbs.dreamstime.com/b/user-profile-vector-flat-illustration-avatar-person-icon-gender-neutral-silhouette-profile-picture-user-profile-vector-flat-304778094.jpg"
                        }
                        alt={actor.name}
                        className="w-32 h-32 rounded-full object-cover shadow-md border border-gray-700 mb-2"
                      />
                      <p className="font-semibold text-white text-sm truncate w-full">
                        {actor.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate w-full">
                        {actor.character}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Add simple slide-up animation in Tailwind config or use this inline style */}
          <style jsx>{`
            .animate-slide-up {
              animation: slideUp 0.3s ease forwards;
            }
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0%);
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default CastAndCrewCard;
