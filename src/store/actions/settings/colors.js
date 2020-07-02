import * as colorsServices from '../../../services/colors';

export const colorsConstants = {
  GET_COLORS_REQUEST: 'GET_COLORS_REQUEST',
  GET_COLORS_SUCCESS: 'GET_COLORS_SUCCESS',
  GET_COLORS_FAILURE: 'GET_COLORS_FAILURE',

  CREATE_COLORS_REQUEST: 'CREATE_COLORS_REQUEST',
  CREATE_COLORS_SUCCESS: 'CREATE_COLORS_SUCCESS',
  CREATE_COLORS_FAILURE: 'CREATE_COLORS_FAILURE',

  UPDATE_COLORS_REQUEST: 'UPDATE_COLORS_REQUEST',
  UPDATE_COLORS_SUCCESS: 'UPDATE_COLORS_SUCCESS',
  UPDATE_COLORS_FAILURE: 'UPDATE_COLORS_FAILURE',

  DELETE_COLORS_REQUEST: 'DELETE_COLORS_REQUEST',
  DELETE_COLORS_SUCCESS: 'DELETE_COLORS_SUCCESS',
  DELETE_COLORS_FAILURE: 'DELETE_COLORS_FAILURE',
}

export const colorsActions = {
  getColors,
  createColor,
  updateColor,
  deleteColor
};

function getColors(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await colorsServices.getColors({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: colorsConstants.GET_COLORS_REQUEST }
  }

  function success(data) {
    return { type: colorsConstants.GET_COLORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: colorsConstants.GET_COLORS_FAILURE, payload: error }
  }
}

function createColor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await colorsServices.createColor(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: colorsConstants.CREATE_COLORS_REQUEST }
  }

  function success(data) {
    return { type: colorsConstants.CREATE_COLORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: colorsConstants.CREATE_COLORS_FAILURE, payload: error }
  }
}

function updateColor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await colorsServices.updateColor(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: colorsConstants.UPDATE_COLORS_REQUEST }
  }

  function success(data) {
    return { type: colorsConstants.UPDATE_COLORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: colorsConstants.UPDATE_COLORS_FAILURE, payload: error }
  }
}

function deleteColor(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await colorsServices.deleteColor({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: colorsConstants.DELETE_COLORS_REQUEST }
  }

  function success(data) {
    return { type: colorsConstants.DELETE_COLORS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: colorsConstants.DELETE_COLORS_FAILURE, payload: error }
  }
}
