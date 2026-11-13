import { useEffect } from "react";
import { getMoviesBasedonComedy } from "../services/homeMovieServices";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComdeyMovieInHomeStart,
  fetchComdeyMovieInHomeSuccess,
  fetchComdeyMovieInHomeFailure,
} from "../../../store/slices/comedyMovieInHomeSlice";

const useComedyMoviesInHome = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.comdeyMovieInHome
  );
  useEffect(() => {
    const loadComdeyMoviesInHome = async () => {
      try {
        dispatch(fetchComdeyMovieInHomeStart());
        const data = await getMoviesBasedonComedy();
        dispatch(fetchComdeyMovieInHomeSuccess(data));
      } catch (error) {
        dispatch(
          fetchComdeyMovieInHomeFailure(
            error?.message || "Unable to load comedy movies."
          )
        );
      }
    };
    loadComdeyMoviesInHome();
  }, [dispatch]);
  return { list, loading, error };
};

export default useComedyMoviesInHome;
