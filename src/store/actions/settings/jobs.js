import * as jobServices from '../../../services/jobs';
import history from '../../../history';

export const jobConstants = {
  GET_JOBS_REQUEST: 'GET_JOBS_REQUEST',
  GET_JOBS_SUCCESS: 'GET_JOBS_SUCCESS',
  GET_JOBS_FAILURE: 'GET_JOBS_FAILURE',

  GET_JOB_REQUEST: 'GET_JOB_REQUEST',
  GET_JOB_SUCCESS: 'GET_JOB_SUCCESS',
  GET_JOB_FAILURE: 'GET_JOB_FAILURE',

  CREATE_JOB_REQUEST: 'CREATE_JOB_REQUEST',
  CREATE_JOB_SUCCESS: 'CREATE_JOB_SUCCESS',
  CREATE_JOB_FAILURE: 'CREATE_JOB_FAILURE',

  UPDATE_JOB_REQUEST: 'UPDATE_JOB_REQUEST',
  UPDATE_JOB_SUCCESS: 'UPDATE_JOB_SUCCESS',
  UPDATE_JOB_FAILURE: 'UPDATE_JOB_FAILURE',

  UPDATE_JOB_STATUS_REQUEST: 'UPDATE_JOB_STATUS_REQUEST',
  UPDATE_JOB_STATUS_SUCCESS: 'UPDATE_JOB_STATUS_SUCCESS',
  UPDATE_JOB_STATUS_FAILURE: 'UPDATE_JOB_STATUS_FAILURE',

  DELETE_JOBS_REQUEST: 'DELETE_JOBS_REQUEST',
  DELETE_JOBS_SUCCESS: 'DELETE_JOBS_SUCCESS',
  DELETE_JOBS_FAILURE: 'DELETE_JOBS_FAILURE',

  GET_JOB_ID_REQUEST: 'GET_JOB_ID_REQUEST',
  GET_JOB_ID_SUCCESS: 'GET_JOB_ID_SUCCESS',
  GET_JOB_ID_FAILURE: 'GET_JOB_ID_FAILURE',
}

export const jobActions = {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getJobId,
  updateJobStatus
};

function getJobs(data) {
  const { limit, page, status, customerId, dateTo, dateFrom, text, sort } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.getJobs({ params: { limit, page, status, customerId, dateTo, dateFrom, text, sort } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: jobConstants.GET_JOBS_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.GET_JOBS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.GET_JOBS_FAILURE, payload: error }
  }
}

function getJob(data) {
  const { id } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.getJob({ params: { id } });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: jobConstants.GET_JOB_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.GET_JOB_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.GET_JOB_FAILURE, payload: error }
  }
}

function getJobId() {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.getJobId();

      dispatch(success(result.data.data.estimateId));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: jobConstants.GET_JOB_ID_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.GET_JOB_ID_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.GET_JOB_ID_FAILURE, payload: error }
  }
}

function createJob(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.createJob(data);

      await dispatch(success(result.data.data));

      history.push(`./view/${result.data.data._id}`)
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: jobConstants.CREATE_JOB_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.CREATE_JOB_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.CREATE_JOB_FAILURE, payload: error }
  }
}

function updateJob(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.updateJob(data);

      dispatch(success(result.data.data));
      history.push(`../view/${result.data.data._id}`)
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: jobConstants.UPDATE_JOB_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.UPDATE_JOB_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.UPDATE_JOB_FAILURE, payload: error }
  }
}

function updateJobStatus(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.updateJobStatus(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: jobConstants.UPDATE_JOB_STATUS_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.UPDATE_JOB_STATUS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.UPDATE_JOB_STATUS_FAILURE, payload: error }
  }
}

function deleteJob(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await jobServices.deleteJob({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: jobConstants.DELETE_JOBS_REQUEST }
  }

  function success(data) {
    return { type: jobConstants.DELETE_JOBS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: jobConstants.DELETE_JOBS_FAILURE, payload: error }
  }
}
