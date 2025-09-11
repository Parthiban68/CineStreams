import { createSlice } from "@reduxjs/toolkit";

const seeAllMoviesSlice = createSlice({
  name: "seeAllMoviesSlice",
  initialState: {
    list: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchSeeAllMoviesSliceStart: (state) => {
      state.loading = true;
    },
    fetchSeeAllMoviesSliceSuccess: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSeeAllMoviesSliceFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchSeeAllMoviesSliceStart,
  fetchSeeAllMoviesSliceSuccess,
  fetchSeeAllMoviesSliceFailure,
} = seeAllMoviesSlice.actions;
export default seeAllMoviesSlice.reducer;
