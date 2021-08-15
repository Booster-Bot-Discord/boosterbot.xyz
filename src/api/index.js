import axios from 'axios';

const API = axios.create();

export const authCheck = () => API.get('/auth/check');

export const logout = () => API.get('/auth/logout');