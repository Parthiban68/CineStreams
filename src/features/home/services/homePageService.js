import apiClient from "../../../services/apiClient";
import { getKidsFeaturedMovies } from "../../kids/services/kidsMovieService";

const normalizeResults = (results, fallbackMediaType) =>
  (results || [])
    .filter((item) => item && !item.adult)
    .map((item) => ({
      ...item,
      media_type: item.media_type || fallbackMediaType,
    }))
    .filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );

const requestResults = async (path, mediaType, params) => {
  const response = await apiClient.get(path, { params });
  return normalizeResults(response.data.results, mediaType);
};

export const getTrendingAll = async () => {
  const response = await apiClient.get("trending/all/week");
  return normalizeResults(response.data.results);
};

export const getPopularMovies = () =>
  requestResults("movie/popular", "movie", { page: 1 });

export const getNowPlayingMovies = () =>
  requestResults("movie/now_playing", "movie", { page: 1 });

export const getPopularSeries = () =>
  requestResults("tv/popular", "tv", { page: 1 });

const interleave = (first = [], second = []) => {
  const merged = [];
  const maxLength = Math.max(first.length, second.length);

  for (let index = 0; index < maxLength; index += 1) {
    if (first[index]) merged.push(first[index]);
    if (second[index]) merged.push(second[index]);
  }

  return merged;
};

export const getTopRatedAll = async () => {
  const [movies, series] = await Promise.all([
    requestResults("movie/top_rated", "movie", { page: 1 }),
    requestResults("tv/top_rated", "tv", { page: 1 }),
  ]);

  return interleave(movies, series);
};

export const getHomeKidsPreview = async () => {
  const results = await getKidsFeaturedMovies();
  return normalizeResults(results, "movie");
};
