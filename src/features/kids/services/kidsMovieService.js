import apiClient from "../../../services/apiClient";

const kidsDiscoveryParams = {
  sort_by: "popularity.desc",
  "vote_average.gte": 6.3,
  "vote_count.gte": 150,
  include_adult: false,
  certification_country: "US",
  "certification.lte": "PG",
  without_genres: "27,53,80,9648",
};

const discoverKidsMovies = async (params) => {
  const response = await apiClient.get("discover/movie", {
    params: { ...kidsDiscoveryParams, ...params },
  });
  return response.data.results;
};

export const getKidsFeaturedMovies = () =>
  discoverKidsMovies({ with_genres: "10751|16|12|14|35" });

export const getKidsCategoryMovies = (genreId) =>
  discoverKidsMovies({ with_genres: genreId });
