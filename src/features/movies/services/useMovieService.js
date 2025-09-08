import apiClient from "../../../services/apiClient";

export const getTrendingMoviesWithExtraDetails = async () => {
  const response = await apiClient.get("/trending/movie/week");
  //  const response = await apiClient.get(`/discover/movie?with_genres=10751&certification_country=US&certification.lte=G&sort_by=popularity.desc`)
  return response.data.results;
};
