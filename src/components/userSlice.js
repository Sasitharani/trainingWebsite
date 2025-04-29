import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { isLoggedIn: false, username: null, email: null, membership: null },
    reducers: {
        login: (state, action) => {
            console.log('Payload received in login action:', action.payload);
            state.isLoggedIn = true;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.membership = action.payload.membership;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.username = null;
            state.email = null;
            state.membership = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
