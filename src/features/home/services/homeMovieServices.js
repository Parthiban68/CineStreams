import apiClient from "../../../services/apiClient";

export const getTrendingMovies = async () => {
  const response = await apiClient.get("movie/popular");
  return response.data.results;
};
