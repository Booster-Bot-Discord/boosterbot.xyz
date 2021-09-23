import { createSlice } from '@reduxjs/toolkit';

const guildSlice = createSlice({
    name: "guild",
    initialState: {
        available: false,
        discordId: "",
        name: "",
        icon: "",
        memberCount: 0,
        presenceCount: 0,
        roles: [],
        emojis: [],
        channels: [],
        config: null,
    },
    reducers: {
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        setDiscordId: (state, action) => {
            state.discordId = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setIcon: (state, action) => {
            state.icon = action.payload;
        },
        setMemberCount: (state, action) => {
            state.memberCount = action.payload;
        },
        setPresenceCount: (state, action) => {
            state.presenceCount = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setEmojis: (state, action) => {
            state.emojis = action.payload;
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        setConfig: (state, action) => {
            state.config = action.payload;
        }
    }
});

export const {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setRoles,
    setEmojis,
    setChannels,
    setConfig,
    setMemberCount,
    setPresenceCount
} = guildSlice.actions;

export default guildSlice.reducer;