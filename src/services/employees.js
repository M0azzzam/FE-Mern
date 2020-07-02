import axios from '../axios';

export const getRoles = async () => {
  const result = await axios.get('/roles');
  return result;
}

export const updateRole = async (data) => {
  const result = await axios.post('/roles/update', data);
  return result;
}

export const createRole = async (data) => {
  const result = await axios.post('/roles/create', data);
  return result;
}

export const deleteRole = async (data) => {
  const result = await axios.post('/roles/delete', data);
  return result;
}

export const getEmployees = async () => {
  const result = await axios.get('/employees');
  return result;
}

export const createEmployee = async (data) => {
  const result = await axios.post('/employees/create', data);
  return result;
}

export const updateEmployee = async (data) => {
  const result = await axios.post('/employees/update', data);
  return result;
}

export const deleteEmployee = async (data) => {
  const result = await axios.post('/employees/delete', data);
  return result;
}
