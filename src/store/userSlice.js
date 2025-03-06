import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: '',
  username: '',
  token: '',
  votesData: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    loginSuccess: (state, action) => {
      state.votesData = action.payload.votesData;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.username = '';
      state.token = '';
      state.votesData = [];
    },
  },
});

export const { login, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;