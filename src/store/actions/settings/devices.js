import * as devicesServices from '../../../services/devices';

export const devicesConstants = {
  GET_DEVICES_REQUEST: 'GET_DEVICES_REQUEST',
  GET_DEVICES_SUCCESS: 'GET_DEVICES_SUCCESS',
  GET_DEVICES_FAILURE: 'GET_DEVICES_FAILURE',

  CREATE_DEVICES_REQUEST: 'CREATE_DEVICES_REQUEST',
  CREATE_DEVICES_SUCCESS: 'CREATE_DEVICES_SUCCESS',
  CREATE_DEVICES_FAILURE: 'CREATE_DEVICES_FAILURE',

  UPDATE_DEVICES_REQUEST: 'UPDATE_DEVICES_REQUEST',
  UPDATE_DEVICES_SUCCESS: 'UPDATE_DEVICES_SUCCESS',
  UPDATE_DEVICES_FAILURE: 'UPDATE_DEVICES_FAILURE',

  DELETE_DEVICES_REQUEST: 'DELETE_DEVICES_REQUEST',
  DELETE_DEVICES_SUCCESS: 'DELETE_DEVICES_SUCCESS',
  DELETE_DEVICES_FAILURE: 'DELETE_DEVICES_FAILURE',

  UPDATE_DEVICES_TRIGGERS_REQUEST: 'UPDATE_DEVICES_TRIGGERS_REQUEST',
  UPDATE_DEVICES_TRIGGERS_SUCCESS: 'UPDATE_DEVICES_TRIGGERS_SUCCESS',
  UPDATE_DEVICES_TRIGGERS_FAILURE: 'UPDATE_DEVICES_TRIGGERS_FAILURE'
}

export const devicesActions = {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
  updateDevicesTriggers
}

function getDevices(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await devicesServices.getDevices({ params: { limit, page } });
      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: devicesConstants.GET_DEVICES_REQUEST }
  }

  function success(data) {
    return { type: devicesConstants.GET_DEVICES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: devicesConstants.GET_DEVICES_FAILURE, payload: error }
  }
}

function createDevice(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await devicesServices.createDevice(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: devicesConstants.CREATE_DEVICES_REQUEST }
  }

  function success(data) {
    return { type: devicesConstants.CREATE_DEVICES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: devicesConstants.CREATE_DEVICES_FAILURE, payload: error }
  }
}

function updateDevice(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await devicesServices.updateDevice(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: devicesConstants.UPDATE_DEVICES_REQUEST }
  }

  function success(data) {
    return { type: devicesConstants.UPDATE_DEVICES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: devicesConstants.UPDATE_DEVICES_FAILURE, payload: error }
  }
}

function deleteDevice(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await devicesServices.deleteDevice({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: devicesConstants.DELETE_DEVICES_REQUEST }
  }

  function success(data) {
    return { type: devicesConstants.DELETE_DEVICES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: devicesConstants.DELETE_DEVICES_FAILURE, payload: error }
  }
}

function updateDevicesTriggers(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await devicesServices.updateDevicesTriggers(data);

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: devicesConstants.UPDATE_DEVICES_TRIGGERS_REQUEST }
  }

  function success(data) {
    return { type: devicesConstants.UPDATE_DEVICES_TRIGGERS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: devicesConstants.UPDATE_DEVICES_TRIGGERS_FAILURE, payload: error }
  }
}
