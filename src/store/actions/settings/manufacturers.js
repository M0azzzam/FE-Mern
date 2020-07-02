import * as manufacturersServices from '../../../services/manufacturers';
import toast from '../../../components/extension/Toast';
import { isArray } from 'lodash';

export const manufacturersConstants = {
  GET_MANUFACTURERS_REQUEST: 'GET_MANUFACTURERS_REQUEST',
  GET_MANUFACTURERS_SUCCESS: 'GET_MANUFACTURERS_SUCCESS',
  GET_MANUFACTURERS_FAILURE: 'GET_MANUFACTURERS_FAILURE',

  UPDATE_MANUFACTURERS_REQUEST: 'UPDATE_MANUFACTURERS_REQUEST',
  UPDATE_MANUFACTURERS_SUCCESS: 'UPDATE_MANUFACTURERS_SUCCESS',
  UPDATE_MANUFACTURERS_FAILURE: 'GET_MANUFACTURERS_FAILURE',

  DELETE_MANUFACTURERS_REQUEST: 'DELETE_MANUFACTURERS_REQUEST',
  DELETE_MANUFACTURERS_SUCCESS: 'DELETE_MANUFACTURERS_SUCCESS',
  DELETE_MANUFACTURERS_FAILURE: 'DELETE_MANUFACTURERS_FAILURE',

  CREATE_MANUFACTURERS_REQUEST: 'CREATE_MANUFACTURERS_REQUEST',
  CREATE_MANUFACTURERS_SUCCESS: 'CREATE_MANUFACTURERS_SUCCESS',
  CREATE_MANUFACTURERS_FAILURE: 'CREATE_MANUFACTURERS_FAILURE',

  UPDATE_MANUFACTURERS_TRIGGERS_REQUEST: 'UPDATE_MANUFACTURERS_TRIGGERS_REQUEST',
  UPDATE_MANUFACTURERS_TRIGGERS_SUCCESS: 'UPDATE_MANUFACTURERS_TRIGGERS_SUCCESS',
  UPDATE_MANUFACTURERS_TRIGGERS_FAILURE: 'UPDATE_MANUFACTURERS_TRIGGERS_FAILURE',
}

export const manufacturersActions = {
  getManufacturers,
  updateManufacturer,
  deleteManufacturer,
  createManufacturer,
  updateManufacturersTriggers
}

function getManufacturers(data) {
  const { limit, page } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await manufacturersServices.getManufacturers({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: manufacturersConstants.GET_MANUFACTURERS_REQUEST }
  }

  function success(data) {
    return { type: manufacturersConstants.GET_MANUFACTURERS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: manufacturersConstants.GET_MANUFACTURERS_FAILURE, payload: error }
  }
}

function updateManufacturer(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await manufacturersServices.updateManufacturer(data);

      dispatch(success(result.data.data));
      toast('Update Manufacturer', `Manufacturer ${data.name} updated successfully.`, 'success');
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      toast('Update Manufacturer', 'Manufacturer could not be updated.', 'danger');
    }
  }

  function request() {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_REQUEST }
  }

  function success(data) {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_FAILURE, payload: error }
  }
}

function deleteManufacturer(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await manufacturersServices.deleteManufacturer({ id: data });

      dispatch(success(result.data.data));
      let message = '';
      if (isArray(data)) {
        message = 'Manufacturers deleted successfully';
      } else {
        message = `Manufacturer ${data.name} deleted successfully`;
      }
      toast('Delete Manufacturer', message, 'success');
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      toast('Delete Manufacturer', 'Manufacturer could not be deleted. Please retry!', 'danger');
    }
  }

  function request() {
    return { type: manufacturersConstants.DELETE_MANUFACTURERS_REQUEST }
  }

  function success(data) {
    return { type: manufacturersConstants.DELETE_MANUFACTURERS_SUCCESS, data }
  }

  function failure(error) {
    return { type: manufacturersConstants.DELETE_MANUFACTURERS_FAILURE, error }
  }
}

function createManufacturer(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await manufacturersServices.createManufacturer(data);

      dispatch(success(result.data.data));
      toast('Create Manufacturer', `Manufacturer ${data.name} created successfully`, 'success');
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      var message = 'Manufacturer could not be created successfully. Please retry!';
      if (err.response && err.response.data && err.response.data.reason) {
        message = err.response.data.reason
      }
      toast('Create Manufacturer', message, 'danger');
      throw err;
    }
  }

  function request() {
    return { type: manufacturersConstants.CREATE_MANUFACTURERS_REQUEST }
  }

  function success(data) {
    return { type: manufacturersConstants.CREATE_MANUFACTURERS_SUCCESS, data }
  }

  function failure(error) {
    return { type: manufacturersConstants.CREATE_MANUFACTURERS_FAILURE, error }
  }
}

function updateManufacturersTriggers(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await manufacturersServices.updateManufacturersTriggers(data);

      dispatch(success(result.data.data));
      toast('Manufacturer Triggers', 'Manufacturers triggers updated successfully', 'success');
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      toast('Manufacturer Triggers', 'Manufacturers triggers could not be updated. Please retry!', 'danger');
    }
  }

  function request() {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_REQUEST }
  }

  function success() {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_SUCCESS }
  }

  function failure(error) {
    return { type: manufacturersConstants.UPDATE_MANUFACTURERS_TRIGGERS_FAILURE, error }
  }
}
