import apiClient from "../../../services/apiClient";

const detailsCache = new Map();

export const getTrendingSeries = async () => {
  const response = await apiClient.get("trending/tv/week");
  return response.data.results;
};

export const getPopularSeries = async () => {
  const response = await apiClient.get("tv/popular");
  return response.data.results;
};

export const getTopRatedSeries = async () => {
  const response = await apiClient.get("tv/top_rated");
  return response.data.results;
};

export const getAiringTodaySeries = async () => {
  const response = await apiClient.get("tv/airing_today");
  return response.data.results;
};

export const getOnTheAirSeries = async () => {
  const response = await apiClient.get("tv/on_the_air");
  return response.data.results;
};

export const getRecentlyAddedSeries = async () => {
  const today = new Date().toISOString().slice(0, 10);
  const response = await apiClient.get("discover/tv", {
    params: {
      sort_by: "first_air_date.desc",
      "first_air_date.lte": today,
      "vote_count.gte": 50,
      include_adult: false,
      page: 1,
    },
  });
  return response.data.results;
};

export const getSeriesByGenre = async (genreId) => {
  const response = await apiClient.get("discover/tv", {
    params: {
      with_genres: genreId,
      sort_by: "popularity.desc",
      "vote_count.gte": 100,
      include_adult: false,
      page: 1,
    },
  });
  return response.data.results;
};

export const getSeriesDetails = (seriesId) => {
  if (!seriesId) return Promise.resolve(null);

  if (detailsCache.has(seriesId)) {
    return detailsCache.get(seriesId);
  }

  const request = apiClient
    .get(`tv/${seriesId}`)
    .then((response) => response.data)
    .catch((error) => {
      detailsCache.delete(seriesId);
      throw error;
    });

  detailsCache.set(seriesId, request);
  return request;
};
