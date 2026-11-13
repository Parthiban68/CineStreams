import { createSlice } from "@reduxjs/toolkit";

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    hero: null,
    featured: [],
    sections: null,
    kids: [],
    genreTiles: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchHomePageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchHomePageSuccess: (state, action) => {
      state.hero = action.payload.hero;
      state.featured = action.payload.featured || [];
      state.sections = action.payload.sections;
      state.kids = action.payload.kids;
      state.genreTiles = action.payload.genreTiles;
      state.loading = false;
      state.error = null;
    },
    fetchHomePageFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchHomePageStart,
  fetchHomePageSuccess,
  fetchHomePageFailure,
} = homePageSlice.actions;

export default homePageSlice.reducer;
