import { createSlice } from "@reduxjs/toolkit";

const actionMovieInHome = createSlice({
    name: "actionMovieInHome",
    initialState: {
      list: null,
      loading: false,
      error: null,
    },
    reducers: {
      fetchActionMovieInHomeStart: (state) => {
        state.loading = true;
      },
      fetchActionMovieInHomeSuccess: (state, action) => {
        state.list = action.payload;
        state.loading = false;
      },
      fetchActionMovieInHomeFailure: (state, action) => {
        state.error = action.payload;
        state.loading = false;
      },
    },
  });
  
  export const {
    fetchActionMovieInHomeStart,
    fetchActionMovieInHomeSuccess,
    fetchActionMovieInHomeFailure,
  } = actionMovieInHome.actions;
  export default actionMovieInHome.reducer;