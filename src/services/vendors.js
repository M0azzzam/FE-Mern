import axios from '../axios';

export const getVendors = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/vendors', { params });
  return result;
}

export const updateVendor = async (data) => {
  const result = await axios.post('/vendors/update', data);
  return result;
}

export const createVendor = async (data) => {
  const result = await axios.post('/vendors/create', data);
  return result;
}

export const deleteVendor = async (data) => {
  const result = await axios.post('/vendors/delete', data);
  return result;
}
