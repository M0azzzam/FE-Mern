import axios from '../axios';

export const getInventory = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/inventories', { params });
  return result;
}

export const updateInventory = async (data) => {
  const result = await axios.post('/inventories/update', data);
  return result;
}

export const createInventory = async (data) => {
  const result = await axios.post('/inventories/create', data);
  return result;
}

export const deleteInventory = async (data) => {
  const result = await axios.post('/inventories/delete', data);
  return result;
}

export const searchInventory = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/inventories/search', { params });
  return result;
}
