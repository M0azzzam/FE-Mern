import axios from 'axios';
import { checkAuth } from './utils/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000
});

const token = checkAuth();
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
