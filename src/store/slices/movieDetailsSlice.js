import { createSlice } from "@reduxjs/toolkit";

const movieDetailsById = createSlice({
  name: "movieFetailsById",
  initialState: {
    list: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchMovieDetailsByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMovieDetailsByIdSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchMovieDetailsByIdFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchMovieDetailsByIdStart,
  fetchMovieDetailsByIdSuccess,
  fetchMovieDetailsByIdFailure,
} = movieDetailsById.actions;
export default movieDetailsById.reducer;