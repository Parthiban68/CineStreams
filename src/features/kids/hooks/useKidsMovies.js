import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getKidsCategoryMovies,
  getKidsFeaturedMovies,
} from "../services/kidsMovieService";
import {
  fetchKidsMoviesFailure,
  fetchKidsMoviesStart,
  fetchKidsMoviesSuccess,
} from "../../../store/slices/kidsMoviesSlice";

const useKidsMovies = () => {
  const dispatch = useDispatch();
  const { hero, sections, loading, error } = useSelector(
    (state) => state.kidsMovies
  );
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadKidsMovies = async () => {
      dispatch(fetchKidsMoviesStart());

      try {
        const [featured, animation, family, adventure, comedy, fantasy] =
          await Promise.all([
            getKidsFeaturedMovies(),
            getKidsCategoryMovies(16),
            getKidsCategoryMovies(10751),
            getKidsCategoryMovies(12),
            getKidsCategoryMovies(35),
            getKidsCategoryMovies(14),
          ]);

        if (cancelled) return;

        const heroMovie =
          featured.find(
            (movie) => movie.backdrop_path && movie.overview
          ) ||
          featured[0] ||
          null;

        dispatch(
          fetchKidsMoviesSuccess({
            hero: heroMovie,
            sections: {
              featured,
              animation,
              family,
              adventure,
              comedy,
              fantasy,
            },
          })
        );
      } catch (loadError) {
        if (cancelled) return;
        dispatch(
          fetchKidsMoviesFailure(
            loadError?.message || "Unable to load the Kids collection."
          )
        );
      }
    };

    loadKidsMovies();

    return () => {
      cancelled = true;
    };
  }, [dispatch, reloadKey]);

  return {
    hero,
    sections,
    loading,
    error,
    refetch: () => setReloadKey((key) => key + 1),
  };
};

export default useKidsMovies;
