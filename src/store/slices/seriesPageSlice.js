import { createSlice } from "@reduxjs/toolkit";

const seriesPageSlice = createSlice({
  name: "seriesPage",
  initialState: {
    hero: null,
    heroDetails: null,
    sections: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchSeriesPageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSeriesPageSuccess: (state, action) => {
      state.hero = action.payload.hero;
      state.heroDetails = action.payload.heroDetails;
      state.sections = action.payload.sections;
      state.loading = false;
      state.error = null;
    },
    fetchSeriesPageFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchSeriesPageStart,
  fetchSeriesPageSuccess,
  fetchSeriesPageFailure,
} = seriesPageSlice.actions;

export default seriesPageSlice.reducer;
