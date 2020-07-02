import * as repairCategoriesService from '../../../services/repairCategories';

export const repairCategoriesConstants = {
  GET_REPAIR_CATEGORIES_REQUEST: 'GET_REPAIR_CATEGORIES_REQUEST',
  GET_REPAIR_CATEGORIES_SUCCESS: 'GET_REPAIR_CATEGORIES_SUCCESS',
  GET_REPAIR_CATEGORIES_FAILURE: 'GET_REPAIR_CATEGORIES_FAILURE',

  UPDATE_REPAIR_CATEGORY_REQUEST: 'UPDATE_REPAIR_CATEGORY_REQUEST',
  UPDATE_REPAIR_CATEGORY_SUCCESS: 'UPDATE_REPAIR_CATEGORY_SUCCESS',
  UPDATE_REPAIR_CATEGORY_FAILURE: 'UPDATE_REPAIR_CATEGORY_FAILURE',

  DELETE_REPAIR_CATEGORIES_REQUEST: 'DELETE_REPAIR_CATEGORIES_REQUEST',
  DELETE_REPAIR_CATEGORIES_SUCCESS: 'DELETE_REPAIR_CATEGORIES_SUCCESS',
  DELETE_REPAIR_CATEGORIES_FAILURE: 'DELETE_REPAIR_CATEGORIES_FAILURE',

  CREATE_REPAIR_CATEGORY_REQUEST: 'CREATE_REPAIR_CATEGORY_REQUEST',
  CREATE_REPAIR_CATEGORY_SUCCESS: 'CREATE_REPAIR_CATEGORY_SUCCESS',
  CREATE_REPAIR_CATEGORY_FAILURE: 'CREATE_REPAIR_CATEGORY_FAILURE',

  UPDATE_REPAIR_CATEGORIES_TRIGGERS_REQUEST: 'UPDATE_REPAIR_CATEGORIES_TRIGGERS_REQUEST',
  UPDATE_REPAIR_CATEGORIES_TRIGGERS_SUCCESS: 'UPDATE_REPAIR_CATEGORIES_TRIGGERS_SUCCESS',
  UPDATE_REPAIR_CATEGORIES_TRIGGERS_FAILURE: 'UPDATE_REPAIR_CATEGORIES_TRIGGERS_FAILURE',

}


export const repairCategoriesActions = {
  getRepairCategories,
  createRepairCategory,
  updateRepairCategory,
  deleteRepairCategories,
  updateRepairCategoriesTriggers
};

function getRepairCategories(data) {
  const { page, limit } = data || {};
  return async dispatch => {
    try {
      dispatch(request());
      const result = await repairCategoriesService.getRepairCategories({ params: { limit, page } });

      dispatch(success(result.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
    }
  }

  function request() {
    return { type: repairCategoriesConstants.GET_REPAIR_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: repairCategoriesConstants.GET_REPAIR_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: repairCategoriesConstants.GET_REPAIR_CATEGORIES_FAILURE, payload: error }
  }
}

function createRepairCategory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await repairCategoriesService.createRepairCategory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: repairCategoriesConstants.CREATE_REPAIR_CATEGORY_REQUEST }
  }

  function success(data) {
    return { type: repairCategoriesConstants.CREATE_REPAIR_CATEGORY_SUCCESS, data }
  }

  function failure(error) {

    return { type: repairCategoriesConstants.CREATE_REPAIR_CATEGORY_FAILURE, error }
  }
}

function updateRepairCategory(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await repairCategoriesService.updateRepairCategory(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_REQUEST }
  }

  function success(data) {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORY_FAILURE, payload: error }
  }
}

function deleteRepairCategories(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await repairCategoriesService.deleteRepairCategory({ id: data });

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw (err);
    }
  }

  function request() {
    return { type: repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_REQUEST }
  }

  function success(data) {
    return { type: repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: repairCategoriesConstants.DELETE_REPAIR_CATEGORIES_FAILURE, payload: error }
  }
}

function updateRepairCategoriesTriggers(data) {
  return async dispatch => {
    try {
      dispatch(request());
      const result = await repairCategoriesService.updateRepairCategoriesTriggers(data);

      dispatch(success(result.data.data));
    } catch (err) {
      console.log(err.response);
      dispatch(failure(err.message));
      throw err;
    }
  }

  function request() {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_REQUEST }
  }

  function success(data) {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_SUCCESS, payload: data }
  }

  function failure(error) {
    return { type: repairCategoriesConstants.UPDATE_REPAIR_CATEGORIES_TRIGGERS_FAILURE, payload: error }
  }
}
