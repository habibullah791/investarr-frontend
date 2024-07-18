import { createSlice } from '@reduxjs/toolkit';

import { setLocalStorageWithExpiry, getLocalStorageWithExpiry } from '../../utils/utilityFunctions';

const storedUser = getLocalStorageWithExpiry("user");
const storedIsAuthenticated = getLocalStorageWithExpiry("isAuthenticated");
const tokens = getLocalStorageWithExpiry("tokens");

const initialState = {
    user: storedUser || null,
    tokens: {
        access: tokens?.access || '',
        refresh: tokens?.refresh || '',
    },
    isAuthenticated: storedIsAuthenticated || false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            setLocalStorageWithExpiry("user", action.payload);
            setLocalStorageWithExpiry("isAuthenticated", state.isAuthenticated);
        },
        setTokens: (state, action) => {
            state.tokens = action.payload;
            setLocalStorageWithExpiry("tokens", action.payload);
        },
        clearUser: (state) => {
            state.user = null;
            state.tokens = {
                access: '',
                refresh: '',
            };
            state.isAuthenticated = false;
            localStorage.removeItem("user");
            localStorage.removeItem("tokens");
            localStorage.removeItem("isAuthenticated");
        },
    },
});

export const { setUser, setTokens, clearUser } = userSlice.actions;

// Correctly defined selectors
export const selectTokens = (state) => state.user.tokens;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
