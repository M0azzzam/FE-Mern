import axios from '../axios';

export const getPhysicalLocations = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/physical_locations', { params });
  return result;
}

export const updatePhysicalLocation = async (data) => {
  const result = await axios.post('/physical_locations/update', data);
  return result;
}

export const createPhysicalLocation = async (data) => {
  const result = await axios.post('/physical_locations/create', data);
  return result;
}

export const deletePhysicalLocation = async (data) => {
  const result = await axios.post('/physical_locations/delete', data);
  return result;
}
