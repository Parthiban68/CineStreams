import apiClient from "../../../services/apiClient";

export const getTrendingMovies = async () => {
  const response = await apiClient.get("movie/popular");
  return response.data.results;
};

export const getMoviesBasedonComedy = async () =>{
  const response = await apiClient.get("discover/movie?with_genres=35");
  return response.data.results;
}

export const getMoviesBasedonAction = async () =>{
  const response = await apiClient.get("discover/movie?with_genres=28&&page=3");
  return response.data.results;
}