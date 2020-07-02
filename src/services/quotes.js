import axios from '../axios';

export const getQuotes = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/estimates', { params });
  return result;
}

export const getQuote = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/estimates', { params });
  return result;
}

export const updateQuote = async (data) => {
  const result = await axios.post('/estimates/update', data);
  return result;
}

export const createQuote = async (data) => {
  const result = await axios.post('/estimates/create', data);
  return result;
}

export const deleteQuote = async (data) => {
  const result = await axios.post('/estimates/delete', data);
  return result;
}

export const getQuoteId = async () => {
  const result = await axios.get('/estimates/get_next_number');
  return result;
}

export const updateQuoteStatus = async (data) => {
  const result = await axios.post('/estimates/update_status', data);
  return result;
}
