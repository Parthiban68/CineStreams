import apiClient from "../../../services/apiClient";

export const searchMulti = async (query, signal) => {
  const response = await apiClient.get("search/multi", {
    params: {
      query,
      include_adult: false,
      page: 1,
    },
    signal,
  });

  return (response.data.results || []).filter(
    (item) =>
      item &&
      !item.adult &&
      (item.media_type === "movie" || item.media_type === "tv")
  );
};
