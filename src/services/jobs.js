import axios from '../axios';

export const getJobs = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/comment', { params });
  return result;
}

export const getJob = async (data) => {
  const { params } = data || {};
  const result = await axios.get('/comment', { params });
  return result;
}

export const updateJob = async (data) => {
  const result = await axios.post('/comment', data);
  return result;
}

export const createJob = async (data) => {
  const result = await axios.post('/comment', data);
  return result;
}

export const deleteJob = async (data) => {
  const result = await axios.post('/comment', data);
  return result;
}

export const getJobId = async () => {
  const result = await axios.get('/comment');
  return result;
}

export const updateJobStatus = async (data) => {
  const result = await axios.post('/comment', data);
  return result;
}
