import * as physicalLocationsServices from '../../../services/physicalLocations';

export const physicalLocationsConstants = {
  GET_PHYSICAL_LOCATIONS_REQUEST: 'GET_PHYSICAL_LOCATIONS_REQUEST',
  GET_PHYSICAL_LOCATIONS_SUCCESS: 'GET_PHYSICAL_LOCATIONS_SUCCESS',
  GET_PHYSICAL_LOCATIONS_FAILURE: 'GET_PHYSICAL_LOCATIONS_FAILURE',

  CREATE_PHYSICAL_LOCATIONS_REQUEST: 'CREATE_PHYSICAL_LOCATIONS_REQUEST',
  CREATE_PHYSICAL_LOCATIONS_SUCCESS: 'CREATE_PHYSICAL_LOCATIONS_SUCCESS',
  CREATE_PHYSICAL_LOCATIONS_FAILURE: 'CREATE_PHYSICAL_LOCATIONS_FAILURE',

  UPDATE_PHYSICAL_LOCATIONS_REQUEST: 'UPDATE_PHYSICAL_LOCATIONS_REQUEST',
  UPDATE_PHYSICAL_LOCATIONS_SUCCESS: 'UPDATE_PHYSICAL_LOCATIONS_SUCCESS',
  UPDATE_PHYSICAL_LOCATIONS_FAILURE: 'UPDATE_PHYSICAL_LOCATIONS_FAILURE',

  DELETE_PHYSICAL_LOCATIONS_REQUEST: 'DELETE_PHYSICAL_LOCATIONS_REQUEST',
  DELETE_PHYSICAL_LOCATIONS_SUCCESS: 'DELETE_PHYSICAL_LOCATIONS_SUCCESS',
  DELETE_PHYSICAL_LOCATIONS_FAILURE: 'DELETE_PHYSICAL_LOCATIONS_FAILURE',
}

export const physicalLocationsActions = {
  getPhysicalLocations,
  createPhysicalLocation,
  updatePhysicalLocation,
  deletePhysicalLocation
};

function getPhysicalLocations(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await physicalLocationsServices.getPhysicalLocations({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_REQUEST }
  }

  function success(data) {
    return { type: physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: physicalLocationsConstants.GET_PHYSICAL_LOCATIONS_FAILURE, payload: error }
  }
}

function createPhysicalLocation(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await physicalLocationsServices.createPhysicalLocation(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_REQUEST }
  }

  function success(data) {
    return { type: physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: physicalLocationsConstants.CREATE_PHYSICAL_LOCATIONS_FAILURE, payload: error }
  }
}

function updatePhysicalLocation(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await physicalLocationsServices.updatePhysicalLocation(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_REQUEST }
  }

  function success(data) {
    return { type: physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: physicalLocationsConstants.UPDATE_PHYSICAL_LOCATIONS_FAILURE, payload: error }
  }
}

function deletePhysicalLocation(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await physicalLocationsServices.deletePhysicalLocation({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_REQUEST }
  }

  function success(data) {
    return { type: physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: physicalLocationsConstants.DELETE_PHYSICAL_LOCATIONS_FAILURE, payload: error }
  }
}
