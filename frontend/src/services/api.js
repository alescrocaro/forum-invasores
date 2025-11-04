import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 150000, // 15 segundos
});

export const createSession = async (email, password) => {
  // console.log('process.env.REACT_APP_BASE_URL', process.env.REACT_APP_BASE_URL);
  return api.post('/login', { email, password });
};
