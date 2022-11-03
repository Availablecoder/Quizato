import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  openSnack: null,
};

// Users Redux Slice
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userData: (state, action) => {
      if (action.payload.user) state.user = action.payload.user;
      if (action.payload.token) state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    startLoading: (state) => {
      state.loading = true;
    },
    endLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    popSnack: (state, action) => {
      state.openSnack = action.payload;
    },
  },
  extraReducers: {},
});

// functions to be dispatched
export const {
  userData,
  logoutUser,
  startLoading,
  endLoading,
  setError,
  popSnack,
} = usersSlice.actions;

export default usersSlice.reducer;
