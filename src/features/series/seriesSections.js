import {
  getAiringTodaySeries,
  getOnTheAirSeries,
  getPopularSeries,
  getRecentlyAddedSeries,
  getTopRatedSeries,
  getTrendingSeries,
} from "./services/seriesService";

export const SERIES_SECTIONS = [
  {
    key: "trending",
    title: "Trending TV Shows",
    eyebrow: "This week",
    description: "The series everyone is talking about right now.",
    load: getTrendingSeries,
  },
  {
    key: "popular",
    title: "Popular Series",
    eyebrow: "Most watched",
    description: "The shows audiences keep coming back to.",
    load: getPopularSeries,
  },
  {
    key: "top-rated",
    title: "Top Rated Series",
    eyebrow: "Critically loved",
    description: "The highest-rated stories in television.",
    load: getTopRatedSeries,
  },
  {
    key: "airing-today",
    title: "Currently Airing",
    eyebrow: "Today",
    description: "Series with episodes airing today.",
    load: getAiringTodaySeries,
  },
  {
    key: "on-the-air",
    title: "On The Air",
    eyebrow: "Right now",
    description: "Shows currently returning with new episodes.",
    load: getOnTheAirSeries,
  },
  {
    key: "recently-added",
    title: "Recently Added",
    eyebrow: "Fresh arrivals",
    description: "New series with recent first air dates.",
    load: getRecentlyAddedSeries,
  },
];
