import * as employeesService from '../../../services/employees';
import Toast from '../../../components/extension/Toast';

export const employeesConstants = {
  GET_ROLES_REQUEST: 'GET_ROLES_REQUEST',
  GET_ROLES_SUCCESS: 'GET_ROLES_SUCCESS',
  GET_ROLES_FAILURE: 'GET_ROLES_FAILURE',

  UPDATE_ROLES_REQUEST: 'UPDATE_ROLES_REQUEST',
  UPDATE_ROLES_SUCCESS: 'UPDATE_ROLES_SUCCESS',
  UPDATE_ROLES_FAILURE: 'UPDATE_ROLES_FAILURE',

  GET_EMPLOYEES_REQUEST: 'GET_EMPLOYEES_REQUEST',
  GET_EMPLOYEES_SUCCESS: 'GET_EMPLOYEES_SUCCESS',
  GET_EMPLOYEES_FAILURE: 'GET_EMPLOYEES_FAILURE'
}


export const employeesActions = {
  getRoles,
  updateRole,
  getEmployees
};

function getRoles() {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await employeesService.getRoles();

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: employeesConstants.GET_ROLES_REQUEST }
  }

  function success(data) {
    return { type: employeesConstants.GET_ROLES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: employeesConstants.GET_ROLES_FAILURE, payload: error }
  }
}

function updateRole(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await employeesService.updateRole(data);

      dispatch(success(result.data.data));
      Toast(
        'Roles & Permisions',
        'Roles and Permisions updated successfully.',
        'success'
      );
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      Toast(
        'Roles & Permisions',
        'Roles and Permisions could not be updated. Please retry!',
        'danger'
      );
    }
  }

  function request() {
    return { type: employeesConstants.UPDATE_ROLES_REQUEST }
  }

  function success(data) {
    return { type: employeesConstants.UPDATE_ROLES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: employeesConstants.UPDATE_ROLES_FAILURE, payload: error }
  }
}

function getEmployees() {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await employeesService.getEmployees();

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: employeesConstants.GET_EMPLOYEES_REQUEST }
  }

  function success(data) {
    return { type: employeesConstants.GET_EMPLOYEES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: employeesConstants.GET_EMPLOYEES_FAILURE, payload: error }
  }
}
