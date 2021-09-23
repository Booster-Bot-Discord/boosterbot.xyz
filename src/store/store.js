import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import guildReducer from './guildSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        guild: guildReducer
    }
});