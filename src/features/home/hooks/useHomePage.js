import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOME_GENRES } from "../homeGenres";
import {
  getHomeKidsPreview,
  getNowPlayingMovies,
  getPopularMovies,
  getPopularSeries,
  getTopRatedAll,
  getTrendingAll,
} from "../services/homePageService";
import {
  fetchHomePageFailure,
  fetchHomePageStart,
  fetchHomePageSuccess,
} from "../../../store/slices/homePageSlice";

const HOME_SECTIONS = [
  {
    key: "trending",
    title: "Trending Now",
    eyebrow: "This week",
    description: "The films and series everyone is talking about.",
    load: getTrendingAll,
  },
  {
    key: "popular-movies",
    title: "Popular Movies",
    eyebrow: "Audience favourites",
    description: "The biggest films being watched right now.",
    load: getPopularMovies,
  },
  {
    key: "popular-series",
    title: "Popular Series",
    eyebrow: "Binge-worthy",
    description: "Series that are dominating the conversation.",
    load: getPopularSeries,
  },
  {
    key: "now-playing",
    title: "Now Playing",
    eyebrow: "In theatres",
    description: "Fresh releases currently showing on the big screen.",
    load: getNowPlayingMovies,
  },
  {
    key: "top-rated",
    title: "Top Rated",
    eyebrow: "Critically acclaimed",
    description: "The highest-rated films and series in one place.",
    load: getTopRatedAll,
  },
];

const getMediaKey = (item) => `${item.media_type}-${item.id}`;

const buildSections = (results) => {
  const seen = new Set();

  return HOME_SECTIONS.reduce((sections, section, index) => {
    const result = results[index];

    if (result.status !== "fulfilled") {
      return sections;
    }

    const items = (result.value || [])
      .filter((item) => {
        if (!item?.id) return false;

        const key = getMediaKey(item);

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
      })
      .slice(0, 20);

    if (items.length > 0) {
      sections.push({
        key: section.key,
        title: section.title,
        eyebrow: section.eyebrow,
        description: section.description,
        items,
      });
    }

    return sections;
  }, []);
};

const buildFeatured = (sections) => {
  const seen = new Set();
  const pool = sections.flatMap((section) => section.items);
  const withStory = pool.filter(
    (item) => item.backdrop_path && item.overview
  );
  const withArtwork = pool.filter(
    (item) => item.backdrop_path && !item.overview
  );

  return [...withStory, ...withArtwork]
    .filter((item) => {
      const key = getMediaKey(item);

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    })
    .slice(0, 5);
};

const buildGenreTiles = (sections) => {
  const moviePool = sections.flatMap((section) =>
    section.items.filter((item) => item.media_type === "movie")
  );

  return HOME_GENRES.map((genre) => {
    const matches = moviePool.filter((movie) =>
      (movie.genre_ids || []).includes(genre.id)
    );
    const featured =
      matches.find((movie) => movie.backdrop_path || movie.poster_path) ||
      null;

    return {
      ...genre,
      imagePath: featured?.backdrop_path || featured?.poster_path || null,
    };
  });
};

const buildKids = (result) => {
  if (result?.status !== "fulfilled") return [];

  const seen = new Set();

  return (result.value || [])
    .filter((movie) => {
      if (!movie?.id || seen.has(movie.id)) return false;

      seen.add(movie.id);
      return true;
    })
    .slice(0, 12);
};

const useHomePage = () => {
  const dispatch = useDispatch();
  const { hero, featured, sections, kids, genreTiles, loading, error } =
    useSelector((state) => state.homePage);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const loadHomePage = async () => {
      dispatch(fetchHomePageStart());

      try {
        const results = await Promise.allSettled([
          ...HOME_SECTIONS.map((section) => section.load()),
          getHomeKidsPreview(),
        ]);

        if (cancelled) return;

        const mainResults = results.slice(0, HOME_SECTIONS.length);
        const kidsResult = results[HOME_SECTIONS.length];
        const hasSuccessfulRequest = results.some(
          (result) => result.status === "fulfilled"
        );

        if (!hasSuccessfulRequest) {
          const firstFailure = results.find(
            (result) => result.status === "rejected"
          );

          throw (
            firstFailure?.reason ||
            new Error("Unable to load the homepage collection.")
          );
        }

        const nextSections = buildSections(mainResults);
        const nextFeatured = buildFeatured(nextSections);

        dispatch(
          fetchHomePageSuccess({
            hero: nextFeatured[0] || null,
            featured: nextFeatured,
            sections: nextSections,
            kids: buildKids(kidsResult),
            genreTiles: buildGenreTiles(nextSections),
          })
        );
      } catch (loadError) {
        if (cancelled) return;

        dispatch(
          fetchHomePageFailure(
            loadError?.message || "Unable to load the homepage collection."
          )
        );
      }
    };

    loadHomePage();

    return () => {
      cancelled = true;
    };
  }, [dispatch, reloadKey]);

  return {
    hero,
    featured,
    sections,
    kids,
    genreTiles,
    loading,
    error,
    refetch: () => setReloadKey((key) => key + 1),
  };
};

export default useHomePage;
