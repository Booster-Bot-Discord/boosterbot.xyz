import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        id: "",
        discordId: "",
        username: "",
        avatar: "",
        permissionLevel: 1
    },
    reducers: {
        authenticate: state => {
            state.isAuthenticated = true;
        },
        deauthenticate: state => {
            state.isAuthenticated = false;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setDiscordId: (state, action) => {
            state.discordId = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        setPermissionLevel: (state, action) => {
            state.permissionLevel = action.payload;
        }
    }
});

export const {
    authenticate,
    deauthenticate,
    setId,
    setDiscordId,
    setUsername,
    setAvatar,
    setPermissionLevel
} = userSlice.actions;

export default userSlice.reducer;