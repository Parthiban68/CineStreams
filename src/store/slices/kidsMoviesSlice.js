import { createSlice } from "@reduxjs/toolkit";

const kidsMoviesSlice = createSlice({
  name: "kidsMovies",
  initialState: {
    hero: null,
    sections: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchKidsMoviesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchKidsMoviesSuccess: (state, action) => {
      state.hero = action.payload.hero;
      state.sections = action.payload.sections;
      state.loading = false;
    },
    fetchKidsMoviesFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchKidsMoviesStart,
  fetchKidsMoviesSuccess,
  fetchKidsMoviesFailure,
} = kidsMoviesSlice.actions;

export default kidsMoviesSlice.reducer;
