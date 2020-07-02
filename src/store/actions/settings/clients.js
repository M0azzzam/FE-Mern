import * as clientServices from '../../../services/clients';

export const clientConstants = {
  GET_CLIENTS_REQUEST: 'GET_CLIENTS_REQUEST',
  GET_CLIENTS_SUCCESS: 'GET_CLIENTS_SUCCESS',
  GET_CLIENTS_FAILURE: 'GET_CLIENTS_FAILURE',

  CREATE_CLIENTS_REQUEST: 'CREATE_CLIENTS_REQUEST',
  CREATE_CLIENTS_SUCCESS: 'CREATE_CLIENTS_SUCCESS',
  CREATE_CLIENTS_FAILURE: 'CREATE_CLIENTS_FAILURE',

  UPDATE_CLIENTS_REQUEST: 'UPDATE_CLIENTS_REQUEST',
  UPDATE_CLIENTS_SUCCESS: 'UPDATE_CLIENTS_SUCCESS',
  UPDATE_CLIENTS_FAILURE: 'UPDATE_CLIENTS_FAILURE',

  DELETE_CLIENTS_REQUEST: 'DELETE_CLIENTS_REQUEST',
  DELETE_CLIENTS_SUCCESS: 'DELETE_CLIENTS_SUCCESS',
  DELETE_CLIENTS_FAILURE: 'DELETE_CLIENTS_FAILURE',

  SEARCH_CLIENTS_REQUEST: 'SEARCH_CLIENTS_REQUEST',
  SEARCH_CLIENTS_SUCCESS: 'SEARCH_CLIENTS_SUCCESS',
  SEARCH_CLIENTS_FAILURE: 'SEARCH_CLIENTS_FAILURE',
}

export const clientActions = {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  searchClients
};

function getClients(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await clientServices.getClients({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: clientConstants.GET_CLIENTS_REQUEST }
  }

  function success(data) {
    return { type: clientConstants.GET_CLIENTS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: clientConstants.GET_CLIENTS_FAILURE, payload: error }
  }
}

function createClient(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await clientServices.createClient(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: clientConstants.CREATE_CLIENTS_REQUEST }
  }

  function success(data) {
    return { type: clientConstants.CREATE_CLIENTS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: clientConstants.CREATE_CLIENTS_FAILURE, payload: error }
  }
}

function updateClient(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await clientServices.updateClient(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: clientConstants.UPDATE_CLIENTS_REQUEST }
  }

  function success(data) {
    return { type: clientConstants.UPDATE_CLIENTS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: clientConstants.UPDATE_CLIENTS_FAILURE, payload: error }
  }
}

function deleteClient(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await clientServices.deleteClient({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: clientConstants.DELETE_CLIENTS_REQUEST }
  }

  function success(data) {
    return { type: clientConstants.DELETE_CLIENTS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: clientConstants.DELETE_CLIENTS_FAILURE, payload: error }
  }
}

function searchClients(data) {
  const { text } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await clientServices.searchClients({ params: { text } });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: clientConstants.SEARCH_CLIENTS_REQUEST }
  }

  function success(data) {
    return { type: clientConstants.SEARCH_CLIENTS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: clientConstants.SEARCH_CLIENTS_FAILURE, payload: error }
  }
}
