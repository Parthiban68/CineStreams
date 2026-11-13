import { createSlice } from "@reduxjs/toolkit";

const comdeyMovieInHome = createSlice({
    name: "comdeyMovieInHome",
    initialState: {
      list: null,
      loading: false,
      error: null,
    },
    reducers: {
      fetchComdeyMovieInHomeStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      fetchComdeyMovieInHomeSuccess: (state, action) => {
        state.list = action.payload;
        state.loading = false;
        state.error = null;
      },
      fetchComdeyMovieInHomeFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  
  export const {
    fetchComdeyMovieInHomeStart,
    fetchComdeyMovieInHomeSuccess,
    fetchComdeyMovieInHomeFailure,
  } = comdeyMovieInHome.actions;
  export default comdeyMovieInHome.reducer;