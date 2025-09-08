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
    },
    fetchPopularMoviesSuccees: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchPopularMoviesFailre: (state, action) => {
      state.list = action.error;
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
