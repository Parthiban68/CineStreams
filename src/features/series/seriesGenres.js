export const TV_GENRE_MAP = {
  16: "Animation",
  18: "Drama",
  35: "Comedy",
  37: "Western",
  80: "Crime",
  99: "Documentary",
  9648: "Mystery",
  10751: "Family",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

export const SERIES_GENRES = [
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 9648, name: "Mystery" },
  { id: 10759, name: "Action & Adventure" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 99, name: "Documentary" },
  { id: 16, name: "Animation" },
];

export const getSeriesGenreNames = (genreIds = []) =>
  genreIds.map((id) => TV_GENRE_MAP[id]).filter(Boolean);
