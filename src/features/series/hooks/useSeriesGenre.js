import { useRef, useState } from "react";
import { getSeriesByGenre } from "../services/seriesService";

const useSeriesGenre = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [results, setResults] = useState(null);
  const [loadingGenreId, setLoadingGenreId] = useState(null);
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());
  const requestIdRef = useRef(0);

  const selectGenre = async (genre) => {
    if (!genre || loadingGenreId === genre.id) return;

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setSelectedGenre(genre);
    setError(null);

    if (cacheRef.current.has(genre.id)) {
      setResults(cacheRef.current.get(genre.id));
      setLoadingGenreId(null);
      return;
    }

    setResults(null);
    setLoadingGenreId(genre.id);

    try {
      const data = await getSeriesByGenre(genre.id);
      cacheRef.current.set(genre.id, data);

      if (requestId === requestIdRef.current) {
        setResults(data);
        setLoadingGenreId(null);
      }
    } catch (loadError) {
      if (requestId === requestIdRef.current) {
        setError(
          loadError?.message || "Unable to load series for this genre."
        );
        setResults(null);
        setLoadingGenreId(null);
      }
    }
  };

  return {
    selectedGenre,
    results,
    loading: loadingGenreId === selectedGenre?.id,
    error,
    selectGenre,
    retry: () => selectGenre(selectedGenre),
  };
};

export default useSeriesGenre;
