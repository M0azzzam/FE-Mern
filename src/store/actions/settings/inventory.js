import * as inventoryServices from '../../../services/inventory';

export const inventoryConstants = {
  GET_INVENTORY_REQUEST: 'GET_INVENTORY_REQUEST',
  GET_INVENTORY_SUCCESS: 'GET_INVENTORY_SUCCESS',
  GET_INVENTORY_FAILURE: 'GET_INVENTORY_FAILURE',

  CREATE_INVENTORY_REQUEST: 'CREATE_INVENTORY_REQUEST',
  CREATE_INVENTORY_SUCCESS: 'CREATE_INVENTORY_SUCCESS',
  CREATE_INVENTORY_FAILURE: 'CREATE_INVENTORY_FAILURE',

  UPDATE_INVENTORY_REQUEST: 'UPDATE_INVENTORY_REQUEST',
  UPDATE_INVENTORY_SUCCESS: 'UPDATE_INVENTORY_SUCCESS',
  UPDATE_INVENTORY_FAILURE: 'UPDATE_INVENTORY_FAILURE',

  DELETE_INVENTORY_REQUEST: 'DELETE_INVENTORY_REQUEST',
  DELETE_INVENTORY_SUCCESS: 'DELETE_INVENTORY_SUCCESS',
  DELETE_INVENTORY_FAILURE: 'DELETE_INVENTORY_FAILURE',

  SEARCH_INVENTORY_REQUEST: 'SEARCH_INVENTORY_REQUEST',
  SEARCH_INVENTORY_SUCCESS: 'SEARCH_INVENTORY_SUCCESS',
  SEARCH_INVENTORY_FAILURE: 'SEARCH_INVENTORY_FAILURE',
}

export const inventoryActions = {
  getInventory,
  createInventory,
  updateInventory,
  deleteInventory,
  searchInventory
};

function getInventory(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await inventoryServices.getInventory({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: inventoryConstants.GET_INVENTORY_REQUEST }
  }

  function success(data) {
    return { type: inventoryConstants.GET_INVENTORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: inventoryConstants.GET_INVENTORY_FAILURE, payload: error }
  }
}

function createInventory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await inventoryServices.createInventory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: inventoryConstants.CREATE_INVENTORY_REQUEST }
  }

  function success(data) {
    return { type: inventoryConstants.CREATE_INVENTORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: inventoryConstants.CREATE_INVENTORY_FAILURE, payload: error }
  }
}

function updateInventory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await inventoryServices.updateInventory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: inventoryConstants.UPDATE_INVENTORY_REQUEST }
  }

  function success(data) {
    return { type: inventoryConstants.UPDATE_INVENTORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: inventoryConstants.UPDATE_INVENTORY_FAILURE, payload: error }
  }
}

function deleteInventory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await inventoryServices.deleteInventory({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: inventoryConstants.DELETE_INVENTORY_REQUEST }
  }

  function success(data) {
    return { type: inventoryConstants.DELETE_INVENTORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: inventoryConstants.DELETE_INVENTORY_FAILURE, payload: error }
  }
}

function searchInventory(data) {
  const { text } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await inventoryServices.searchInventory({ params: { text } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: inventoryConstants.SEARCH_INVENTORY_REQUEST }
  }

  function success(data) {
    return { type: inventoryConstants.SEARCH_INVENTORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: inventoryConstants.SEARCH_INVENTORY_FAILURE, payload: error }
  }
}
