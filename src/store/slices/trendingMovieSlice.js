import { createSlice } from "@reduxjs/toolkit";

const trendingMovieSlice = createSlice({
  name: "trendingMovies",
  initialState: {
    list: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchTrendingMovieStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTrendingMovieSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTrendingMovieFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchTrendingMovieStart,
  fetchTrendingMovieSuccess,
  fetchTrendingMovieFailure,
} = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
