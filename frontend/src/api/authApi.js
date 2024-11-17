import axios from '../services/httpService';

export const login = (username, password) => {
  return axios.post('/api/token', { username, password });
};

export const register = (data) => {
  return axios.post('/api/register', data);
};
