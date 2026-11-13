import { useEffect, useState } from "react";
import { searchMulti } from "../services/searchService";

const useSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      setError(null);
      return undefined;
    }

    const controller = new AbortController();

    setLoading(true);
    setError(null);

    const timer = window.setTimeout(async () => {
      try {
        const nextResults = await searchMulti(
          trimmedQuery,
          controller.signal
        );

        if (controller.signal.aborted) return;

        setResults(nextResults);
        setLoading(false);
      } catch (searchError) {
        if (controller.signal.aborted) return;

        setResults([]);
        setLoading(false);
        setError(
          searchError?.message || "Unable to search right now. Try again."
        );
      }
    }, 350);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, retryKey]);

  return {
    results,
    loading,
    error,
    retry: () => setRetryKey((key) => key + 1),
  };
};

export default useSearch;
