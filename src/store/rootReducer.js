import { combineReducers } from "@reduxjs/toolkit";
import tredingMovieReducer from "./slices/trendingMovieSlice";
import movieDetailsById from "./slices/movieDetailsSlice";
import popularMovies from "./slices/popularMoviesSlice";

const rootReducer = combineReducers({
  trendingMovies: tredingMovieReducer,
  movieDetailsById: movieDetailsById,
  popularMovies: popularMovies,
});

export default rootReducer;
