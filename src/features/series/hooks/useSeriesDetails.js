import { useEffect, useState } from "react";
import { getSeriesDetails } from "../services/seriesService";

const useSeriesDetails = ({ seriesId, initialData = null }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(
    Boolean(seriesId) && !initialData
  );
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    if (!seriesId) {
      setData(null);
      setLoading(false);
      setError(null);
      return undefined;
    }

    if (initialData?.id === seriesId) {
      setData(initialData);
      setLoading(false);
      setError(null);
      return undefined;
    }

    setData(null);
    setLoading(true);
    setError(null);

    getSeriesDetails(seriesId)
      .then((details) => {
        if (cancelled) return;
        setData(details);
        setLoading(false);
      })
      .catch((loadError) => {
        if (cancelled) return;
        setError(
          loadError?.message || "Unable to load series details."
        );
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [seriesId, initialData, reloadKey]);

  return {
    data,
    loading,
    error,
    refetch: () => setReloadKey((key) => key + 1),
  };
};

export default useSeriesDetails;
