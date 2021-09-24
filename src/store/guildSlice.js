import { createSlice } from '@reduxjs/toolkit';

const guildSlice = createSlice({
    name: "guild",
    initialState: {
        available: false,
        discordId: "",
        name: "",
        icon: "",
        memberCount: 0,
        permissions: null,
        highestRolePosition: 0,
        roles: [],
        channels: [],
        dbGeneraConfig: null,
        dbGreetConfig: null,
        dbBoostersData: null
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
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        setHighRolePosition: (state, action) => {
            state.highestRolePosition = action.payload;
        },
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
        setChannels: (state, action) => {
            state.channels = action.payload;
        },
        setDbGeneraConfig: (state, action) => {
            state.dbGeneraConfig = action.payload;
        },
        setDbGreetConfig: (state, action) => {
            state.dbGreetConfig = action.payload;
        },
        setDbBoostersData: (state, action) => {
            state.dbBoostersData = action.payload;
        }
    }
});

export const {
    setAvailable,
    setDiscordId,
    setName,
    setIcon,
    setPermissions,
    setHighRolePosition,
    setRoles,
    setEmojis,
    setChannels,
    setDbGeneraConfig,
    setDbGreetConfig,
    setDbBoostersData,
    setMemberCount
} = guildSlice.actions;

export default guildSlice.reducer;