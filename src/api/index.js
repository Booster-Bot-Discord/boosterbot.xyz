import axios from 'axios';

const API = axios.create();

export const authCheck = () => API.get('/api/v1/auth/check');
export const logout = () => API.get('/api/v1/auth/logout');

export const getStats = () => API.get('/api/v1/stats');

export const getAllUserGuilds = () => API.get('/api/v1/user/allguilds');

export const getAllBotGuildIds = () => API.get('/api/v1/bot/allguildids');