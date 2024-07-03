import { createSlice } from '@reduxjs/toolkit';

// Utility function to set data in localStorage
const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Utility function to get data from localStorage
const getLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

const storedUser = getLocalStorage("user");
const storedIsAuthenticated = getLocalStorage("isAuthenticated");
const tokens = getLocalStorage("tokens");

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
            setLocalStorage("user", action.payload);
            setLocalStorage("isAuthenticated", state.isAuthenticated);
        },
        setTokens: (state, action) => {
            state.tokens = action.payload;
            setLocalStorage("tokens", action.payload);
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
