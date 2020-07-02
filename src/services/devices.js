import axios from '../axios';

export const getDevices = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/devices', { params });
  return result;
}

export const createDevice = async (data) => {
  const result = await axios.post('/devices/create', data);
  return result;
}

export const updateDevice = async (data) => {
  const result = await axios.post('/devices/update', data);
  return result
}

export const deleteDevice = async (data) => {
  const result = await axios.post('/devices/delete', data);
  return result;
}

export const updateDevicesTriggers = async (data) => {
  const result = await axios.post('/devices/update_triggers', data);
  return result;
}

export const getDevicesByManufacturers = async (data) => {
  const result = await axios.post('/devices/by_manufacturer', data);
  return result;
}
