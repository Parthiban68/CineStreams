import { useEffect } from "react";
import { getTrendingMoviesWithExtraDetails } from "../services/useMovieService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrendingMovieStart,
  fetchTrendingMovieSuccess,
  fetchTrendingMovieFailure,
} from "../../../store/slices/trendingMovieSlice";

const useMoviesHero = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.trendingMovies);
  useEffect(() => {
    const loadTrendingMovies = async () => {
      try {
        dispatch(fetchTrendingMovieStart());
        const data = await getTrendingMoviesWithExtraDetails();
        dispatch(fetchTrendingMovieSuccess(data));
      } catch (error) {
        dispatch(fetchTrendingMovieFailure(error.message));
      }
    };
    loadTrendingMovies();
  }, [dispatch]);
  return { list, loading, error };
};

export default useMoviesHero;
