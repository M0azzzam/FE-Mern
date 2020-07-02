import axios from '../axios';

export const getTaxes = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/taxes', { params });
  return result;
}

export const updateTax = async (data) => {
  const result = await axios.post('/taxes/update', data);
  return result;
}

export const createTax = async (data) => {
  const result = await axios.post('/taxes/create', data);
  return result;
}

export const deleteTax = async (data) => {
  const result = await axios.post('/taxes/delete', data);
  return result;
}
