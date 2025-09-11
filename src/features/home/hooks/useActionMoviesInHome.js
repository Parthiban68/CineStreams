import { useEffect } from "react";
import { getMoviesBasedonAction } from "../services/homeMovieServices";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchActionMovieInHomeStart,
  fetchActionMovieInHomeSuccess,
  fetchActionMovieInHomeFailure,
} from "../../../store/slices/actionMovieInHomeSlice";

const actionMoviesInHome = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.actionMovieInHome
  );
  useEffect(() => {
    const loadActionMoviesInHome = async () => {
      try {
        dispatch(fetchActionMovieInHomeStart());
        const data = await getMoviesBasedonAction();
        console.log(data);

        dispatch(fetchActionMovieInHomeSuccess(data));
      } catch (error) {
        dispatch(fetchActionMovieInHomeFailure());
      }
    };
    loadActionMoviesInHome();
  }, [dispatch]);
  return { list, loading, error };
};

export default actionMoviesInHome;
