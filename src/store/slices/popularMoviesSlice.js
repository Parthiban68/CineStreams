import { createSlice } from "@reduxjs/toolkit";

const popularMovies = createSlice({
  name: "popularMovies",
  initialState: {
    list: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchPopularMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPopularMoviesSuccees: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPopularMoviesFailre: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchPopularMoviesStart,
  fetchPopularMoviesSuccees,
  fetchPopularMoviesFailre,
} = popularMovies.actions;

export default popularMovies.reducer;
