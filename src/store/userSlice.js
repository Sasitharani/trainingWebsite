import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  username: '',
  token: '',
  votesData: [],
  membership: null, // Added membership from the other slice
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true; // Set isLoggedIn to true when user logs in
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.membership = action.payload.membership; // Added membership handling
    },
    loginSuccess: (state, action) => {
      // state.votesData = action.payload.votesData;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.username = '';
      state.token = '';
      state.votesData = [];
      state.membership = null; // Reset membership
    },
  },
});

export const { login, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;