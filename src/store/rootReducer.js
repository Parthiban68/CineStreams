import { combineReducers } from "@reduxjs/toolkit";
import tredingMovieReducer from "./slices/trendingMovieSlice";
import movieDetailsById from "./slices/movieDetailsSlice";
import popularMovies from "./slices/popularMoviesSlice";
import comdeyMovieInHome from "./slices/comedyMovieInHomeSlice";
import actionMovieInHome from "./slices/actionMovieInHomeSlice";
import seeAllMoviesSlice from "./slices/seeAllMoviesSlice";
import kidsMovies from "./slices/kidsMoviesSlice";
import seriesPage from "./slices/seriesPageSlice";
import homePage from "./slices/homePageSlice";

const rootReducer = combineReducers({
  trendingMovies: tredingMovieReducer,
  movieDetailsById: movieDetailsById,
  popularMovies: popularMovies,
  comdeyMovieInHome: comdeyMovieInHome,
  actionMovieInHome: actionMovieInHome,
  seeAllMoviesSlice: seeAllMoviesSlice,
  kidsMovies: kidsMovies,
  seriesPage: seriesPage,
  homePage: homePage,
});

export default rootReducer;
