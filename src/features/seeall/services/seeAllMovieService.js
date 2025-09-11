import apiClient from "../../../services/apiClient";

export const getMoviesBasedonGenresAndPage = async ({ id, page }) => {
  const response = await apiClient.get(
    `discover/movie?with_genres=${id}&&page=${page}`
  );
  return response.data.results;
};
