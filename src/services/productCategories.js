import axios from '../axios';

export const getProductCategories = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/product_categories', { params });
  return result;
}

export const updateProductCategory = async (data) => {
  const result = await axios.post('/product_categories/update', data);
  return result;
}

export const createProductCategory = async (data) => {
  const result = await axios.post('/product_categories/create', data);
  return result;
}

export const deleteProductCategory = async (data) => {
  const result = await axios.post('/product_categories/delete', data);
  return result;
}
