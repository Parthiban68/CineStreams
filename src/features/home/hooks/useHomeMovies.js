import { useEffect } from "react";
import { getTrendingMovies } from "../services/homeMovieServices";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccees,
  fetchPopularMoviesFailre,
} from "../../../store/slices/popularMoviesSlice";

const useHomeMovies = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.popularMovies);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        dispatch(fetchPopularMoviesStart());
        const data = await getTrendingMovies();
        dispatch(fetchPopularMoviesSuccees(data));
      } catch (error) {
        dispatch(fetchPopularMoviesFailre(error.message));
      }
    };
    loadMovies();
  }, [dispatch]);
  return { list, loading, error };
};

export default useHomeMovies;
