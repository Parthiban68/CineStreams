import { useEffect } from "react";
import { getMoviesBasedonGenresAndPage } from "../services/seeAllMovieService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSeeAllMoviesSliceStart,
  fetchSeeAllMoviesSliceSuccess,
  fetchSeeAllMoviesSliceFailure,
} from "../../../store/slices/seeAllMoviesSlice";

const useSeeAllMovies = ({ id, page }) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.seeAllMoviesSlice
  );
  useEffect(() => {
    const loadSeeAllMovies = async () => {
      try {
        dispatch(fetchSeeAllMoviesSliceStart());
        const data = await getMoviesBasedonGenresAndPage({ id, page });
        dispatch(fetchSeeAllMoviesSliceSuccess(data));
      } catch (error) {
        dispatch(
          fetchSeeAllMoviesSliceFailure(
            error?.message || "Unable to load movies."
          )
        );
      }
    };
    loadSeeAllMovies();
  }, [dispatch, id, page]);
  return { list, loading, error };
};

export default useSeeAllMovies;
