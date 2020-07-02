import axios from '../axios';

export const getCurrentStore = async () => {
  const result = await axios.get('/stores/get_current_store');
  return result;
}

export const updateCurrentStore = async data => {
  const result = await axios.post('/stores/update', data);
  return result;
}

export const getAllStores = async () => {
  const result = await axios.get('/stores');
  return result;
}

export const getStoreById = async (id) => {
  const result = await axios.get('/stores/get_store', { params: { id } });
  return result;
}

export const createNewStore = async data => {
  const result = await axios.post('/stores/add_new', data);
  return result;
}
