import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

// const handlePending = (state) => {
//   state.isLoading = true;
// };

const handleFulfilled = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const authSlice = createSlice({
  name: 'auth',

  initialState,

  extraReducers: (builder) => {
    builder
      // .addCase(register.pending, handlePending)
      // .addCase(register.rejected, handleRejected)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(logout.fulfilled, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
