import * as taxServices from '../../../services/taxes';

export const taxConstants = {
  GET_TAXES_REQUEST: 'GET_TAXES_REQUEST',
  GET_TAXES_SUCCESS: 'GET_TAXES_SUCCESS',
  GET_TAXES_FAILURE: 'GET_TAXES_FAILURE',

  CREATE_TAXES_REQUEST: 'CREATE_TAXES_REQUEST',
  CREATE_TAXES_SUCCESS: 'CREATE_TAXES_SUCCESS',
  CREATE_TAXES_FAILURE: 'CREATE_TAXES_FAILURE',

  UPDATE_TAXES_REQUEST: 'UPDATE_TAXES_REQUEST',
  UPDATE_TAXES_SUCCESS: 'UPDATE_TAXES_SUCCESS',
  UPDATE_TAXES_FAILURE: 'UPDATE_TAXES_FAILURE',

  DELETE_TAXES_REQUEST: 'DELETE_TAXES_REQUEST',
  DELETE_TAXES_SUCCESS: 'DELETE_TAXES_SUCCESS',
  DELETE_TAXES_FAILURE: 'DELETE_TAXES_FAILURE',
}

export const taxActions = {
  getTaxes,
  createTax,
  updateTax,
  deleteTax
};

function getTaxes(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await taxServices.getTaxes({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: taxConstants.GET_TAXES_REQUEST }
  }

  function success(data) {
    return { type: taxConstants.GET_TAXES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: taxConstants.GET_TAXES_FAILURE, payload: error }
  }
}

function createTax(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await taxServices.createTax(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: taxConstants.CREATE_TAXES_REQUEST }
  }

  function success(data) {
    return { type: taxConstants.CREATE_TAXES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: taxConstants.CREATE_TAXES_FAILURE, payload: error }
  }
}

function updateTax(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await taxServices.updateTax(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: taxConstants.UPDATE_TAXES_REQUEST }
  }

  function success(data) {
    return { type: taxConstants.UPDATE_TAXES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: taxConstants.UPDATE_TAXES_FAILURE, payload: error }
  }
}

function deleteTax(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await taxServices.deleteTax({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: taxConstants.DELETE_TAXES_REQUEST }
  }

  function success(data) {
    return { type: taxConstants.DELETE_TAXES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: taxConstants.DELETE_TAXES_FAILURE, payload: error }
  }
}
