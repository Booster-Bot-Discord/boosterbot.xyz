import axios from 'axios';

const API = axios.create();

export const authCheck = () => API.get('/api/v1/auth/check');
export const logout = () => API.get('/api/v1/auth/logout');

export const getStats = () => API.get('/api/v1/stats');