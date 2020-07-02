import axios from '../axios';

export const getClients = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/clients', { params });
  return result;
}

export const updateClient = async (data) => {
  const result = await axios.post('/clients/update', data);
  return result;
}

export const createClient = async (data) => {
  const result = await axios.post('/clients/create', data);
  return result;
}

export const deleteClient = async (data) => {
  const result = await axios.post('/clients/delete', data);
  return result;
}

export const searchClients = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/clients/search', { params });
  return result;
}
