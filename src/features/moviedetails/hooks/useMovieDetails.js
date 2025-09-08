import { useEffect } from "react";
import { getMovieDetailsById } from "../services/movieDetailsService";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovieDetailsByIdStart,
  fetchMovieDetailsByIdSuccess,
  fetchMovieDetailsByIdFailure,
} from "../../../store/slices/movieDetailsSlice";

const fetchMovieDetails = (id) => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(
    (state) => state.movieDetailsById
  );
  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        dispatch(fetchMovieDetailsByIdStart());
        const data = await getMovieDetailsById(id);
        dispatch(fetchMovieDetailsByIdSuccess(data));
      } catch (error) {
        dispatch(fetchMovieDetailsByIdFailure(error));
      }
    };
    fetchMovieById();
  },[dispatch]);
  return { list, loading, error };
};

export default fetchMovieDetails;
