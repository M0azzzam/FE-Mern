import axios from '../axios';

export const getColors = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/colors', { params });
  return result;
}

export const updateColor = async (data) => {
  const result = await axios.post('/colors/update', data);
  return result;
}

export const createColor = async (data) => {
  const result = await axios.post('/colors/create', data);
  return result;
}

export const deleteColor = async (data) => {
  const result = await axios.post('/colors/delete', data);
  return result;
}
