import axios from '../axios';
import { logout as _logout } from '../utils/auth';

export const register = async data => {
  const result = await axios.post('/users/register', data);
  return result;
}


export const login = async data => {
  const result = await axios.post('/users/login', data);
  return result;
}

export const logout = async () => {
  _logout();
  window.location.reload(true);
}

export const getUserProfile = async () => {
  const result = await axios.get('/users/profile/me');
  return result;
}

export const updateUserProfile = async (data) => {
  const result = await axios.post('/users/profile/me/update', data);
  return result;
}

export const updateUserPassword = async (data) => {
  const result = await axios.post('/users/profile/update_password', data);
  return result;
}
