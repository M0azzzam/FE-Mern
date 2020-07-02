import * as vendorsServices from '../../../services/vendors';

export const vendorsConstants = {
  GET_VENDORS_REQUEST: 'GET_VENDORS_REQUEST',
  GET_VENDORS_SUCCESS: 'GET_VENDORS_SUCCESS',
  GET_VENDORS_FAILURE: 'GET_VENDORS_FAILURE',

  CREATE_VENDORS_REQUEST: 'CREATE_VENDORS_REQUEST',
  CREATE_VENDORS_SUCCESS: 'CREATE_VENDORS_SUCCESS',
  CREATE_VENDORS_FAILURE: 'CREATE_VENDORS_FAILURE',

  UPDATE_VENDORS_REQUEST: 'UPDATE_VENDORS_REQUEST',
  UPDATE_VENDORS_SUCCESS: 'UPDATE_VENDORS_SUCCESS',
  UPDATE_VENDORS_FAILURE: 'UPDATE_VENDORS_FAILURE',

  DELETE_VENDORS_REQUEST: 'DELETE_VENDORS_REQUEST',
  DELETE_VENDORS_SUCCESS: 'DELETE_VENDORS_SUCCESS',
  DELETE_VENDORS_FAILURE: 'DELETE_VENDORS_FAILURE',
}

export const vendorsActions = {
  getVendors,
  createVendor,
  updateVendor,
  deleteVendor
};

function getVendors(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await vendorsServices.getVendors({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: vendorsConstants.GET_VENDORS_REQUEST }
  }

  function success(data) {
    return { type: vendorsConstants.GET_VENDORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: vendorsConstants.GET_VENDORS_FAILURE, payload: error }
  }
}

function createVendor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await vendorsServices.createVendor(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: vendorsConstants.CREATE_VENDORS_REQUEST }
  }

  function success(data) {
    return { type: vendorsConstants.CREATE_VENDORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: vendorsConstants.CREATE_VENDORS_FAILURE, payload: error }
  }
}

function updateVendor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await vendorsServices.updateVendor(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: vendorsConstants.UPDATE_VENDORS_REQUEST }
  }

  function success(data) {
    return { type: vendorsConstants.UPDATE_VENDORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: vendorsConstants.UPDATE_VENDORS_FAILURE, payload: error }
  }
}

function deleteVendor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await vendorsServices.deleteVendor({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: vendorsConstants.DELETE_VENDORS_REQUEST }
  }

  function success(data) {
    return { type: vendorsConstants.DELETE_VENDORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: vendorsConstants.DELETE_VENDORS_FAILURE, payload: error }
  }
}
