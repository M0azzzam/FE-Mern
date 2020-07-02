import axios from '../axios'

export const getRepairCategories = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/repair_categories', { params });
  return result;
}

export const updateRepairCategory = async (data) => {
  const result = await axios.post('/repair_categories/update', data);
  return result;
}

export const createRepairCategory = async (data) => {
  const result = await axios.post('/repair_categories/create', data);
  return result;
}

export const deleteRepairCategory = async (data) => {
  const result = await axios.post('/repair_categories/delete', data);
  return result;
}

export const updateRepairCategoriesTriggers = async (data) => {
  const result = await axios.post('/repair_categories/update_triggers', data);
  return result;
}
