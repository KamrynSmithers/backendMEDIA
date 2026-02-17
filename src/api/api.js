import axios from 'axios';
const API_URL = 'http://localhost:4000'; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => {
  return api.post('/api/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/api/register', { name, email, password });
};

export default api;