import axios from '../axios';

export const getManufacturers = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/manufacturers', { params });
  return result;
}

export const createManufacturer = async (data) => {
  const result = await axios.post('/manufacturers/create', data);
  return result;
}

export const updateManufacturer = async (data) => {
  const result = await axios.post('/manufacturers/update', data);
  return result;
}

export const deleteManufacturer = async (data) => {
  const result = await axios.post('/manufacturers/delete', data);
  return result;
}

export const updateManufacturersTriggers = async (data) => {
  const result = await axios.post('/manufacturers/update_triggers', data);
  return result;
}
