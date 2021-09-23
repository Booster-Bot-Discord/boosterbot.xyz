import axios from 'axios';

const API = axios.create();

// Auth routes
export const authCheck = () => API.get('/api/v1/auth/check');
export const logout = () => API.get('/api/v1/auth/logout');

// Stats routes
export const getStats = () => API.get('/api/v1/stats');

// User routes
export const getAllUserGuilds = () => API.get('/api/v1/user/allguilds');

// Bot routes
export const getAllBotGuildIds = () => API.get('/api/v1/bot/allguildids');

// Guild routes
export const getGuildData = (guildId) => API.get(`/api/v1/guild/data/${guildId}`);
export const getGuildChannels = (guildId) => API.get(`/api/v1/guild/data/${guildId}/channels`);
export const getGuildConfig = (guildId) => API.get(`/api/v1/guild/config/${guildId}`);