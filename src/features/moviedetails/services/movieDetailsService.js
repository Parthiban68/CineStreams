import apiClient from "../../../services/apiClient";

export const getMovieDetailsById = async (id) => {
  const response = await apiClient.get(`/movie/${id}`,{params:{append_to_response: 'credits,videos'}});
  return response.data;
};
